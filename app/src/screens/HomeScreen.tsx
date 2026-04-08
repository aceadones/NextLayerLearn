import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { sarvamSTT } from '../services/sarvamSTT';
import { useAudio } from '../hooks/useAudio';
import { useTeachingPipeline } from '../hooks/useTeachingPipeline';
import { getErrorMessage } from '../utils/errors';
import { Typography } from '../components/ui/Typography';
import { HoldToSpeakButton } from '../components/ui/HoldToSpeakButton';
import { Card } from '../components/ui/Card';
import { t } from '../utils/localization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeScreen = () => {
  const { language, userName, isLoading, setIsLoading, highContrast } = useAppStore();
  const { startRecording, stopRecording, playAudio, isRecording } = useAudio();
  const { teachFromUserText, runLesson } = useTeachingPipeline(playAudio);

  const handlePressIn = async () => {
    await startRecording();
  };

  const handlePressOut = async () => {
    const audioUri = await stopRecording();
    if (audioUri) {
      await processRecordedAudio(audioUri);
    }
  };

  const processRecordedAudio = async (audioUri: string) => {
    setIsLoading(true);
    try {
      const text = await sarvamSTT(audioUri, language);
      if (!text) {
        Alert.alert('Did not hear clearly', 'Please hold the mic and speak again.');
        return;
      }
      await teachFromUserText(text);
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onQuickAction = (prompt: string) => {
    if (isLoading || isRecording) return;
    void runLesson(prompt);
  };

  const topics = [
    { id: 'english', label: t('learnEnglish', language), prompt: 'Teach me very simple English. One short step at a time.' },
    { id: 'phone', label: t('useYourPhone', language), prompt: 'Teach me phone basics: calls, messages, and battery. Very simple words.' },
    { id: 'ai', label: t('learnAI', language), prompt: 'Explain what AI is in very simple words.' },
    { id: 'fix', label: t('fixThings', language), prompt: 'Give me simple tips to fix things at home.' },
  ];

  const recentConversations = useAppStore(s => s.chatHistory).slice(-2).reverse();

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity className="p-2">
            <Icon name="menu" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
          </TouchableOpacity>
          <Typography variant="h2" className="text-primary font-bold">
            NextLayer Learn
          </Typography>
          <TouchableOpacity className="p-2">
            <Icon name="account-circle" size={32} color={highContrast ? '#ffffff' : '#A3BBD9'} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View className="mb-8">
          <Typography variant="h1" className="mb-2">
            {t('hello', language)} {userName ? userName : ''}!
          </Typography>
        </View>

        {/* Topics Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-12 overflow-visible">
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              onPress={() => onQuickAction(topic.prompt)}
              className={`mr-4 px-6 py-4 rounded-full border-2 ${highContrast ? 'border-white bg-gray-900' : 'border-primary bg-card'}`}
            >
              <Typography variant="h3" className={highContrast ? 'text-white' : 'text-primary'}>
                {topic.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Mic Button */}
        <View className="items-center justify-center my-8">
          {isLoading ? (
            <View className="items-center justify-center h-32">
              <ActivityIndicator size="large" color={highContrast ? '#ffffff' : '#A3BBD9'} />
              <Typography variant="h3" className="mt-4 opacity-80">Thinking...</Typography>
            </View>
          ) : (
            <View className="items-center">
              <Typography variant="h2" className="text-center mb-8 opacity-90">
                {t('holdToSpeak', language)}
              </Typography>
              <HoldToSpeakButton
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                isRecording={isRecording}
                size={140}
              />
            </View>
          )}
        </View>

        {/* Recent Conversations */}
        {recentConversations.length > 0 && (
          <View className="mt-12">
            <Typography variant="h2" className="mb-6 opacity-80">
              {t('recentConversations', language)}
            </Typography>
            {recentConversations.map((msg, idx) => (
              <Card
                key={idx}
                title={msg.role === 'user' ? 'You said' : 'Teacher said'}
                subtitle={msg.content}
                className="mb-4"
                icon={<Icon name={msg.role === 'user' ? 'account' : 'robot'} size={24} color={highContrast ? '#ffffff' : '#A3BBD9'} />}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
