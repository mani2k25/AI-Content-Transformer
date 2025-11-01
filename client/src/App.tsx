import { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, ArrowRight, Wand2 } from 'lucide-react';

interface TransformOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

const transformOptions: TransformOption[] = [
  {
    value: 'summarize-ceo',
    label: 'Summarize for CEO',
    description: 'Concise executive summary with key insights',
    icon: '📊'
  },
  {
    value: 'expand-job-description',
    label: 'Expand into Job Description',
    description: 'Full, professional job posting with all sections',
    icon: '💼'
  },
  {
    value: 'formal-tone',
    label: 'Adjust Tone to Formal',
    description: 'Professional, corporate communication style',
    icon: '🎯'
  }
];

const exampleTexts = {
  'summarize-ceo': `Our Q4 results show a 35% increase in user engagement across all platforms. We've successfully launched three new features: advanced analytics dashboard, automated reporting system, and real-time collaboration tools. Customer satisfaction scores improved from 7.8 to 8.9. The engineering team resolved 145 critical bugs and reduced system downtime by 60%. Marketing campaigns generated 12,000 new leads with a 23% conversion rate. We're facing challenges with scaling infrastructure for the European market expansion and need to hire 15 additional developers by Q1. Current cash runway is 18 months at the current burn rate.`,
  'expand-job-description': `• Senior Full-Stack Developer
• 5+ years experience
• React, Node.js, TypeScript
• Remote position
• Competitive salary + equity
• Build AI-powered features`,
  'formal-tone': `Hey team! Just wanted to give you a heads up that we're gonna need to push the deadline back a bit. The client threw some new requirements at us last minute and honestly, it's a lot to handle. No worries though, we got this! Let's touch base tomorrow and figure out who's doing what. Thanks guys!`
};

function App() {
  const [inputText, setInputText] = useState('');
  const [transformType, setTransformType] = useState('summarize-ceo');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // API URL - uses environment variable in production, localhost in development
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleTransform = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutputText('');

    try {
      const response = await fetch(`${API_URL}/api/transform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          transformType: transformType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Transformation failed');
      }

      setOutputText(data.transformedText);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadExample = () => {
    setInputText(exampleTexts[transformType as keyof typeof exampleTexts] || exampleTexts['summarize-ceo']);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Content Transformer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your text instantly with powerful AI. Summarize, expand, or adjust tone with precision-engineered prompts.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Wand2 className="w-6 h-6 text-blue-600" />
                  Input Text
                </h2>
                <button
                  onClick={loadExample}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Load Example
                </button>
              </div>
              
              <textarea
                className="textarea-field min-h-[300px]"
                placeholder="Paste your text here... (job requirements, draft email, meeting notes, etc.)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              <div className="mt-2 text-sm text-gray-500 text-right">
                {inputText.length} / 5000 characters
              </div>
            </div>

            {/* Transform Options */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Choose Transformation Type
              </h3>
              
              <div className="space-y-3">
                {transformOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      transformType === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="transformType"
                      value={option.value}
                      checked={transformType === option.value}
                      onChange={(e) => setTransformType(e.target.value)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-semibold text-gray-800">
                          {option.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleTransform}
                disabled={isLoading || !inputText.trim()}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Transforming...
                  </>
                ) : (
                  <>
                    Transform Text
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                  Transformed Output
                </h2>
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">AI is working its magic...</p>
                  </div>
                </div>
              ) : outputText ? (
                <div className="min-h-[300px] p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {outputText}
                  </pre>
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your transformed text will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                💡 Prompt Engineering in Action
              </h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                This demo showcases advanced prompt engineering techniques. Each transformation uses carefully crafted prompts that specify role, tone, structure, and constraints. The AI acts as a specialist (executive communicator, HR writer, or business editor) to deliver professional, context-aware results.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get AI-powered transformations in seconds with optimized GPT-4 integration
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Precision Prompts</h3>
            <p className="text-sm text-gray-600">
              Expert-crafted prompts ensure consistent, high-quality transformations
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Production Ready</h3>
            <p className="text-sm text-gray-600">
              Built with TypeScript, rate limiting, and enterprise-grade error handling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

