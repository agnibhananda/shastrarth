import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'minimal' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon
}: ButtonProps) {
  const baseClasses = 'relative font-medium transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:ring-offset-background';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 border border-primary/80 hover:translate-y-[-2px] hover:shadow-md',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 border border-secondary/80 hover:translate-y-[-2px] hover:shadow-md',
    outline: 'bg-transparent border border-foreground/60 text-foreground hover:bg-foreground/5 hover:translate-y-[-2px] hover:shadow-md',
    gold: 'bg-gradient-to-r from-gold/80 to-gold text-ink font-serif hover:from-gold hover:to-gold/90 border border-gold/50 hover:translate-y-[-2px] hover:shadow-md',
    minimal: 'bg-card/40 backdrop-filter backdrop-blur-sm text-foreground border border-white/10 hover:bg-card/60 hover:translate-y-[-2px] hover:shadow-md',
    glass: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-filter backdrop-blur-md text-foreground/90 border border-white/20 hover:bg-white/20 hover:translate-y-[-2px] hover:shadow-lg'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-5 py-2.5 text-base rounded-md',
    lg: 'px-7 py-3.5 text-lg rounded-md',
    xl: 'px-10 py-4 text-xl rounded-lg'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-sm' : '';

  // Add elegant animations and effects with subtle hover effects based on variant
  const effectClasses = !disabled 
    ? variant === 'glass' || variant === 'minimal'
      ? 'after:content-[""] after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:bg-white/5 after:-z-10'
      : 'after:content-[""] after:absolute after:inset-0 after:border after:border-transparent hover:after:border-gold/20 after:rounded-md after:transition-all after:duration-300 after:-z-10 after:translate-x-1 after:translate-y-1 hover:after:translate-x-1.5 hover:after:translate-y-1.5'
    : '';
  
  // Special styling for submit buttons
  const submitClasses = type === 'submit' ? 'hover:shadow-lg hover:shadow-primary/20 hover:brightness-105' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${effectClasses} ${submitClasses} ${className}`}
      style={{
        WebkitBackdropFilter: (variant === 'glass' || variant === 'minimal') ? 'blur(8px)' : undefined,
        backdropFilter: (variant === 'glass' || variant === 'minimal') ? 'blur(8px)' : undefined,
      }}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
} 