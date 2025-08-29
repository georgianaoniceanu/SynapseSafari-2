import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpeechAnalysisScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech Analysis</Text>
      <Text style={styles.text}>Record your voice describing an image or daily routine for AI-powered language pattern analysis. Changes in speech can be early indicators of cognitive changes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  text: { fontSize: 16, color: '#444', textAlign: 'center' },
});
