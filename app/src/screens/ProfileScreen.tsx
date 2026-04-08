import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Typography } from '../components/ui/Typography';
import { t } from '../utils/localization';

const LANGUAGES = [
  { code: 'ml-IN', label: 'മലയാളം' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'en-IN', label: 'English' },
];

export const ProfileScreen = () => {
  const { 
    language, setLanguage, 
    textSize, setTextSize, 
    highContrast, setHighContrast,
    userName, setUserName,
    userAge, setUserAge
  } = useAppStore();

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Typography variant="h1" className="mb-8 font-bold text-primary">
          {t('profile', language)}
        </Typography>

        {/* Profile Info */}
        <View className={`p-6 rounded-3xl mb-8 ${highContrast ? 'bg-gray-900 border-2 border-white' : 'bg-card'}`}>
          <Typography variant="h3" className="mb-4 font-bold">{t('whatToCallYou', language)}</Typography>
          <TextInput
            className={`rounded-2xl p-4 mb-4 text-xl font-bold ${highContrast ? 'text-white border-2 border-white bg-black' : 'text-primary bg-background'}`}
            value={userName}
            onChangeText={setUserName}
            placeholder={t('namePlaceholder', language)}
            placeholderTextColor={highContrast ? '#cccccc' : '#64748b'}
          />
          <TextInput
            className={`rounded-2xl p-4 text-xl font-bold ${highContrast ? 'text-white border-2 border-white bg-black' : 'text-primary bg-background'}`}
            value={userAge}
            onChangeText={setUserAge}
            placeholder={t('agePlaceholder', language)}
            placeholderTextColor={highContrast ? '#cccccc' : '#64748b'}
            keyboardType="numeric"
          />
        </View>

        {/* Language Selection */}
        <View className={`p-6 rounded-3xl mb-8 ${highContrast ? 'bg-gray-900 border-2 border-white' : 'bg-card'}`}>
          <Typography variant="h3" className="mb-4 font-bold">Language</Typography>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              className={`p-4 rounded-2xl mb-3 border-2 ${
                language === lang.code 
                  ? (highContrast ? 'bg-white border-white' : 'bg-primary border-primary') 
                  : (highContrast ? 'bg-transparent border-gray-600' : 'bg-transparent border-primary/30')
              }`}
            >
              <Typography 
                variant="h3" 
                className={`text-center ${
                  language === lang.code 
                    ? (highContrast ? 'text-black' : 'text-background') 
                    : (highContrast ? 'text-white' : 'text-primary')
                }`}
              >
                {lang.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* Text Size */}
        <View className={`p-6 rounded-3xl mb-8 ${highContrast ? 'bg-gray-900 border-2 border-white' : 'bg-card'}`}>
          <Typography variant="h3" className="mb-4 font-bold">{t('textSize', language)}</Typography>
          <View className="flex-row justify-between">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setTextSize(size)}
                className={`flex-1 p-4 rounded-2xl mx-1 border-2 ${
                  textSize === size 
                    ? (highContrast ? 'bg-white border-white' : 'bg-primary border-primary') 
                    : (highContrast ? 'bg-transparent border-gray-600' : 'bg-transparent border-primary/30')
                }`}
              >
                <Typography 
                  variant="caption" 
                  className={`text-center ${
                    textSize === size 
                      ? (highContrast ? 'text-black' : 'text-background') 
                      : (highContrast ? 'text-white' : 'text-primary')
                  }`}
                >
                  {t(size, language)}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* High Contrast */}
        <View className={`p-6 rounded-3xl mb-8 flex-row items-center justify-between ${highContrast ? 'bg-gray-900 border-2 border-white' : 'bg-card'}`}>
          <Typography variant="h3" className="font-bold">{t('highContrast', language)}</Typography>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            trackColor={{ false: '#475569', true: '#A3BBD9' }}
            thumbColor={highContrast ? '#ffffff' : '#121922'}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
        </View>

      </ScrollView>
    </View>
  );
};
