import React from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useAudio } from '../hooks/useAudio';
import { useTeachingPipeline } from '../hooks/useTeachingPipeline';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { t } from '../utils/localization';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const LearnScreen = () => {
  const { language, isLoading, completedTopicsCount, incrementCompletedTopics, highContrast } = useAppStore();
  const { playAudio } = useAudio();
  const { runLesson } = useTeachingPipeline(playAudio);

  const LESSONS = [
    {
      id: 'english',
      title: t('learnEnglish', language),
      hint: 'Start with a simple greeting',
      prompt: 'Teach me very simple English. One short step at a time. Start with a greeting.',
      icon: 'alphabet-a',
    },
    {
      id: 'phone',
      title: t('useYourPhone', language),
      hint: 'Calls, messages, and battery',
      prompt: 'Teach me phone basics: calls, messages, and battery. Very simple words, step by step.',
      icon: 'cellphone',
    },
    {
      id: 'ai',
      title: t('learnAI', language),
      hint: 'What is AI?',
      prompt: 'Teach me what AI is in very simple words. Give one small example people use every day.',
      icon: 'robot-outline',
    },
    {
      id: 'fix',
      title: t('fixThings', language),
      hint: 'Simple home tips',
      prompt: 'Give me simple tips to fix things at home.',
      icon: 'wrench',
    },
  ];

  const handleLessonStart = async (prompt: string) => {
    incrementCompletedTopics();
    await runLesson(prompt);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Typography variant="h1" className="mb-4">
          {t('learnTitle', language)}
        </Typography>

        <View className={`p-4 rounded-2xl mb-8 ${highContrast ? 'bg-gray-800 border-2 border-white' : 'bg-primary/20'}`}>
          <Typography variant="h3" className="text-center font-bold">
            {t('completedTopics', language, completedTopicsCount.toString())}
          </Typography>
        </View>

        {isLoading && (
          <View className="items-center justify-center py-8">
            <ActivityIndicator size="large" color={highContrast ? '#ffffff' : '#A3BBD9'} />
            <Typography variant="h3" className="mt-4 opacity-80">Loading lesson...</Typography>
          </View>
        )}

        <View className="gap-y-4">
          {LESSONS.map((lesson) => (
            <Card
              key={lesson.id}
              title={lesson.title}
              subtitle={lesson.hint}
              onPress={() => handleLessonStart(lesson.prompt)}
              disabled={isLoading}
              icon={
                <TouchableOpacity onPress={() => handleLessonStart(lesson.prompt)}>
                  <Icon name="play-circle" size={40} color={highContrast ? '#ffffff' : '#A3BBD9'} />
                </TouchableOpacity>
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
