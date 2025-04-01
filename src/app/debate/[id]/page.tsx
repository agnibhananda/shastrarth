'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import DebateChat from '@/components/DebateChat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export default function DebateSessionPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('Should artificial intelligence development be regulated?');
  const [format, setFormat] = useState({ rounds: 8, timePerRound: 0 });
  const [personalityName, setPersonalityName] = useState('Socrates');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Greetings! I am ${personalityName}, and I shall help you examine your beliefs on "${topic}". Remember, the unexamined argument is not worth making. Let us begin our dialectic journey.`,
      timestamp: Date.now()
    }
  ]);
  
  const [round, setRound] = useState(1);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    logic: 68,
    rhetoric: 59,
    evidence: 59
  });
  
  const [suggestedImprovements, setSuggestedImprovements] = useState([
    "Consider adding statistical evidence",
    "Strong logical structure",
    "Try using more rhetorical questions"
  ]);

  useEffect(() => {
    // Load config from localStorage
    const loadConfig = () => {
      try {
      const savedConfig = localStorage.getItem('debateConfig');
      if (savedConfig) {
          const config = JSON.parse(savedConfig);
          setTopic(config.topic || topic);
          
          // Get personality name from ID
          const personalityMap: Record<string, string> = {
            'socrates': 'Socrates',
            'sunTzu': 'Sun Tzu',
            'shakespeare': 'Shakespeare',
            'lawyer': 'Legal Expert',
            'comedian': 'Comedian',
            'aiRobot': 'AI Robot'
          };
          
          if (config.personalityId && personalityMap[config.personalityId]) {
            setPersonalityName(personalityMap[config.personalityId]);
            
            // Update the first AI message
            setMessages([{
              id: '1',
            sender: 'ai',
              text: `Greetings! I am ${personalityMap[config.personalityId]}, and I shall help you examine your beliefs on "${config.topic || topic}". Remember, the unexamined argument is not worth making. Let us begin our dialectic journey.`,
              timestamp: Date.now()
            }]);
          }
      }
      } catch (error) {
        console.error('Error loading debate config:', error);
      } finally {
      setLoading(false);
    }
    };

    loadConfig();
  }, [topic]);

  const handleSubmit = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAiThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting perspective. Have you considered the implications if everyone were to follow that reasoning?",
        "I appreciate your argument, but I wonder if you've thought about the opposing viewpoint? What would someone who disagrees say?",
        "Let's examine your premises more carefully. How did you arrive at that conclusion?",
        "Your point has merit, but I'm curious: how would this work in practice rather than just in theory?",
        "That's a compelling argument. Now, if we were to take it to its logical conclusion, what would the world look like?"
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsAiThinking(false);
      
      // Update round after both sides have spoken
      if (round < format.rounds) {
        setRound(prev => prev + 1);
      }
      
      // Update metrics
      setPerformanceMetrics({
        logic: Math.min(100, performanceMetrics.logic + Math.floor(Math.random() * 5) - 2),
        rhetoric: Math.min(100, performanceMetrics.rhetoric + Math.floor(Math.random() * 5) - 1),
        evidence: Math.min(100, performanceMetrics.evidence + Math.floor(Math.random() * 5) - 2)
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center simple-background">
        <div className="text-lg">Loading debate...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col simple-background">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-serif gold-accent">Debate Session</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-foreground/70">Round {round} of {format.rounds} | Debating with {personalityName}</div>
              <Link 
                href="/debate" 
                className="px-4 py-2 border border-foreground/20 rounded-md hover:bg-foreground/5 transition"
              >
                End Debate
              </Link>
            </div>
          </div>
          
          <DebateChat
            aiPersonality={personalityName}
            topic={topic}
            messages={messages}
            isAiThinking={isAiThinking}
            onSubmit={handleSubmit}
            round={round}
            maxRounds={format.rounds}
            performanceMetrics={performanceMetrics}
            suggestedImprovements={suggestedImprovements}
          />
        </div>
      </main>
      
    </div>
  );
} 