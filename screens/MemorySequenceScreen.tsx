import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

function getRandomDigit() {
  return Math.floor(Math.random() * 9) + 1;
}

export default function MemorySequenceScreen() {
  const [sequence, setSequence] = useState([getRandomDigit()]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showSequence, setShowSequence] = useState(true);

  // Show sequence for 1.2s per digit, then hide
  React.useEffect(() => {
    setShowSequence(true);
    const timer = setTimeout(() => setShowSequence(false), sequence.length * 1200);
    return () => clearTimeout(timer);
  }, [sequence]);

  const handleInputChange = (text: string) => {
    // Only allow numbers and spaces
    setUserInput(text.replace(/[^0-9 ]/g, ''));
  };

  const handleSubmit = () => {
    const inputArr = userInput.trim().split(/\s+/).map(Number);
    if (inputArr.length !== sequence.length) {
      setMessage('Enter the full sequence!');
      return;
    }
    if (inputArr.every((num, idx) => num === sequence[idx])) {
      // Correct
      setScore(score + 1);
      setMessage('Correct!');
      setUserInput('');
      setTimeout(() => {
        setSequence([...sequence, getRandomDigit()]);
        setMessage('');
      }, 800);
    } else {
      setMessage('Wrong! Game reset.');
      setScore(0);
      setUserInput('');
      setTimeout(() => {
        setSequence([getRandomDigit()]);
        setMessage('');
      }, 1200);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Sequence</Text>
      <Text style={styles.text}>Memorize the sequence of numbers and repeat it. The sequence gets longer each round. How far can you go?</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.sequenceBox}>
        {showSequence ? (
          <Text style={styles.sequence}>{sequence.join(' ')}</Text>
        ) : (
          <Text style={styles.sequence}>?</Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={handleInputChange}
        placeholder="Enter sequence (e.g. 3 7 2)"
        keyboardType="number-pad"
        editable={!showSequence}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={showSequence}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f7f9fb' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginBottom: 8 },
  text: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 16 },
  score: { fontSize: 18, color: '#2d7be5', fontWeight: 'bold', marginBottom: 12 },
  sequenceBox: {
    minWidth: 120,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sequence: { fontSize: 24, letterSpacing: 4, color: '#222', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#2d7be5',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    width: 220,
    marginBottom: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2d7be5',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 10,
    marginTop: 2,
    opacity: 1,
  },
  message: { fontSize: 16, color: '#F44336', marginTop: 8, fontWeight: 'bold' },
});
