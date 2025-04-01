import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

interface TopicSelectorProps {
  onSelect: (topic: string) => void;
  onCustomTopic: (topic: string) => void;
}

const presetTopics = [
  "Should artificial intelligence development be regulated?",
  "Is democracy the best form of government?",
  "Should college education be free for all citizens?",
  "Does social media do more harm than good?",
  "Is universal basic income a viable solution to economic inequality?",
  "Should nuclear energy be a major part of our energy strategy?",
];

export default function TopicSelector({ onSelect, onCustomTopic }: TopicSelectorProps) {
  const [customTopic, setCustomTopic] = useState('');
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-serif mb-4">Choose a Topic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presetTopics.map((topic, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:translate-y-[-4px] transition-all duration-200"
              hover={true}
              onClick={() => onSelect(topic)}
            >
              <p className="text-sm leading-relaxed">{topic}</p>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="my-8 flex items-center">
        <div className="flex-grow h-px bg-border/50"></div>
        <p className="mx-4 text-foreground/70 text-sm font-mono">OR</p>
        <div className="flex-grow h-px bg-border/50"></div>
      </div>
      
      <div>
        <h3 className="text-xl font-serif mb-4">Create Your Own Topic</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Enter your debate topic..."
            className="flex-grow p-3 border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors duration-200 rounded-md"
          />
          <Button 
            onClick={() => {
              if (customTopic.trim().length > 0) {
                onCustomTopic(customTopic);
              }
            }}
            disabled={customTopic.trim().length === 0}
          >
            Let's Debate
          </Button>
        </div>
      </div>
    </div>
  );
} 