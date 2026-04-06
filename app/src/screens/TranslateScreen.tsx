import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../store/useAppStore';
import { useAudio } from '../hooks/useAudio';
import { sarvamSTT } from '../services/sarvamSTT';
import { sarvamChat } from '../services/sarvamChat';
import { sarvamTTS } from '../services/sarvamTTS';
import { getErrorMessage } from '../utils/errors';

export const TranslateScreen = () => {
  const language = useAppStore((s) => s.language);
  const isLoading = useAppStore((s) => s.isLoading);
  const setIsLoading = useAppStore((s) => s.setIsLoading);
  const { startRecording, stopRecording, playAudio, isRecording } = useAudio();
  const [translatedText, setTranslatedText] = useState('');

  const handleRecordPress = async () => {
    if (isRecording) {
      const audioUri = await stopRecording();
      if (audioUri) {
        processTranslation(audioUri);
      }
    } else {
      await startRecording();
    }
  };

  const processTranslation = async (audioUri: string) => {
    setIsLoading(true);
    try {
      // 1. STT
      const text = await sarvamSTT(audioUri, language);
      if (!text) {
        Alert.alert('Did not hear clearly', 'Please tap the mic and speak again.');
        return;
      }

      const prompt = `You are a translator. Translate this text. If it is in an Indian language, translate to clear English. If it is already English, translate to the user's language (${language}). Reply with only the translation, no extra words. Text:\n${text}`;
      const responseText = await sarvamChat(prompt, language, []);
      if (!responseText) {
        Alert.alert('No translation', 'Please try again.');
        return;
      }
      setTranslatedText(responseText);

      const audioBase64 = await sarvamTTS(responseText, language);
      if (audioBase64) {
        await playAudio(audioBase64);
      }
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translator</Text>
      
      <View style={styles.recordContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1f6feb" />
        ) : (
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={handleRecordPress}
          >
            <Icon name={isRecording ? 'stop' : 'microphone'} size={64} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.recordHint}>
          {isRecording ? 'Tap to stop' : 'Tap to speak'}
        </Text>
      </View>

      {translatedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  recordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1f6feb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  recordingButton: {
    backgroundColor: '#cf222e',
  },
  recordHint: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    marginBottom: 40,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
