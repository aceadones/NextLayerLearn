import React, { useRef } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../../store/useAppStore';

interface HoldToSpeakButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  isRecording: boolean;
  size?: number;
  className?: string;
}

export const HoldToSpeakButton = ({ onPressIn, onPressOut, isRecording, size = 100, className = '' }: HoldToSpeakButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const highContrast = useAppStore((s) => s.highContrast);

  const handlePressIn = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', { enableVibrateFallback: true });
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
    onPressIn();
  };

  const handlePressOut = () => {
    ReactNativeHapticFeedback.trigger('impactLight', { enableVibrateFallback: true });
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPressOut();
  };

  const bgColor = isRecording ? 'bg-red-600' : (highContrast ? 'bg-white' : 'bg-primary');
  const iconColor = isRecording ? '#ffffff' : (highContrast ? '#000000' : '#121922');

  return (
    <View className={`items-center justify-center ${className}`}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={`rounded-full items-center justify-center shadow-lg shadow-black/50 ${bgColor}`}
          style={{ width: size, height: size }}
        >
          <Icon name="microphone" size={size * 0.5} color={iconColor} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
