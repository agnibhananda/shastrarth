import React from 'react';
import Card from './Card';

interface Format {
  id: string;
  name: string;
  description: string;
  rounds: number;
  timePerRound?: number; // in seconds, optional for untimed formats
}

interface FormatSelectorProps {
  formats: Format[];
  selectedFormat: string;
  onSelect: (id: string) => void;
}

export default function FormatSelector({ 
  formats, 
  selectedFormat, 
  onSelect 
}: FormatSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-serif mb-4">Select Debate Format</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((format) => (
          <Card 
            key={format.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedFormat === format.id 
                ? 'border-2 border-primary' 
                : 'hover:translate-y-[-4px]'
            }`}
            hover={selectedFormat !== format.id}
            onClick={() => onSelect(format.id)}
          >
            <div className="p-3">
              <h3 className="text-lg font-serif mb-2">{format.name}</h3>
              <p className="text-foreground/80 text-sm mb-3">{format.description}</p>
              <div className="flex items-center justify-between text-xs font-mono text-foreground/70">
                <span>{format.rounds} rounds</span>
                {format.timePerRound ? (
                  <span>{format.timePerRound} seconds per round</span>
                ) : (
                  <span>Untimed</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 