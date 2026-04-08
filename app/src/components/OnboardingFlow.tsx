import React, { useState } from 'react';
import { View, TextInput, Animated, Easing } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Typography } from './ui/Typography';
import { LargeButton } from './ui/LargeButton';
import { t } from '../utils/localization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LANGUAGES = [
  { code: 'ml-IN', label: 'മലയാളം' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'en-IN', label: 'English' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const { language, setLanguage, userName, setUserName, userAge, setUserAge, completeOnboarding, highContrast } = useAppStore();

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setStep(2);
  };

  const handleMicPermission = () => {
    // We would request actual mic permission here
    setStep(3);
  };

  const handleProfileSubmit = () => {
    if (userName.trim()) {
      setStep(4);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
  };

  const renderStep1 = () => (
    <View className="flex-1 justify-center px-6">
      <Typography variant="h1" className="text-center mb-12 text-primary">
        NextLayer Learn
      </Typography>
      <View className="mb-10">
        <Typography variant="h2" className="text-center mb-2">Choose your language</Typography>
        <Typography variant="h2" className="text-center mb-2">अपनी भाषा चुनें</Typography>
        <Typography variant="h2" className="text-center mb-2">உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</Typography>
        <Typography variant="h2" className="text-center">നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക</Typography>
      </View>
      {LANGUAGES.map((lang) => (
        <LargeButton
          key={lang.code}
          title={lang.label}
          onPress={() => handleLanguageSelect(lang.code)}
          className="mb-4"
          variant="secondary"
        />
      ))}
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 justify-center px-6 items-center">
      <View className="bg-card p-10 rounded-full mb-10">
        <Icon name="microphone" size={120} color={highContrast ? '#ffffff' : '#A3BBD9'} />
      </View>
      <Typography variant="h1" className="text-center mb-6">
        {t('micPermissionTitle', language)}
      </Typography>
      <Typography variant="h3" className="text-center mb-12 opacity-80">
        {t('micPermissionDesc', language)}
      </Typography>
      <LargeButton
        title={t('allow', language)}
        onPress={handleMicPermission}
        className="w-full"
      />
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 justify-center px-6">
      <Typography variant="h2" className="text-center mb-10">
        {t('whatToCallYou', language)}
      </Typography>
      
      <TextInput
        className={`bg-card rounded-2xl p-6 mb-6 text-2xl font-bold ${highContrast ? 'text-white border-2 border-white' : 'text-primary'}`}
        placeholder={t('namePlaceholder', language)}
        placeholderTextColor={highContrast ? '#cccccc' : '#64748b'}
        value={userName}
        onChangeText={setUserName}
      />
      
      <TextInput
        className={`bg-card rounded-2xl p-6 mb-12 text-2xl font-bold ${highContrast ? 'text-white border-2 border-white' : 'text-primary'}`}
        placeholder={t('agePlaceholder', language)}
        placeholderTextColor={highContrast ? '#cccccc' : '#64748b'}
        value={userAge}
        onChangeText={setUserAge}
        keyboardType="numeric"
      />

      <LargeButton
        title={t('next', language)}
        onPress={handleProfileSubmit}
        className={`w-full ${!userName.trim() ? 'opacity-50' : ''}`}
        disabled={!userName.trim()}
      />
    </View>
  );

  const renderStep4 = () => {
    return (
      <View className="flex-1 justify-center px-6 items-center">
        <View className="mb-16 items-center">
          <View className="bg-primary p-8 rounded-full mb-8 shadow-lg shadow-black/50">
            <Icon name="microphone" size={80} color="#121922" />
          </View>
          <Typography variant="h2" className="text-center mb-4">
            {t('holdToSpeak', language)}
          </Typography>
        </View>
        <LargeButton
          title={t('letsGo', language)}
          onPress={handleComplete}
          className="w-full"
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </View>
  );
}
