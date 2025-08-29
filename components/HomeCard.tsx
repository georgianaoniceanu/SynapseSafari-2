import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeCard() {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Image source={require('../assets/SYNAPSE.png')} style={styles.logo} />
      <Text style={styles.title}>Synapse Safari</Text>
      <Text style={styles.desc}>
        Embark on an exciting journey through your mind with our interactive cognitive assessment platform.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ai-assistant')}>
        <Text style={styles.buttonText}>Talk to AI Assistant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/games')}>
        <Text style={styles.buttonText}>Try Cognitive Games</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/resources')}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 16,
    marginTop: 48,
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3386ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 28,
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: '#3386ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#3386ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});