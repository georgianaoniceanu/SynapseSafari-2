import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';

export default function AIAssistantScreen() {
  return (
    <View style={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={styles.text}>Talk to our AI Assistant for personalized recommendations and insights about your cognitive health.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: 'transparent' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  text: { fontSize: 16, color: '#444', textAlign: 'center' },
});
