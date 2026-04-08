import { apiClient } from './api';
import { getAudioMultipartDescriptor } from '../utils/audioUpload';

export const sarvamSTT = async (audioUri: string, language: string = 'hi-IN'): Promise<string> => {
  try {
    const formData = new FormData();
    const part = getAudioMultipartDescriptor(audioUri);
    formData.append('file', {
      uri: part.uri,
      type: part.type,
      name: part.name,
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
