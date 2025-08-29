
import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
// High quality recording options for expo-av (string values for format/encoder)
const RECORDING_OPTIONS = Audio.RecordingOptionsPresets.HIGH_QUALITY;

export default function SpeechAnalysisScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<
    | {
        duration: number;
        avgAmplitude: number;
        peakAmplitude: number;
        silencePercent: number;
      }
    | null
  >(null);

  async function startRecording() {
    setIsLoading(true);
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
        setIsLoading(false);
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const rec = new Audio.Recording();
  await rec.prepareToRecordAsync(RECORDING_OPTIONS);
      await rec.startAsync();
      setRecording(rec);
      setIsRecording(true);
    } catch (err) {
      alert('Could not start recording: ' + err);
    }
    setIsLoading(false);
  }

  async function stopRecording() {
    setIsLoading(true);
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri || null);
      setRecording(null);
      setIsRecording(false);
      if (uri) {
        // Simple analysis: duration and amplitude
        const { sound, status } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        const duration = status && 'durationMillis' in status ? (status.durationMillis || 0) / 1000 : 0;

        // Amplitude and silence analysis (web only, using fetch and decodeAudioData)
        let avgAmplitude = 0;
        let peakAmplitude = 0;
        let silencePercent = 0;
        try {
          if (typeof window !== 'undefined' && window.fetch && typeof window.AudioContext === 'function') {
            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();
            const audioCtx = new window.AudioContext();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const channelData = audioBuffer.getChannelData(0); // mono or left channel
            let sum = 0;
            let peak = 0;
            let silentSamples = 0;
            const silenceThreshold = 0.02; // adjust as needed
            for (let i = 0; i < channelData.length; i++) {
              const abs = Math.abs(channelData[i]);
              sum += abs;
              if (abs > peak) peak = abs;
              if (abs < silenceThreshold) silentSamples++;
            }
            avgAmplitude = sum / channelData.length;
            peakAmplitude = peak;
            silencePercent = (silentSamples / channelData.length) * 100;
          }
        } catch (e) {
          // If analysis fails (e.g., on native), just leave as 0
        }
        setAnalysis({ duration, avgAmplitude, peakAmplitude, silencePercent });
      }
    } catch (err) {
      alert('Could not stop recording: ' + err);
    }
    setIsLoading(false);
  }

  async function playRecording() {
    if (sound) {
      await sound.replayAsync();
    } else if (audioUri) {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      await newSound.replayAsync();
    }
  }

  return (
    <View style={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <Text style={styles.title}>Speech Analysis</Text>
      <Text style={styles.text}>
        Record your voice describing an image or daily routine for AI-powered language pattern analysis. Changes in speech can be early indicators of cognitive changes.
      </Text>
      <View style={{ height: 24 }} />
      {isLoading && <ActivityIndicator size="large" color="#2d7be5" />}
      {!isRecording && (
        <TouchableOpacity style={styles.button} onPress={startRecording} disabled={isLoading || isRecording}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      )}
      {isRecording && (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#d32f2f' }]} onPress={stopRecording} disabled={isLoading}>
          <Text style={styles.buttonText}>Stop Recording</Text>
        </TouchableOpacity>
      )}
      {audioUri && !isRecording && (
        <TouchableOpacity style={styles.button} onPress={playRecording}>
          <Text style={styles.buttonText}>Play Recording</Text>
        </TouchableOpacity>
      )}
      {analysis && (
        <View style={styles.analysisBox}>
          <Text style={styles.analysisTitle}>Audio Analysis</Text>
          <Text style={styles.analysisText}>Duration: {analysis.duration.toFixed(1)} sec</Text>
          <Text style={styles.analysisText}>Avg. Amplitude: {analysis.avgAmplitude.toFixed(3)}</Text>
          <Text style={styles.analysisText}>Peak Amplitude: {analysis.peakAmplitude.toFixed(3)}</Text>
          <Text style={styles.analysisText}>Silence: {analysis.silencePercent.toFixed(1)}%</Text>
          <Text style={styles.analysisText}>
            (Amplitude/silence analysis available only on web)
          </Text>
        </View>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d7be5',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2d7be5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  analysisBox: {
    marginTop: 24,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 220,
  },
  analysisTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#2563eb',
    marginBottom: 6,
  },
  analysisText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 2,
  },
});
