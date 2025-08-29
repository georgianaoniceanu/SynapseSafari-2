import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReactionTimeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Time</Text>
      <Text style={styles.text}>Joc de măsurare a timpului de reacție. (Placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  text: { fontSize: 16, color: '#444', textAlign: 'center' },
});
