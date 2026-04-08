import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessage } from '../services/sarvamChat';

interface AppState {
  // Localization
  language: string;
  setLanguage: (lang: string) => void;

  // Accessibility
  textSize: 'small' | 'medium' | 'large';
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;

  // User Profile
  userName: string;
  setUserName: (name: string) => void;
  userAge: string;
  setUserAge: (age: string) => void;

  // Onboarding
  onboardingComplete: boolean;
  completeOnboarding: () => void;

  // Chat State
  chatHistory: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearHistory: () => void;
  
  // App Interaction State
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  completedTopicsCount: number;
  incrementCompletedTopics: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'hi-IN',
      setLanguage: (lang) => set({ language: lang }),

      textSize: 'large',
      setTextSize: (size) => set({ textSize: size }),

      highContrast: false,
      setHighContrast: (val) => set({ highContrast: val }),

      userName: '',
      setUserName: (name) => set({ userName: name }),

      userAge: '',
      setUserAge: (age) => set({ userAge: age }),

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
      
      completedTopicsCount: 0,
      incrementCompletedTopics: () => set((state) => ({ completedTopicsCount: state.completedTopicsCount + 1 })),
    }),
    {
      name: 'nextlayer-learn-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        textSize: state.textSize,
        highContrast: state.highContrast,
        userName: state.userName,
        userAge: state.userAge,
        chatHistory: state.chatHistory,
        onboardingComplete: state.onboardingComplete,
        completedTopicsCount: state.completedTopicsCount,
      }),
    }
  )
);
