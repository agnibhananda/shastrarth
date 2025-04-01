import React from 'react';
import Card from './Card';

interface Personality {
  id: string;
  name: string;
  description: string;
  style: string;
  image?: string;
  quote?: string;
}

interface PersonalitySelectorProps {
  personalities: Personality[];
  selectedPersonality: string;
  onSelect: (id: string) => void;
}

export default function PersonalitySelector({ 
  personalities, 
  selectedPersonality, 
  onSelect 
}: PersonalitySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {personalities.map((personality) => (
        <div 
          key={personality.id}
          className={`personality-card white-border-card cursor-pointer transition-all duration-200 p-5 ${
            selectedPersonality === personality.id 
              ? 'border-2 border-primary' 
              : 'hover:translate-y-[-4px]'
          }`}
          onClick={() => onSelect(personality.id)}
        >
          <div className="flex flex-col items-center">
            <div className={`personality-avatar mb-4 ${!personality.image ? personality.id : ''}`}>
              {personality.image ? (
                <img 
                  src={`/personalities/${personality.image}`} 
                  alt={personality.name} 
                />
              ) : (
                <div className="w-full h-full bg-card flex items-center justify-center">
                  <span className="text-gold font-serif text-xl">
                    {personality.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-serif mb-1 gold-accent">{personality.name}</h3>
            <p className="text-xs mb-3 text-foreground/70 italic">{personality.style}</p>
            
            <p className="text-foreground/80 text-sm mb-4 text-center">{personality.description}</p>
            
            {personality.quote && (
              <div className="mt-auto pt-3 border-t border-border/20 w-full">
                <p className="text-xs italic text-foreground/60 text-center">"{personality.quote}"</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 