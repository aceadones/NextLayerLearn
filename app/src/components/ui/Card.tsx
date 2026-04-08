import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Typography } from './Typography';
import { useAppStore } from '../../store/useAppStore';

interface CardProps extends TouchableOpacityProps {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Card = ({ title, subtitle, className = '', icon, ...props }: CardProps) => {
  const highContrast = useAppStore((s) => s.highContrast);

  const bgClass = highContrast ? 'bg-gray-900 border-2 border-white' : 'bg-card';
  const textClass = highContrast ? 'text-white' : 'text-primary';

  return (
    <TouchableOpacity
      className={`rounded-3xl p-6 shadow-md shadow-black/20 ${bgClass} ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Typography variant="h3" className={`${textClass} font-bold mb-2`}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-textSecondary opacity-80">
              {subtitle}
            </Typography>
          )}
        </View>
        {icon && (
          <View className="bg-background/50 rounded-full p-3">
            {icon}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
