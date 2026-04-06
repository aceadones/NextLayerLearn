import { apiClient } from './api';

export const sarvamTTS = async (text: string, language: string = 'hi-IN'): Promise<string> => {
  try {
    const response = await apiClient.post('/tts', {
      text,
      language,
    });

    // Assuming Sarvam TTS returns base64 audio or a URL.
    // Adjust according to the actual response structure. 
    // Usually, it returns base64 encoded audio in `response.data.audios[0]`.
    return response.data.audios?.[0] || '';
  } catch (error) {
    console.error('TTS Service Error:', error);
    throw error;
  }
};
