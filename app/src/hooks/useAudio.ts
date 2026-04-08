import { useState, useEffect } from 'react';
import Sound from 'react-native-nitro-sound';
import { Platform, PermissionsAndroid } from 'react-native';
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

export const useAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Sound.setSubscriptionDuration(0.05);
    return () => {
      Sound.removePlayBackListener();
      Sound.removePlaybackEndListener();
      Sound.stopRecorder();
      Sound.stopPlayer();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        return (
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      const result = await Sound.startRecorder();
      setIsRecording(true);
      return result;
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await Sound.stopRecorder();
      setIsRecording(false);
      return result;
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

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
