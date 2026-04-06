import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LearnScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Modules</Text>
      <Text style={styles.subtitle}>Select a topic to start learning.</Text>
      {/* List of modules would go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
