

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.title}>You are logged in</Text>
        <Button title="Log Out" color="#d33" onPress={logout} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
  <Button title="Log In" onPress={handleLogin} />
  <Text style={styles.link} onPress={() => router.push('/signup')}>Don't have an account? Sign Up</Text>
    </View>
  );
}
// ...existing code...

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  input: { width: 250, height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 8 },
  link: { color: '#2d7be5', marginTop: 16 },
});
