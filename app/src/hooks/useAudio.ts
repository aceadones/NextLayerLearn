import { useState, useEffect, useRef, useCallback } from 'react';
import Sound from 'react-native-nitro-sound';
import { Platform, PermissionsAndroid, Alert, InteractionManager } from 'react-native';
import RNFS from 'react-native-fs';

function isLocalAudioPath(uri: string): boolean {
  if (!uri) {
    return false;
  }
  if (uri.startsWith('file://')) {
    return true;
  }
  if (Platform.OS === 'android' && uri.startsWith('/')) {
    return true;
  }
  return Platform.OS === 'ios' && uri.startsWith('/');
}

/** Run after the current Activity / window is ready (avoids Android "not attached to an Activity"). */
function runWhenUiReady(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(resolve, 16);
      });
    });
  });
}

export const useAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const recorderActiveRef = useRef(false);

  useEffect(() => {
    Sound.setSubscriptionDuration(0.05);
    return () => {
      Sound.removePlayBackListener();
      Sound.removePlaybackEndListener();
      try {
        if (recorderActiveRef.current) {
          recorderActiveRef.current = false;
          void Sound.stopRecorder();
        }
      } catch {
        /* ignore */
      }
      try {
        void Sound.stopPlayer();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        await runWhenUiReady();
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }, []);

  const startRecording = useCallback(async () => {
    await runWhenUiReady();

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      setTimeout(() => {
        Alert.alert(
          'Microphone needed',
          'Please allow microphone access in Settings so the app can hear you.'
        );
      }, 250);
      return;
    }

    try {
      const result = await Sound.startRecorder();
      recorderActiveRef.current = true;
      setIsRecording(true);
      return result;
    } catch (error) {
      console.error('Failed to start recording', error);
      recorderActiveRef.current = false;
      setIsRecording(false);
    }
  }, [requestPermissions]);

  const stopRecording = useCallback(async () => {
    if (!recorderActiveRef.current) {
      setIsRecording(false);
      return undefined;
    }

    recorderActiveRef.current = false;
    try {
      const result = await Sound.stopRecorder();
      setIsRecording(false);
      return result;
    } catch (error) {
      console.error('Failed to stop recording', error);
      setIsRecording(false);
      return undefined;
    }
  }, []);

  const playAudio = async (audioUriOrBase64: string) => {
    try {
      let uri = audioUriOrBase64;
      if (!isLocalAudioPath(audioUriOrBase64)) {
        const path = `${RNFS.CachesDirectoryPath}/nll_tts.wav`;
        await RNFS.writeFile(path, audioUriOrBase64, 'base64');
        uri = Platform.OS === 'android' ? `file://${path}` : path;
      }

      Sound.removePlayBackListener();
      Sound.removePlaybackEndListener();
      await Sound.stopPlayer();
      await Sound.startPlayer(uri);
      setIsPlaying(true);

      Sound.addPlaybackEndListener(() => {
        Sound.removePlayBackListener();
        Sound.removePlaybackEndListener();
        setIsPlaying(false);
      });
    } catch (error) {
      console.error('Failed to play audio', error);
      setIsPlaying(false);
    }
  };

  return {
    isRecording,
    isPlaying,
    startRecording,
    stopRecording,
    playAudio,
  };
};
