import axios from 'axios';
import { Platform } from 'react-native';

// Android: 127.0.0.1 works when `adb reverse tcp:3000 tcp:3000` is set (npm run android:studio does this).
// Emulator: same reverse, or use http://10.0.2.2:3000 if you never use reverse.
const BACKEND_URL =
  Platform.OS === 'android' ? 'http://127.0.0.1:3000' : 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: BACKEND_URL,
  // STT/TTS/Sarvam can take a while; avoid infinite spinners on slow networks
  timeout: 120_000,
});
