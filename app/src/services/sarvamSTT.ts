import { apiClient } from './api';

export const sarvamSTT = async (audioUri: string, language: string = 'hi-IN'): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      type: 'audio/wav',
      name: 'audio.wav',
    } as any);
    formData.append('language', language);

    const response = await apiClient.post('/stt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const t = response.data?.transcript ?? response.data?.text ?? '';
    return String(t).trim();
  } catch (error) {
    console.error('STT Service Error:', error);
    throw error;
  }
};
