import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessage } from '../services/sarvamChat';

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;

  onboardingComplete: boolean;
  completeOnboarding: () => void;

  chatHistory: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearHistory: () => void;
  
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
  
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'hi-IN',
      setLanguage: (lang) => set({ language: lang }),

      onboardingComplete: false,
      completeOnboarding: () => set({ onboardingComplete: true }),

      chatHistory: [],
      addMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
      clearHistory: () => set({ chatHistory: [] }),
      
      isRecording: false,
      setIsRecording: (val) => set({ isRecording: val }),
      
      isPlaying: false,
      setIsPlaying: (val) => set({ isPlaying: val }),
      
      isLoading: false,
      setIsLoading: (val) => set({ isLoading: val }),
    }),
    {
      name: 'nextlayer-learn-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        chatHistory: state.chatHistory,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
