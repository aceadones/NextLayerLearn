jest.mock('@react-native-async-storage/async-storage', () => {
  const storage = {};
  return {
    setItem: jest.fn((key, value) => {
      storage[key] = value;
      return Promise.resolve();
    }),
    getItem: jest.fn((key) => Promise.resolve(storage[key] ?? null)),
    removeItem: jest.fn((key) => {
      delete storage[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach((k) => delete storage[k]);
      return Promise.resolve();
    }),
  };
});

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/tmp',
  CachesDirectoryPath: '/tmp',
  writeFile: jest.fn().mockResolvedValue(undefined),
  unlink: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native-audio-recorder-player', () => ({
  __esModule: true,
  default: {
    startRecorder: jest.fn().mockResolvedValue('/tmp/test.wav'),
    stopRecorder: jest.fn().mockResolvedValue('/tmp/test.wav'),
    startPlayer: jest.fn().mockResolvedValue(undefined),
    stopPlayer: jest.fn().mockResolvedValue(undefined),
    addPlayBackListener: jest.fn(),
    removePlayBackListener: jest.fn(),
  },
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
