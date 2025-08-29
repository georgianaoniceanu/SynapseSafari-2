

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { useUser } from '../context/UserContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useUser();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please enter name, email and password.');
      return;
    }
    const ok = await signup({ name, email, password });
    if (ok) {
      router.push('/login');
    } else {
      Alert.alert('Sign up failed', 'Could not create account.');
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Log In</Text></Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  card: {
    width: 320,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 28,
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
    color: '#2d7be5',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#b0b7c3',
    borderWidth: 1.2,
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 12,
    backgroundColor: '#f7fafd',
    fontSize: 16,
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#2d7be5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  link: {
    color: '#2d7be5',
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
  linkBold: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
