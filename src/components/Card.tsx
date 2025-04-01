import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elegant' | 'manuscript' | 'minimal' | 'glass';
  bordered?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  variant = 'default',
  bordered = false
}: CardProps) {
  const baseClasses = 'p-6 rounded-md transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-card neubrutalism',
    elegant: 'bg-card/80 backdrop-filter backdrop-blur-sm shadow-md',
    manuscript: 'book-texture shadow-md border border-border/30',
    minimal: 'bg-card/50 backdrop-filter backdrop-blur-sm shadow-sm',
    glass: 'bg-gradient-to-br from-card/40 to-card/70 backdrop-filter backdrop-blur-md border border-white/10'
  };
  
  const hoverClasses = hover 
    ? variant === 'default'
      ? 'hover:translate-x-0 hover:translate-y-0 hover:shadow-[3px_3px_0px_0px_var(--color-foreground)]'
      : variant === 'glass' || variant === 'minimal'
        ? 'hover:shadow-lg hover:translate-y-[-4px] hover:bg-card/60 cursor-pointer'
        : 'hover:shadow-lg hover:translate-y-[-4px]'
    : '';
  
  const borderClasses = bordered
    ? variant === 'glass' 
      ? 'border border-white/20' 
      : variant === 'minimal'
        ? 'border border-border/10'
        : 'border border-gold/20'
    : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${borderClasses} ${className}`}
      onClick={onClick}
      style={{
        WebkitBackdropFilter: (variant === 'glass' || variant === 'elegant' || variant === 'minimal') ? 'blur(8px)' : undefined,
        backdropFilter: (variant === 'glass' || variant === 'elegant' || variant === 'minimal') ? 'blur(8px)' : undefined,
      }}
    >
      {children}
    </div>
  );
} 