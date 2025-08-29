import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LinearGradient
        colors={["rgba(45,123,229,0.7)", "rgba(244,67,54,0.7)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {children}
    </>
  );
}
