


import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <View style={styles.card}>
        <Image source={require('../assets/SYNAPSE.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Synapse Safari</Text>
        <Text style={styles.subtitle}>Embark on an exciting journey through your mind with our interactive cognitive assessment platform.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/ai-assistant' })}>
          <Text style={styles.buttonText}>Talk to AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/games' })}>
          <Text style={styles.buttonText}>Try Cognitive Games</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/resources' })}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 24,
  },
  card: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d7be5',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    backgroundColor: '#2d7be5',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#2d7be5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
