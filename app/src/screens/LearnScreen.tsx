import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useAudio } from '../hooks/useAudio';
import { useTeachingPipeline } from '../hooks/useTeachingPipeline';

const LESSONS: { title: string; prompt: string }[] = [
  {
    title: 'Learn English',
    prompt:
      'Teach me very simple English. One short step at a time. Start with a greeting. Use my language for hard words if needed.',
  },
  {
    title: 'Phone basics',
    prompt:
      'Teach me phone basics: calls, messages, photos, and battery. Very simple words, step by step.',
  },
  {
    title: 'AI basics',
    prompt:
      'Teach me what AI is in very simple words. Give one small example people use every day. Short steps.',
  },
  {
    title: 'Daily tasks',
    prompt:
      'Teach me simple daily phone tasks: alarm, torch, calculator, and WhatsApp voice message. One task at a time.',
  },
];

export const LearnScreen = () => {
  const isLoading = useAppStore((s) => s.isLoading);
  const { playAudio } = useAudio();
  const { runLesson } = useTeachingPipeline(playAudio);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>Tap a topic. The teacher will speak the answer.</Text>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1f6feb" />
          <Text style={styles.loadingText}>Please wait…</Text>
        </View>
      ) : null}

      {LESSONS.map((lesson) => (
        <TouchableOpacity
          key={lesson.title}
          style={styles.card}
          activeOpacity={0.9}
          disabled={isLoading}
          onPress={() => void runLesson(lesson.prompt)}
        >
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardHint}>Tap to start</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#24292f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#57606a',
    marginBottom: 24,
    lineHeight: 26,
  },
  loading: {
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#57606a',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 22,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#d0d7de',
    minHeight: 88,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0969da',
  },
  cardHint: {
    fontSize: 16,
    color: '#57606a',
    marginTop: 6,
  },
});
