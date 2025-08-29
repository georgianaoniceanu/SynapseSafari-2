

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { useUser } from '../context/UserContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    const ok = await login(email, password);
    if (!ok) {
      Alert.alert('Login failed', 'Invalid credentials.');
    }
  };

  if (user) {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
  <GradientBackground>{null}</GradientBackground>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>You are logged in</Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, position: 'relative' }}>
  <GradientBackground>{null}</GradientBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Log In</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
// ...existing code...


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'transparent',
    minHeight: 500,
  },
  card: {
    width: isSmallScreen ? '92%' : 360,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    paddingVertical: isSmallScreen ? 22 : 38,
    paddingHorizontal: isSmallScreen ? 12 : 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: isSmallScreen ? 3 : 8 },
    shadowOpacity: 0.13,
    shadowRadius: isSmallScreen ? 6 : 18,
    elevation: isSmallScreen ? 3 : 12,
    marginVertical: isSmallScreen ? 18 : 40,
  },
  title: {
    fontSize: isSmallScreen ? 22 : 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: isSmallScreen ? 16 : 24,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  input: {
    width: '100%',
    height: isSmallScreen ? 40 : 48,
    borderColor: '#b0b7c3',
    borderWidth: 1.2,
    borderRadius: 10,
    marginBottom: isSmallScreen ? 12 : 20,
    paddingHorizontal: isSmallScreen ? 8 : 14,
    backgroundColor: '#f7fafd',
    fontSize: isSmallScreen ? 15 : 17,
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#2d7be5',
    paddingVertical: isSmallScreen ? 10 : 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: isSmallScreen ? 6 : 10,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: isSmallScreen ? 15 : 18,
    letterSpacing: 0.5,
  },
  link: {
    color: '#2d7be5',
    marginTop: isSmallScreen ? 10 : 14,
    fontSize: isSmallScreen ? 13 : 16,
    textAlign: 'center',
  },
  linkBold: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
