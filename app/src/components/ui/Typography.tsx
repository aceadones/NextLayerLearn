import React from 'react';
import { Text, TextProps } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({ variant = 'body', className = '', children, ...props }: TypographyProps) => {
  const textSize = useAppStore((s) => s.textSize);
  const highContrast = useAppStore((s) => s.highContrast);

  let baseSizeClass = '';
  
  if (textSize === 'small') {
    baseSizeClass = variant === 'h1' ? 'text-3xl' : variant === 'h2' ? 'text-2xl' : variant === 'h3' ? 'text-xl' : variant === 'caption' ? 'text-sm' : 'text-base';
  } else if (textSize === 'medium') {
    baseSizeClass = variant === 'h1' ? 'text-4xl' : variant === 'h2' ? 'text-3xl' : variant === 'h3' ? 'text-2xl' : variant === 'caption' ? 'text-base' : 'text-lg';
  } else {
    // Large (default)
    baseSizeClass = variant === 'h1' ? 'text-5xl' : variant === 'h2' ? 'text-4xl' : variant === 'h3' ? 'text-3xl' : variant === 'caption' ? 'text-lg' : 'text-xl';
  }

  const weightClass = variant.startsWith('h') ? 'font-bold' : 'font-normal';
  const colorClass = highContrast ? 'text-white' : 'text-textPrimary';

  return (
    <Text 
      className={`${baseSizeClass} ${weightClass} ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};
