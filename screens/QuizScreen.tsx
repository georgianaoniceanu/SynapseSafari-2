import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cognitive Quizzes</Text>
      <Text style={styles.text}>Answer questions that evaluate temporal orientation, semantic memory, reasoning, and logic. Our specialized quizzes provide insight into your cognitive functions.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  text: { fontSize: 16, color: '#444', textAlign: 'center' },
});
