import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../store/useAppStore';
import { sarvamSTT } from '../services/sarvamSTT';
import { sarvamChat } from '../services/sarvamChat';
import { sarvamTTS } from '../services/sarvamTTS';
import { useAudio } from '../hooks/useAudio';
import { getErrorMessage } from '../utils/errors';

export const HomeScreen = () => {
  const language = useAppStore((s) => s.language);
  const addMessage = useAppStore((s) => s.addMessage);
  const isLoading = useAppStore((s) => s.isLoading);
  const setIsLoading = useAppStore((s) => s.setIsLoading);

  const { startRecording, stopRecording, playAudio, isRecording } = useAudio();
  const [transcribedText, setTranscribedText] = useState('');

  const teachFromUserText = async (userText: string) => {
    const historySnapshot = useAppStore.getState().chatHistory;
    const lang = useAppStore.getState().language;

    const responseText = await sarvamChat(userText, lang, historySnapshot);
    if (!responseText) {
      Alert.alert('No reply', 'The teacher did not return an answer. Please try again.');
      return;
    }

    addMessage({ role: 'user', content: userText });
    addMessage({ role: 'assistant', content: responseText });

    const audioBase64 = await sarvamTTS(responseText, lang);
    if (audioBase64) {
      await playAudio(audioBase64);
    }
  };

  const handleRecordPress = async () => {
    if (isRecording) {
      const audioUri = await stopRecording();
      if (audioUri) {
        await processRecordedAudio(audioUri);
      }
    } else {
      await startRecording();
    }
  };

  const processRecordedAudio = async (audioUri: string) => {
    setIsLoading(true);
    try {
      const text = await sarvamSTT(audioUri, language);
      setTranscribedText(text);
      if (!text) {
        Alert.alert('Did not hear clearly', 'Please tap the mic and speak again.');
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
    if (isLoading || isRecording) {
      return;
    }
    setTranscribedText('');
    setIsLoading(true);
    teachFromUserText(prompt)
      .catch((error) => Alert.alert('Error', getErrorMessage(error)))
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What do you want to learn today?</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onQuickAction(
              'Teach me very simple English. One short step at a time. Start with a greeting.'
            )
          }
        >
          <Text style={styles.actionText}>Learn English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onQuickAction(
              'Teach me phone basics: calls, messages, and battery. Very simple words, step by step.'
            )
          }
        >
          <Text style={styles.actionText}>Phone basics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onQuickAction('I have a question. Please answer in very simple words.')}
        >
          <Text style={styles.actionText}>Ask anything</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recordContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1f6feb" />
        ) : (
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={handleRecordPress}
            accessibilityRole="button"
            accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
          >
            <Icon name={isRecording ? 'stop' : 'microphone'} size={64} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.recordHint}>{isRecording ? 'Tap to stop' : 'Tap to speak'}</Text>
      </View>

      {transcribedText ? (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptText}>You said: {transcribedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
  },
  header: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#24292f',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 8,
    minWidth: '30%',
    borderWidth: 2,
    borderColor: '#d0d7de',
    flexGrow: 1,
  },
  actionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0969da',
    textAlign: 'center',
  },
  recordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  recordButton: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#1f6feb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  recordingButton: {
    backgroundColor: '#cf222e',
  },
  recordHint: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#57606a',
  },
  transcriptContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#ddf4ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#54aeff66',
  },
  transcriptText: {
    fontSize: 18,
    color: '#24292f',
    fontWeight: '500',
  },
});
