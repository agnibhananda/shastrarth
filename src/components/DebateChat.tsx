import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Validate API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is not set. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface DebateChatProps {
  aiPersonality: string;
  topic: string;
  isTimerActive?: boolean;
  timePerRound?: number;
  onTimeEnd?: () => void;
  onSubmit: (message: string) => Promise<void>;
  messages: Message[];
  isAiThinking: boolean;
  round?: number;
  maxRounds?: number;
  performanceMetrics?: {
    logic: number;
    rhetoric: number;
    evidence: number;
  };
  suggestedImprovements?: string[];
}

export default function DebateChat({
  aiPersonality,
  topic,
  isTimerActive = false,
  timePerRound = 0,
  onTimeEnd,
  onSubmit,
  messages: initialMessages,
  isAiThinking,
  round = 1,
  maxRounds = 5,
  performanceMetrics = { logic: 65, rhetoric: 72, evidence: 58 },
  suggestedImprovements = [
    "Consider adding statistical evidence",
    "Strong logical structure",
    "Try using more rhetorical questions"
  ]
}: DebateChatProps) {
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(timePerRound);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Update local messages when prop messages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Timer logic
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeEnd) onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, onTimeEnd]);

  // Reset timer when new round starts
  useEffect(() => {
    if (isTimerActive) {
      setTimeLeft(timePerRound);
    }
  }, [messages.length, isTimerActive, timePerRound]);

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. Please check your environment variables.');
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Create chat history ensuring user message is first
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Start a new chat with the system prompt
      const systemPrompt = `You are ${aiPersonality}. You must strictly maintain this identity and respond as if you are actually ${aiPersonality}. 
      You are engaged in a formal debate about "${topic}". 
      This is round ${round} of ${maxRounds}.
      
      For example, if you are Sun Tzu:
      - Use military and strategic terminology
      - Reference The Art of War
      - Speak with authority and wisdom
      - Use analogies related to warfare and strategy
      
      If you are Socrates:
      - Use the Socratic method
      - Ask probing questions
      - Reference philosophical concepts
      - Speak in a dialectical manner
      
      If you are Aristotle:
      - Use logical reasoning
      - Reference his works and theories
      - Speak with systematic precision
      - Use syllogistic arguments
      
      If you are Nietzsche:
      - Use aphoristic style
      - Reference his philosophical concepts
      - Speak with intensity and depth
      - Challenge conventional wisdom
      
      You must respond in character, using the appropriate style, terminology, and perspective of ${aiPersonality}. 
      Never break character or acknowledge that you are an AI model.`;
      
      const chat = model.startChat({
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          }
        ]
      });
      
      await chat.sendMessage(systemPrompt);
      
      // Send chat history messages in order
      for (const msg of chatHistory) {
        await chat.sendMessage(msg.parts[0].text);
      }
      
      // Send the new user message and get response
      const result = await chat.sendMessage(userMessage);
      const response = result.response;
      
      return response.text();
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Gemini API key is invalid or not configured properly. Please check your environment variables.');
        }
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    try {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text: message,
        sender: 'user',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      
      // Generate Gemini response
      const geminiResponseText = await generateGeminiResponse(message);
      
      if (geminiResponseText) {
        // Add AI message
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: geminiResponseText,
          sender: 'ai',
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
      
      // Focus input after submission
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("Error in message submission:", error);
      if (error instanceof Error) {
        setGeminiError(error.message);
      } else {
        setGeminiError("Failed to send message. Please try again.");
      }
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get philosopher quotes
  const getPhilosopherQuote = () => {
    switch (aiPersonality.toLowerCase()) {
      case 'socrates':
        return "\"The unexamined life is not worth living.\"";
      case 'sun tzu':
        return "\"Know thy enemy and know thyself; in a hundred battles, you will never be defeated.\"";
      case 'aristotle':
        return "\"Excellence is never an accident. It is the result of high intention, sincere effort, and intelligent execution.\"";
      case 'nietzsche':
        return "\"He who has a why to live can bear almost any how.\"";
      default:
        return "\"I know that I know nothing.\"";
    }
  };

  // Get AI avatar based on personality
  const getAiAvatar = () => {
    const personalityLower = aiPersonality.toLowerCase().replace(/\s+/g, '');
    
    const imageMap: Record<string, string> = {
      'socrates': 'socrates.jpg',
      'suntzu': 'suntzu.jpg',
      'shakespeare': 'shakespeare.jpg',
      'legalexpert': 'lawyer.jpg',
      'comedian': 'comedian.jpg',
      'airobot': 'ai_robot.jpg'
    };
    
    const imagePath = imageMap[personalityLower];
    
    return (
      <div className="personality-avatar w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gold/50 shadow-md relative">
        {imagePath ? (
          <img 
            src={`/personalities/${imagePath}`} 
            alt={aiPersonality}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-card/80 flex items-center justify-center">
            <div className="text-2xl font-serif text-gold">
              {getPersonalitySymbol()}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Get symbol for personality if no image is available
  const getPersonalitySymbol = () => {
    switch (aiPersonality.toLowerCase()) {
      case 'socrates':
        return 'Σ';
      case 'sun tzu':
        return '孫';
      case 'aristotle':
        return 'A';
      case 'nietzsche':
        return 'N';
      case 'shakespeare':
        return 'W';
      case 'legal expert':
        return '⚖️';
      default:
        return aiPersonality.substring(0, 1);
    }
  };

  // Get debate style
  const getDebateStyle = () => {
    switch (aiPersonality.toLowerCase()) {
      case 'socrates':
        return "Socratic Method";
      case 'sun tzu':
        return "Strategic Rhetoric";
      case 'aristotle':
        return "Syllogistic Reasoning";
      case 'nietzsche':
        return "Aphoristic Critique";
      default:
        return "Classical Dialectic";
    }
  };

  // Get specialty
  const getSpecialty = () => {
    switch (aiPersonality.toLowerCase()) {
      case 'socrates':
        return "Critical Questioning";
      case 'sun tzu':
        return "Strategic Positioning";
      case 'aristotle':
        return "Logical Analysis";
      case 'nietzsche':
        return "Psychological Insight";
      default:
        return "Philosophical Inquiry";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left panel - AI Personality */}
      <div className="hidden md:block">
        <div className="card-bg rounded-md p-5 h-full border border-border/50 shadow-md relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>
          
          <div className="flex flex-col items-center mb-6">
            {getAiAvatar()}
            <h3 className="font-serif mt-3 text-lg gold-accent">{aiPersonality}</h3>
            <div className="w-12 h-0.5 bg-gold/30 my-2"></div>
            <p className="text-xs text-foreground/70 font-serif italic text-center">{getPhilosopherQuote()}</p>
          </div>
          
          <div className="mb-5">
            <h4 className="text-sm font-serif mb-2 gold-accent">Debate Approach</h4>
            <div className="bg-parchment/10 p-2 rounded-sm border border-border/30 text-sm">
              {getDebateStyle()}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-serif mb-2 gold-accent">Specialty</h4>
            <div className="bg-parchment/10 p-2 rounded-sm border border-border/30 text-sm">
              {getSpecialty()}
            </div>
          </div>
          
          <div className="text-xs italic text-foreground/60 mt-6 text-center border-t border-border/30 pt-3">
            Round {round} of {maxRounds}
          </div>
        </div>
      </div>
      
      {/* Middle panel - Debate Chat */}
      <div className="md:col-span-2">
        <div className="flex flex-col h-[70vh] rounded-md overflow-hidden border border-border/50 shadow-md relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
          
          {/* Header with topic and timer */}
          <div className="card-bg p-4 border-b border-border/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-serif gold-accent text-shadow-sm shadow-gold/50 font-medium scribble-highlight inline-block">{topic}</h2>
              <p className="text-xs text-foreground/60">Dialectical Exchange - Round {round}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Round Counter */}
              <div className="round-counter flex items-center justify-center gap-1">
                <span className="text-primary font-bold">{round}</span>
                <span className="text-foreground/60">/</span>
                <span className="text-foreground/60">{maxRounds}</span>
              </div>
              {isTimerActive && (
                <div className={`font-mono text-lg ${timeLeft < 10 ? 'text-danger animate-pulse' : 'text-gold'} bg-card/80 px-3 py-1 rounded-sm border border-border/30 shadow-sm`}>
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-grow overflow-y-auto p-4 bg-background/10">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`mb-5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div className={`p-3 rounded-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary/5 border border-primary/30 shadow-sm' 
                    : 'card-bg-light border border-gold/20 shadow-md text-shadow-xs shadow-white/10'
                }`}>
                  <p className={`text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'ai' ? 'animate-typewriter' : ''
                  }`}>{msg.text}</p>
                </div>
                <div className={`text-xs mt-1.5 text-foreground/60 font-serif italic ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.sender === 'user' ? 'You' : aiPersonality} · {
                    new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                </div>
              </div>
            ))}
            
            {isAiThinking && (
              <div className="mb-5 max-w-[85%] mr-auto">
                <div className="p-3 rounded-sm card-bg-light border border-gold/20 shadow-sm">
                  <div className="flex space-x-3 items-center">
                    <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="ml-2 text-xs italic text-foreground/70 scribble-highlight">
                      Contemplating...
                    </div>
                  </div>
                </div>
                <div className="text-xs mt-1.5 text-foreground/60 font-serif italic text-left">
                  {aiPersonality} is formulating a response
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-4 card-bg border-t border-border/50">
            <div className="flex flex-col gap-2">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Present your argument..."
                className="w-full p-3 border border-border/60 bg-background/80 focus:border-gold focus:outline-none transition-colors duration-200 rounded-sm resize-none h-24 text-sm shadow-inner text-foreground"
                disabled={isAiThinking}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-foreground/60 font-serif italic">
                  {isTimerActive && `Time remaining: ${formatTime(timeLeft)}`}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs text-foreground/60 hover:text-foreground/80 px-2 py-1 rounded-sm end-debate-btn transition-all duration-300 shadow-sm"
                    onClick={() => {/* Add your end debate handler here */}}
                  >
                    End Debate
                  </button>
                  <Button
                    type="submit"
                    variant={isAiThinking ? "outline" : "primary"}
                    size="sm"
                    disabled={message.trim() === '' || isAiThinking}
                    className="hover:bg-primary/80 hover:shadow-inner transition-all duration-300 shadow-sm"
                  >
                    {isAiThinking ? "Waiting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right panel - Performance Metrics */}
      <div className="hidden md:block">
        <div className="card-bg rounded-md p-5 h-full border border-border/50 shadow-md relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>
          
          <h3 className="font-serif mb-5 text-lg gold-accent text-center scribble-underline inline-block mx-auto">Rhetorical Analysis</h3>
          <div className="w-12 h-0.5 bg-gold/30 mx-auto mb-5"></div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-serif">Logical Rigor</span>
                <span className="text-xs font-mono gold-accent">{performanceMetrics.logic}%</span>
              </div>
              <div className="progress-bar h-2">
                <div className="progress-bar-fill" style={{ width: `${performanceMetrics.logic}%` }}></div>
              </div>
              <p className="text-xs text-foreground/60 italic mt-1.5">Syllogistic coherence and validity</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-serif">Rhetorical Skill</span>
                <span className="text-xs font-mono gold-accent">{performanceMetrics.rhetoric}%</span>
              </div>
              <div className="progress-bar h-2">
                <div className="progress-bar-fill" style={{ width: `${performanceMetrics.rhetoric}%` }}></div>
              </div>
              <p className="text-xs text-foreground/60 italic mt-1.5">Persuasive techniques and eloquence</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-serif">Evidential Support</span>
                <span className="text-xs font-mono gold-accent">{performanceMetrics.evidence}%</span>
              </div>
              <div className="progress-bar h-2">
                <div className="progress-bar-fill" style={{ width: `${performanceMetrics.evidence}%` }}></div>
              </div>
              <p className="text-xs text-foreground/60 italic mt-1.5">Citations and empirical support</p>
            </div>
          </div>
          
          <div className="mt-6 border-t border-border/30 pt-4">
            <h3 className="font-serif mb-3 gold-accent scribble-underline inline-block">Scholarly Critique</h3>
            <ul className="space-y-3">
              {suggestedImprovements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    index === 0 ? 'bg-warning shadow-sm' : 
                    index === 1 ? 'bg-success shadow-sm' : 'bg-primary shadow-sm'
                  }`}></span>
                  <span className={`${
                    index === 0 ? 'text-warning/90' : 
                    index === 1 ? 'text-success/90' : 'text-primary/90'
                  } font-medium`}>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
