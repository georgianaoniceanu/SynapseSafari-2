

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';

function AlzheimerDetectorScreen() {
  const router = useRouter();
  const handleOpenDemo = () => {
    router.push('/alzheimer-tfjs-demo');
  };
  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.card}>
          <Text style={styles.title}>Alzheimer Detector</Text>
          <Text style={styles.text}>
            Pentru a rula detectorul AI de Alzheimer pe imagini CT/MRI, apasă butonul de mai jos. Vei fi redirecționat către o pagină web unde modelul rulează complet în browser (fără upload pe server).
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleOpenDemo}>
            <Text style={styles.buttonText}>Deschide demo web AI</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    </View>
  );
}

export default AlzheimerDetectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  card: {
    width: 370,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2d7be5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5
  },
});
