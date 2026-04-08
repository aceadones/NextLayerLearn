import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Typography } from './Typography';
import { useAppStore } from '../../store/useAppStore';

interface LargeButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const LargeButton = ({ title, className = '', variant = 'primary', ...props }: LargeButtonProps) => {
  const highContrast = useAppStore((s) => s.highContrast);

  let bgClass = 'bg-primary';
  let textClass = 'text-background';

  if (variant === 'secondary') {
    bgClass = 'bg-card';
    textClass = 'text-primary';
  } else if (variant === 'outline') {
    bgClass = 'bg-transparent border-2 border-primary';
    textClass = 'text-primary';
  }

  if (highContrast) {
    if (variant === 'primary') {
      bgClass = 'bg-white';
      textClass = 'text-black';
    } else if (variant === 'secondary') {
      bgClass = 'bg-gray-800';
      textClass = 'text-white';
    } else if (variant === 'outline') {
      bgClass = 'bg-transparent border-4 border-white';
      textClass = 'text-white';
    }
  }

  return (
    <TouchableOpacity
      className={`rounded-2xl py-5 px-6 items-center justify-center active:opacity-80 ${bgClass} ${className}`}
      {...props}
    >
      <Typography variant="h3" className={`${textClass} font-bold text-center`}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};
