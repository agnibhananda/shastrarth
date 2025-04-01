import React from 'react';
import Card from './Card';
import Button from './Button';

interface ScoreCategory {
  name: string;
  score: number;
  description: string;
}

interface FeedbackPoint {
  type: 'strength' | 'weakness';
  text: string;
}

interface DebateFeedbackProps {
  topic: string;
  aiPersonality: string;
  scores: ScoreCategory[];
  feedbackPoints: FeedbackPoint[];
  summary: string;
  onStartNewDebate: () => void;
  onShareResults: () => void;
}

export default function DebateFeedback({
  topic,
  aiPersonality,
  scores,
  feedbackPoints,
  summary,
  onStartNewDebate,
  onShareResults
}: DebateFeedbackProps) {
  // Calculate total score as percentage
  const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
  const maxPossibleScore = scores.length * 10; // Assuming max score is 10 per category
  const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif mb-2">Debate Analysis</h2>
        <p className="text-foreground/70">
          Topic: <span className="font-mono">{topic}</span>
        </p>
        <p className="text-foreground/70">
          Against: <span className="font-mono">{aiPersonality}</span>
        </p>
      </div>
      
      {/* Overall Score */}
      <Card className="text-center p-8">
        <div className="relative inline-block w-32 h-32 mb-4">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#ddd"
              strokeWidth="2"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeDasharray={`${scorePercentage}, 100`}
              strokeLinecap="round"
            />
            <text x="18" y="20.5" className="text-5xl font-bold" textAnchor="middle" fill="currentColor">
              {scorePercentage}%
            </text>
          </svg>
        </div>
        <h3 className="text-xl font-serif">Overall Performance</h3>
      </Card>
      
      {/* Score Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scores.map((category, index) => (
          <Card key={index}>
            <div className="text-center p-4">
              <h3 className="text-lg font-serif mb-3">{category.name}</h3>
              <div className="flex items-center justify-center mb-3">
                <div className="w-full bg-border/20 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(category.score / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-mono">{category.score}/10</span>
              </div>
              <p className="text-sm text-foreground/80">{category.description}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-serif mb-4 text-green-600 dark:text-green-400">Strengths</h3>
            <ul className="space-y-3">
              {feedbackPoints
                .filter(point => point.type === 'strength')
                .map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm">{point.text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
        
        {/* Weaknesses */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-serif mb-4 text-red-600 dark:text-red-400">Areas for Improvement</h3>
            <ul className="space-y-3">
              {feedbackPoints
                .filter(point => point.type === 'weakness')
                .map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-red-600 dark:text-red-400">✗</span>
                    <span className="text-sm">{point.text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
      </div>
      
      {/* Summary */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-serif mb-4">Debate Summary</h3>
          <p className="text-sm whitespace-pre-line">{summary}</p>
        </div>
      </Card>
      
      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={onStartNewDebate} size="lg">
          Start New Debate
        </Button>
        <Button onClick={onShareResults} variant="secondary" size="lg">
          Share Results
        </Button>
      </div>
    </div>
  );
} 