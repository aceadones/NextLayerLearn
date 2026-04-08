import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useAudio } from '../hooks/useAudio';
import { sarvamSTT } from '../services/sarvamSTT';
import { sarvamChat } from '../services/sarvamChat';
import { sarvamTTS } from '../services/sarvamTTS';
import { getErrorMessage } from '../utils/errors';
import { Typography } from '../components/ui/Typography';
import { HoldToSpeakButton } from '../components/ui/HoldToSpeakButton';
import { t } from '../utils/localization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LANGUAGES = [
  { code: 'ml-IN', label: 'മലയാളം' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'en-IN', label: 'English' },
];

export const TranslateScreen = () => {
  const { language: nativeLanguage, highContrast } = useAppStore();
  const { startRecording, stopRecording, playAudio, isRecording } = useAudio();
  
  const [topLang, setTopLang] = useState('en-IN');
  const [bottomLang, setBottomLang] = useState(nativeLanguage);
  
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  
  const [activeHalf, setActiveHalf] = useState<'top' | 'bottom' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePressIn = async (half: 'top' | 'bottom') => {
    setActiveHalf(half);
    await startRecording();
  };

  const handlePressOut = async () => {
    const audioUri = await stopRecording();
    if (audioUri && activeHalf) {
      await processTranslation(audioUri, activeHalf);
    }
    setActiveHalf(null);
  };

  const processTranslation = async (audioUri: string, sourceHalf: 'top' | 'bottom') => {
    setIsLoading(true);
    try {
      const sourceLang = sourceHalf === 'top' ? topLang : bottomLang;
      const targetLang = sourceHalf === 'top' ? bottomLang : topLang;
      
      const text = await sarvamSTT(audioUri, sourceLang);
      if (!text) {
        Alert.alert('Error', 'Could not hear clearly. Please try again.');
        return;
      }

      if (sourceHalf === 'top') setTopText(text);
      else setBottomText(text);

      const prompt = `Translate this text to ${targetLang}. Reply with ONLY the translation. Text: ${text}`;
      const responseText = await sarvamChat(prompt, targetLang, []);
      
      if (!responseText) {
        Alert.alert('Error', 'Translation failed.');
        return;
      }

      if (sourceHalf === 'top') setBottomText(responseText);
      else setTopText(responseText);

      const audioBase64 = await sarvamTTS(responseText, targetLang);
      if (audioBase64) {
        await playAudio(audioBase64);
      }
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const renderHalf = (half: 'top' | 'bottom') => {
    const isTop = half === 'top';
    const currentLang = isTop ? topLang : bottomLang;
    const setCurrentLang = isTop ? setTopLang : setBottomLang;
    const text = isTop ? topText : bottomText;
    const isThisHalfRecording = isRecording && activeHalf === half;
    
    // Cycle through languages for simplicity in this minimal UI
    const cycleLanguage = () => {
      const currentIndex = LANGUAGES.findIndex(l => l.code === currentLang);
      const nextIndex = (currentIndex + 1) % LANGUAGES.length;
      setCurrentLang(LANGUAGES[nextIndex].code);
    };

    return (
      <View className={`flex-1 p-6 justify-between ${isTop ? 'rotate-180 bg-card/50' : 'bg-background'}`}>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={cycleLanguage}
            className={`px-4 py-2 rounded-full border-2 ${highContrast ? 'border-white' : 'border-primary'}`}
          >
            <Typography variant="h3" className={highContrast ? 'text-white' : 'text-primary'}>
              {LANGUAGES.find(l => l.code === currentLang)?.label}
            </Typography>
          </TouchableOpacity>
          
          {text ? (
            <TouchableOpacity className="flex-row items-center bg-primary/20 px-3 py-2 rounded-full">
              <Icon name="bookmark-outline" size={24} color={highContrast ? '#ffffff' : '#A3BBD9'} />
              <Typography variant="caption" className="ml-2">{t('savePhrase', nativeLanguage)}</Typography>
            </TouchableOpacity>
          ) : null}
        </View>

        <View className="flex-1 justify-center items-center py-4">
          {isLoading && activeHalf !== half && !text ? (
            <ActivityIndicator size="large" color={highContrast ? '#ffffff' : '#A3BBD9'} />
          ) : (
            <Typography variant="h2" className="text-center">
              {text || (isThisHalfRecording ? 'Listening...' : '...')}
            </Typography>
          )}
        </View>

        <View className="items-center">
          <HoldToSpeakButton
            onPressIn={() => handlePressIn(half)}
            onPressOut={handlePressOut}
            isRecording={isThisHalfRecording}
            size={100}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      {renderHalf('top')}
      <View className={`h-1 w-full ${highContrast ? 'bg-white' : 'bg-primary/30'}`} />
      {renderHalf('bottom')}
    </View>
  );
};
