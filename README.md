# 🤖 AI Content Transformer

<div align="center">

![AI Content Transformer](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=openai)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_Pro-4285F4?style=for-the-badge&logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Transform your content instantly with AI-powered precision**

[Live Demo](#) · [Report Bug](https://github.com/yourusername/ai-content-transformer/issues) · [Request Feature](https://github.com/yourusername/ai-content-transformer/issues)

</div>

---

## 📖 About The Project

**AI Content Transformer** is a production-ready SaaS platform that leverages Google's Gemini Pro AI to transform text content instantly. Whether you need to summarize lengthy reports for executives, expand bullet points into comprehensive job descriptions, or adjust casual text to a formal tone, this tool does it all with precision-engineered prompts.

### 🎯 Purpose

This project was built to demonstrate:
- **Advanced AI Integration** - Real-world implementation of Google Gemini API
- **Prompt Engineering Expertise** - Carefully crafted prompts for consistent, high-quality results
- **Full-Stack Development** - Modern architecture with React, Node.js, and TypeScript
- **Production Best Practices** - Security, error handling, rate limiting, and scalability
- **Cost-Effective Solutions** - 100% FREE using Google's generous Gemini API tier

Perfect for:
- 💼 Business professionals needing quick content transformations
- ✍️ Content creators and writers
- 📊 Executives requiring concise summaries
- 🏢 HR teams drafting job descriptions
- 🎓 Students and researchers
- 👨‍💻 Developers learning AI integration

---

## ✨ Key Features

### 🎨 Three Powerful Transformation Modes

#### 📊 **Summarize for CEO**
Transform lengthy reports, meeting notes, and documents into concise executive summaries with key insights and actionable points.

**Example:**
- **Input:** 500-word quarterly report
- **Output:** 100-word executive summary with key metrics and recommendations

#### 💼 **Expand into Job Description**
Convert brief job requirements or bullet points into comprehensive, professional job postings that attract top talent.

**Example:**
- **Input:** "Senior Developer, React, 5+ years, remote"
- **Output:** Full job description with overview, responsibilities, qualifications, and benefits

#### 🎯 **Adjust Tone to Formal**
Elevate casual text into professional, corporate communication suitable for business settings.

**Example:**
- **Input:** "Hey team, we gotta push the deadline back a bit"
- **Output:** "Dear Team, I would like to inform you that we need to extend our project timeline"

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Minimal web framework
- **TypeScript** - End-to-end type safety
- **Google Gemini Pro** - Free AI model
- **Helmet.js** - Security middleware
- **Express Rate Limit** - API protection

---

## 🎬 Demo

### Interface Preview
The application features a beautiful, modern interface with:
- Clean glass-morphism design
- Real-time text transformation
- Character counter (5000 char limit)
- Copy-to-clipboard functionality
- Loading states and error handling
- Example templates for each mode

### Live Demo
🔗 **[Try it live](#)** *(Add your deployed URL here)*

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js 18+** installed
- **Google Gemini API Key** (100% FREE - [Get yours here](https://ai.google.dev/))

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-content-transformer.git
cd ai-content-transformer
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure Google API Key**
```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your API key:
```env
GOOGLE_API_KEY=your-google-api-key-here
PORT=3001
NODE_ENV=development
```

4. **Start development servers**
```bash
npm run dev
```

5. **Open in browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## 📁 Project Structure

```
ai-content-transformer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Tailwind CSS styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   └── index.ts       # API server + AI integration
│   ├── .env.example       # Environment template
│   ├── tsconfig.json
│   └── package.json
├── .gitignore
├── package.json           # Root package with scripts
└── README.md
```

---

## 🔧 API Endpoints

### `POST /api/transform`
Transform text using AI.

**Request:**
```json
{
  "text": "Your text here...",
  "transformType": "summarize-ceo" | "expand-job-description" | "formal-tone"
}
```

**Response:**
```json
{
  "success": true,
  "originalText": "Your text here...",
  "transformedText": "AI-transformed content...",
  "transformType": "summarize-ceo",
  "model": "gemini-pro",
  "tokensUsed": 0
}
```

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Content Transformer API is running",
  "model": "Google Gemini Pro",
  "aiProvider": "Google"
}
```

---

## 🧠 Prompt Engineering

Each transformation uses carefully crafted prompts with:

1. **Role Definition** - AI acts as a specialist (executive communicator, HR writer, business editor)
2. **Context Setting** - Clear instructions on transformation goals
3. **Format Specifications** - Structured output with specific sections
4. **Tone Guidelines** - Professional, appropriate language
5. **Constraints** - Word limits, style requirements, best practices

### Example Prompt Structure
```typescript
const promptTemplate = `
You are a [ROLE: executive communication specialist].
Transform the following text into [GOAL: concise executive summary].
Include [STRUCTURE: key insights, strategic implications, action items].
Use [TONE: professional business language].
Keep it [CONSTRAINTS: under 150 words].

Text to transform:
${userInput}

Output:
`;
```

---

## 🚢 Deployment

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy Frontend**
```bash
cd client
vercel --prod
```

3. **Update API URL**
In `client/src/App.tsx`, update the API endpoint to your backend URL.

### Deploy Backend (Railway/Render)

#### Option 1: Railway
```bash
cd server
railway login
railway init
railway up
```

#### Option 2: Render
1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Set build command: `cd server && npm install && npm run build`
6. Set start command: `cd server && npm start`
7. Add environment variable: `GOOGLE_API_KEY`

### Environment Variables for Production
```env
GOOGLE_API_KEY=your-google-api-key
PORT=3001
NODE_ENV=production
```

---

## 💡 Use Cases

### For Businesses
- Summarize quarterly reports for board meetings
- Transform meeting notes into executive briefs
- Create professional job postings from requirements

### For Content Creators
- Adjust tone for different audiences
- Expand brief notes into full articles
- Summarize long-form content

### For HR Teams
- Generate comprehensive job descriptions
- Formalize casual internal communications
- Create executive summaries of candidate profiles

### For Developers
- Learn AI/ML integration
- Study prompt engineering techniques
- Understand full-stack TypeScript architecture

---

## 🛡️ Security Features

- ✅ **Rate Limiting** - 50 requests per 15 minutes per IP
- ✅ **Input Validation** - Sanitization and length checks
- ✅ **Helmet.js** - Security headers
- ✅ **CORS Configuration** - Cross-origin protection
- ✅ **Environment Variables** - Protected API keys
- ✅ **Error Sanitization** - No sensitive data leaks

---

## 📊 Performance

- ⚡ **Fast Response Times** - Powered by Google Gemini Pro
- 💰 **100% FREE** - No costs (within Google's generous limits)
- 📈 **Scalable** - Production-ready architecture
- 🔒 **Rate Limited** - 60 requests/minute on free tier

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### API Key Issues
```bash
# Verify API key is set
cat server/.env

# Test API directly
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{"text":"test","transformType":"formal-tone"}'
```

### Port Already in Use
```bash
# Kill processes on ports
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Rate Limit Exceeded
- Free tier: 60 requests/minute
- Wait 1 minute or upgrade Google API quota

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - Free AI model
- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Frontend hosting
- [Railway](https://railway.app/) - Backend hosting

---

## 📈 Roadmap

- [ ] User authentication and saved transformations
- [ ] More transformation types (translate, simplify, summarize for different audiences)
- [ ] Batch processing for multiple texts
- [ ] Export to PDF/Word/Markdown
- [ ] Custom prompt templates
- [ ] Analytics dashboard
- [ ] Browser extension
- [ ] Mobile app

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ and cutting-edge AI technology**

Made to showcase full-stack development skills and AI integration expertise

</div>
# AI-Content-Transformer
