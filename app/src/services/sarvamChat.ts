import { apiClient } from './api';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const sarvamChat = async (
  message: string,
  language: string,
  history: ChatMessage[] = []
): Promise<string> => {
  try {
    const response = await apiClient.post('/chat', {
      message,
      language,
      history,
    });

    const raw = response.data.choices?.[0]?.message?.content ?? '';
    return String(raw).trim();
  } catch (error) {
    console.error('Chat Service Error:', error);
    throw error;
  }
};
