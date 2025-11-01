import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Prompt templates with expert prompt engineering
const promptTemplates = {
  'summarize-ceo': (text: string) => `You are an executive communication specialist. Transform the following text into a concise, high-level executive summary suitable for a CEO. Focus on key insights, strategic implications, and actionable points. Use professional business language, bullet points where appropriate, and keep it under 150 words.

Text to summarize:
${text}

Executive Summary:`,
  
  'expand-job-description': (text: string) => `You are a professional HR content writer. Transform the following brief notes or bullet points into a comprehensive, well-structured job description. Include sections for: Overview, Key Responsibilities, Required Qualifications, Preferred Qualifications, and What We Offer. Use professional, engaging language that attracts top talent.

Input notes:
${text}

Complete Job Description:`,
  
  'formal-tone': (text: string) => `You are a professional business communication editor. Transform the following text to have a formal, professional tone suitable for corporate communication. Maintain the original meaning and key points, but elevate the language, remove casual expressions, and ensure it follows professional writing standards.

Original text:
${text}

Formal version:`
};

interface TransformRequest {
  text: string;
  transformType: 'summarize-ceo' | 'expand-job-description' | 'formal-tone';
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Content Transformer API is running',
    model: 'Google Gemini Pro',
    aiProvider: 'Google'
  });
});

// Transform endpoint
app.post('/api/transform', async (req: Request, res: Response) => {
  try {
    const { text, transformType }: TransformRequest = req.body;

    // Validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request', 
        message: 'Text is required and must be a string' 
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({ 
        error: 'Text too long', 
        message: 'Text must be less than 5000 characters' 
      });
    }

    if (!transformType || !promptTemplates[transformType]) {
      return res.status(400).json({ 
        error: 'Invalid transform type', 
        message: 'Transform type must be one of: summarize-ceo, expand-job-description, formal-tone' 
      });
    }

    // Check if Google API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error', 
        message: 'Google API key is not configured' 
      });
    }

    // Get the appropriate prompt
    const systemPrompt = 'You are an expert content transformation assistant. Provide high-quality, professional transformations of text based on the specific requirements given.';
    const userPrompt = promptTemplates[transformType](text);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    // Call Google Gemini API
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 1,
      },
    });

    const response = await result.response;
    const transformedText = response.text()?.trim();

    if (!transformedText) {
      throw new Error('No response from Google Gemini');
    }

    // Return the transformed text with metadata
    res.json({
      success: true,
      originalText: text,
      transformedText,
      transformType,
      model: 'gemini-pro',
      tokensUsed: 0 // Gemini doesn't expose token count in the same way
    });

  } catch (error: any) {
    console.error('Transform error:', error);

    // Handle Google Gemini specific errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({ 
        error: 'API Authentication Error', 
        message: 'Invalid Google API key. Please check your configuration.' 
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded', 
        message: 'Google API rate limit reached. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Transformation failed', 
      message: error.message || 'An unexpected error occurred' 
    });
  }
});

// Export for Vercel serverless
export default app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/transform`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
