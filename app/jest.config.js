module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-native-screen|react-native-screens|react-native-safe-area-context|@react-navigation/.*|react-native-vector-icons)',
  ],
};
