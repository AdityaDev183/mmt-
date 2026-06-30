import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={cn('font-bold tracking-tighter flex items-center gap-1', sizeClasses[size], className)}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
        Creator Copilot
      </span>
      <span className="text-foreground">AI</span>
    </div>
  );
};

export const TravelMindLogo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={cn('font-bold tracking-tighter flex items-center gap-1', sizeClasses[size], className)}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        TravelMind
      </span>
      <span className="text-foreground">AI</span>
    </div>
  );
};
