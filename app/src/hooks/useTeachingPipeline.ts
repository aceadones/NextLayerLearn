import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { sarvamChat } from '../services/sarvamChat';
import { sarvamTTS } from '../services/sarvamTTS';
import { getErrorMessage } from '../utils/errors';

export function useTeachingPipeline(playAudio: (uriOrB64: string) => Promise<void>) {
  const addMessage = useAppStore((s) => s.addMessage);
  const setIsLoading = useAppStore((s) => s.setIsLoading);

  const teachFromUserText = useCallback(
    async (userText: string) => {
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
    },
    [addMessage, playAudio]
  );

  const runLesson = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      try {
        await teachFromUserText(prompt);
      } catch (error) {
        Alert.alert('Error', getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, teachFromUserText]
  );

  return { teachFromUserText, runLesson };
}
