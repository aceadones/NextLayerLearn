import axios from 'axios';
import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2 to access localhost
const BACKEND_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: BACKEND_URL,
});
