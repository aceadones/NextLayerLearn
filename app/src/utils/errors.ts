import axios from 'axios';

function stringifyDetails(details: unknown): string | null {
  if (details == null) {
    return null;
  }
  if (typeof details === 'string') {
    return details;
  }
  if (typeof details === 'object') {
    const d = details as Record<string, unknown>;
    if (typeof d.message === 'string') {
      return d.message;
    }
    if (typeof d.error === 'string') {
      return d.error;
    }
    try {
      return JSON.stringify(details);
    } catch {
      return null;
    }
  }
  return String(details);
}

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') {
      return 'Request timed out. Check your connection, keep the backend running, and try again.';
    }
    if (err.code === 'ERR_NETWORK' || !err.response) {
      return 'No internet, or cannot reach the learning server. On a phone, use USB with adb reverse, or deploy the backend and update the app URL.';
    }
    const data = err.response.data as { error?: string; details?: unknown };
    if (typeof data?.error === 'string') {
      const detailStr = stringifyDetails(data.details);
      return detailStr ? `${data.error}: ${detailStr}` : data.error;
    }
    const onlyDetails = stringifyDetails(data?.details);
    if (onlyDetails) {
      return onlyDetails;
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Something went wrong. Please try again.';
}
