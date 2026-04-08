module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    // Preset (not a plugin): returns { plugins: [...] } for className / CSS interop
    'nativewind/babel',
  ],
  plugins: [
    // Must stay last
    'react-native-reanimated/plugin',
  ],
};
