import axios from 'axios';

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === 'ERR_NETWORK' || !err.response) {
      return 'No internet, or cannot reach the learning server. Use Wi‑Fi and start the server on your computer.';
    }
    const data = err.response.data as { error?: string; details?: unknown };
    if (typeof data?.error === 'string') {
      return data.error;
    }
    if (data?.details && typeof data.details === 'object' && data.details !== null) {
      const d = data.details as { message?: string };
      if (typeof d.message === 'string') {
        return d.message;
      }
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Something went wrong. Please try again.';
}
