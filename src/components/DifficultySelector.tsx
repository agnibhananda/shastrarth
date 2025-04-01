import React from 'react';
import Card from './Card';

interface Difficulty {
  id: string;
  name: string;
  description: string;
}

interface DifficultySelectorProps {
  difficulties: Difficulty[];
  selectedDifficulty: string;
  onSelect: (id: string) => void;
}

export default function DifficultySelector({ 
  difficulties, 
  selectedDifficulty, 
  onSelect 
}: DifficultySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-serif mb-4">Select Difficulty</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <Card 
            key={difficulty.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedDifficulty === difficulty.id 
                ? 'border-2 border-primary' 
                : 'hover:translate-y-[-4px]'
            }`}
            hover={selectedDifficulty !== difficulty.id}
            onClick={() => onSelect(difficulty.id)}
          >
            <div className="p-2 text-center">
              <h3 className="text-lg font-serif mb-2">{difficulty.name}</h3>
              <p className="text-foreground/80 text-sm">{difficulty.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 