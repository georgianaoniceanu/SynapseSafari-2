import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menuItems = [
  { label: 'Home', route: '/' },
  { label: 'Games', route: '/games' },
  { label: 'Quiz', route: '/quiz' },
  { label: 'Speech Analysis', route: '/speech-analysis' },
  { label: 'AI Assistant', route: '/ai-assistant' },
  { label: 'Resources', route: '/resources' },
  { label: 'Alzheimer Detector', route: '/alzheimer-detector' },
  { label: 'Profile', route: '/profile' },
  { label: 'Log In', route: '/login' },
  { label: 'Sign Up', route: '/signup' },
];

import { useRouter } from 'expo-router';

export default function DrawerMenu({ currentRoute, onClose }: { currentRoute?: string; onClose?: () => void }) {
  const router = useRouter();
  // Only show back if not on home and router.canGoBack exists and is true
  const canGoBack = typeof router.canGoBack === 'function' ? router.canGoBack() : false;
  return (
    <View style={styles.drawer}>
      {currentRoute !== '/' && canGoBack && (
        <TouchableOpacity style={styles.backButton} onPress={() => { router.back(); if (onClose) onClose(); }} accessibilityLabel="Go back">
          <Text style={styles.backIcon}>{'‹'} Back</Text>
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/SYNAPSE.png')} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, currentRoute === item.route && styles.activeMenuItem]}
            onPress={() => {
              router.push({ pathname: item.route } as any);
              if (onClose) onClose();
            }}
          >
            <Text style={[styles.menuText, currentRoute === item.route && styles.activeMenuText]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backIcon: {
    fontSize: 22,
    color: '#1976d2',
    fontWeight: 'bold',
    marginRight: 8,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 0,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: '#e6f0ff',
  },
  menuText: {
    fontSize: 18,
    color: '#444',
  },
  activeMenuText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
});