
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuButton: {
    marginRight: 12,
    padding: 8,
  },
  hamburger: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 22,
    height: 3,
    backgroundColor: '#1976d2',
    marginVertical: 2,
    borderRadius: 2,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#222',
  },
  profileButton: {
    marginLeft: 12,
    padding: 4,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInitial: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#1976d2',
    fontWeight: 'bold',
    marginLeft: 2,
    marginRight: 2,
    lineHeight: 32,
  },
});

export default function HeaderBar({ onMenuPress, title, showBack, onBackPress }: { onMenuPress?: () => void; title?: string; showBack?: boolean; onBackPress?: () => void }) {
  const { user, updateProfile } = useUser();
  const router = useRouter();

  const pickImage = async () => {
    // Ask for permission
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
      // Prefer base64 for persistence, fallback to uri
      const photo = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
      await updateProfile({ photo });
    }
  };

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBackPress || (() => router.back())} style={styles.backButton} accessibilityLabel="Go back">
          {/* Simple left arrow */}
          <Text style={styles.backIcon}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} accessibilityLabel="Open menu">
          {/* Hamburger icon */}
          <View style={styles.hamburger}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </View>
        </TouchableOpacity>
      )}
      <Image source={require('../assets/SYNAPSE.png')} style={styles.logo} />
      <Text style={styles.title}>{title || 'Home'}</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.profileButton} onPress={pickImage} accessibilityLabel="Change profile photo">
        <View style={styles.profileCircle}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={{ width: 36, height: 36, borderRadius: 18 }} />
          ) : (
            <Text style={styles.profileInitial}>{user?.name?.[0]?.toUpperCase() || 'G'}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}