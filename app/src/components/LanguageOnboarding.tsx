import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';

const OPTIONS = [
  { code: 'ml-IN', label: 'മലയാളം', sub: 'Malayalam' },
  { code: 'ta-IN', label: 'தமிழ்', sub: 'Tamil' },
  { code: 'hi-IN', label: 'हिन्दी', sub: 'Hindi' },
  { code: 'en-IN', label: 'English', sub: 'English' },
];

export function LanguageOnboarding() {
  const setLanguage = useAppStore((s) => s.setLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>NextLayer Learn</Text>
      <Text style={styles.subtitle}>Choose your language</Text>
      <Text style={styles.hint}>You can change this later in Profile.</Text>
      {OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt.code}
          style={styles.btn}
          activeOpacity={0.85}
          onPress={() => {
            setLanguage(opt.code);
            completeOnboarding();
          }}
        >
          <Text style={styles.btnPrimary}>{opt.label}</Text>
          <Text style={styles.btnSecondary}>{opt.sub}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0d1117',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f0f6fc',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 16,
    color: '#8b949e',
    textAlign: 'center',
    marginBottom: 28,
  },
  btn: {
    backgroundColor: '#1f6feb',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 14,
    minHeight: 72,
    justifyContent: 'center',
  },
  btnPrimary: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  btnSecondary: {
    fontSize: 16,
    color: '#c9d1d9',
    marginTop: 4,
  },
});
