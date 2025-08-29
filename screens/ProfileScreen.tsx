
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';


import GradientBackground from '../components/GradientBackground';

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useUser();
  const [bio, setBio] = useState(user?.bio || '');
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState(user?.photo);
  const [stats, setStats] = useState<any>(null);

  // Load stats from AsyncStorage every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      (async () => {
        const keys = [
          'score_MemorySequence',
          'score_MentalMath',
          'score_MentalCalculation',
          'score_Quiz',
        ];
        const result: any = {};
        for (const key of keys) {
          const val = await AsyncStorage.getItem(key);
          result[key] = val ? Number(val) : 0;
        }
        if (isActive) setStats(result);
      })();
      return () => { isActive = false; };
    }, [])
  );

  // Simple cognitive decline probability: if all scores are low, probability is high
  function getCognitiveDeclineProbability() {
    if (!stats) return null;
    const maxes = {
      score_MemorySequence: 10,
      score_MentalMath: 10,
      score_MentalCalculation: 10,
      score_Quiz: 10,
    };
    let sum = 0;
    let total = 0;
    (Object.keys(maxes) as (keyof typeof maxes)[]).forEach((k) => {
      sum += Math.min(stats[k] ?? 0, maxes[k]);
      total += maxes[k];
    });
    const percent = 1 - sum / total;
    // Clamp between 0.05 and 0.95 for realism
    return Math.max(0.05, Math.min(0.95, percent));
  }

  if (!user) return (
    <View style={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <Text>Not logged in.</Text>
    </View>
  );

  const handleSave = async () => {
    await updateProfile({ bio, photo });
    setEditing(false);
  };

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission required', 'Please allow access to your gallery to set a profile photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const newPhoto = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
      setPhoto(newPhoto);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <View style={styles.card}>
        <TouchableOpacity onPress={editing ? pickImage : undefined} style={styles.avatarWrapper} activeOpacity={editing ? 0.7 : 1}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitial}>
                {user.name ? user.name[0].toUpperCase() : '?'}
              </Text>
            </View>
          )}
          {editing && <Text style={styles.editPhotoText}>Change photo</Text>}
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {editing ? (
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            placeholder="Your bio"
            multiline
          />
        ) : (
          <Text style={styles.bio}>{user.bio || 'No bio yet.'}</Text>
        )}
        <View style={styles.buttonRow}>
          {editing ? (
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setEditing(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dashboard Section */}
      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        {stats ? (
          <>
            <Text style={styles.dashboardLabel}>Memory Sequence: <Text style={styles.dashboardValue}>{stats.score_MemorySequence ?? 0}</Text></Text>
            <Text style={styles.dashboardLabel}>Mental Math: <Text style={styles.dashboardValue}>{stats.score_MentalMath ?? 0}</Text></Text>
            <Text style={styles.dashboardLabel}>Mental Calculation: <Text style={styles.dashboardValue}>{stats.score_MentalCalculation ?? 0}</Text></Text>
            <Text style={styles.dashboardLabel}>Quiz: <Text style={styles.dashboardValue}>{stats.score_Quiz ?? 0}</Text></Text>
            <View style={{marginVertical: 10}} />
            <Text style={styles.dashboardLabel}>Cognitive decline probability:</Text>
            <Text style={[styles.dashboardValue, {fontSize: 22, color: (getCognitiveDeclineProbability() ?? 0) > 0.5 ? '#d32f2f' : '#388e3c'}]}>
              {Math.round(((getCognitiveDeclineProbability() ?? 0) * 100))}%
            </Text>
            <Text style={{fontSize:12, color:'#888', textAlign:'center', marginTop:4}}>
              (Estimate based on local scores. This is not a medical diagnosis.)
            </Text>
          </>
        ) : (
          <Text style={styles.dashboardLabel}>Loading data...</Text>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  dashboardCard: {
    width: 320,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 24,
    marginBottom: 32,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d7be5',
    marginBottom: 10,
  },
  dashboardLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 2,
    textAlign: 'center',
  },
  dashboardValue: {
    fontWeight: 'bold',
    color: '#2d7be5',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e0e7ef',
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 44,
    color: '#b0b8c1',
    fontWeight: 'bold',
  },
  editPhotoText: {
    fontSize: 12,
    color: '#2d7be5',
    marginTop: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#2d7be5',
  },
  email: {
    fontSize: 15,
    color: '#888',
    marginBottom: 14,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
    minHeight: 24,
  },
  bioInput: {
    width: 250,
    minHeight: 40,
    borderColor: '#c7d0e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  saveButton: {
    backgroundColor: '#2d7be5',
  },
  editButton: {
    backgroundColor: '#e0e7ef',
  },
  logoutButton: {
    backgroundColor: '#d33',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d7be5',
  },
});
