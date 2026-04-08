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
    baseSizeClass =
      variant === 'h1'
        ? 'text-lg'
        : variant === 'h2'
          ? 'text-base'
          : variant === 'h3'
            ? 'text-sm'
            : variant === 'caption'
              ? 'text-xs'
              : 'text-sm';
  } else if (textSize === 'medium') {
    baseSizeClass =
      variant === 'h1'
        ? 'text-2xl'
        : variant === 'h2'
          ? 'text-lg'
          : variant === 'h3'
            ? 'text-base'
            : variant === 'caption'
              ? 'text-sm'
              : 'text-base';
  } else {
    baseSizeClass =
      variant === 'h1'
        ? 'text-3xl'
        : variant === 'h2'
          ? 'text-xl'
          : variant === 'h3'
            ? 'text-lg'
            : variant === 'caption'
              ? 'text-base'
              : 'text-lg';
  }

  const colorClass = highContrast ? 'text-white' : 'text-textPrimary';

  return (
    <Text className={`${baseSizeClass} font-normal ${colorClass} ${className}`} {...props}>
      {children}
    </Text>
  );
};
