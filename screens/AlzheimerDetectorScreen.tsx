import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlzheimerDetectorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alzheimer Detector</Text>
      <Text style={styles.text}>Upload a brain MRI scan and let our AI analyze it for signs of Alzheimer’s or dementia. Fast, private, and easy to use.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 16 },
  text: { fontSize: 16, color: '#444', textAlign: 'center' },
});
