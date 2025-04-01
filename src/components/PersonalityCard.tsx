import React, { useState } from 'react';
import Image from 'next/image';

interface PersonalityCardProps {
  personality: {
    id: string;
    name: string;
    description: string;
    style: string;
    quote: string;
    image?: string;
    symbol?: string;
  };
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export default function PersonalityCard({ 
  personality,
  onClick,
  selected = false,
  className = ''
}: PersonalityCardProps) {
  const { id, name, description, style, quote, image, symbol } = personality;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-morphism p-6 cursor-pointer transition-all duration-300 hover-float ${
        selected ? 'border-primary/70 ring-2 ring-primary/30 shadow-sleek shadow-primary/10' : 'border-white/10'
      } ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className={`personality-avatar flex-shrink-0 subtle-glow transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
          {image ? (
            <img 
              src={`/personalities/${image}`} 
              alt={name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-card/80 backdrop-blur-sm">
              <span className="text-gold/90 font-serif text-2xl">{symbol || name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-serif gold-accent mb-1">{name}</h3>
          <p className="text-sm text-foreground/70 italic mb-3">{style}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-foreground/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      {quote && (
        <div className={`mt-5 pt-3 border-t border-white/10 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
          <p className="text-foreground/80 text-sm italic leading-relaxed">"{quote}"</p>
        </div>
      )}
    </div>
  );
} 