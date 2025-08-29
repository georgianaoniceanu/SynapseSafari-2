
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';

const games = [
  {
    title: 'Memory Sequence',
    description: 'Test your short-term memory by remembering and repeating sequences of numbers.',
    difficulty: 'Medium',
    color: '#FFA500',
  },
  {
    title: 'Mental Math',
    description: 'Test your mental arithmetic skills with quick math challenges.',
    difficulty: 'Easy',
    color: '#4CAF50',
  },
  {
    title: 'Reaction Time',
    description: 'Measure how quickly you can respond to visual stimuli.',
    difficulty: 'Easy',
    color: '#4CAF50',
  },
  {
    title: 'Problem Solving',
    description: 'Challenge your logical thinking with puzzles and pattern recognition.',
    difficulty: 'Hard',
    color: '#F44336',
  },
  {
    title: 'Spatial Skills',
    description: 'Test your ability to visualize and manipulate objects in space.',
    difficulty: 'Medium',
    color: '#FFA500',
  },
  {
    title: 'Mental Calculation',
    description: 'Sharpen your arithmetic skills with fast-paced mental math challenges!',
    difficulty: 'All',
    color: '#F44336',
  },
];

export default function GamesScreen() {
  const router = useRouter();
  // Map each game to its route path (should match your app/ structure)
  const screenPaths = [
    '/memory-sequence',
    '/mental-math',
    '/reaction-time',
    '/problem-solving',
    '/spatial-skills',
    '/mental-calculation',
  ] as const;
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Cognitive Games</Text>
        <Text style={styles.text}>Engage in interactive games designed to test memory, reaction time, problem-solving, and spatial skills. These fun activities help measure cognitive abilities.</Text>
        <View style={styles.gamesGrid}>
          {games.map((game, idx) => (
            <View key={idx} style={styles.card}>
              <View style={[styles.difficultyBadge, {backgroundColor: game.color}]}> 
                <Text style={styles.difficultyText}>{game.difficulty}</Text>
              </View>
              <Text style={styles.cardTitle}>{game.title}</Text>
              <Text style={styles.cardDesc}>{game.description}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => router.push(screenPaths[idx])}>
                  <Text style={styles.playButton}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: 'transparent' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginTop: 24, marginBottom: 8 },
  text: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 16 },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 280,
    margin: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'flex-start',
    position: 'relative',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    zIndex: 1,
  },
  difficultyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 16,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  playButton: {
    // backgroundColor: 'linear-gradient(90deg, #2d7be5 0%, #21c8f6 100%)', // Not supported in RN
    backgroundColor: '#2d7be5',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,
  },
});
