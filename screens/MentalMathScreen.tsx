import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';



function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomQuestion() {
  // 40% simple, 40% medium, 20% hard
  const r = Math.random();
  if (r < 0.4) {
    // Simple: a op b
    const ops = ['+', '-', '×', '÷'];
    const op = ops[getRandomInt(0, ops.length - 1)];
    let a = getRandomInt(10, 99);
    let b = getRandomInt(2, 99);
    let answer = 0;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else if (op === '×') answer = a * b;
    else if (op === '÷') {
      answer = a;
      a = a * b;
    }
    return { text: `${a} ${op} ${b}`, answer };
  } else if (r < 0.8) {
    // Medium: (a op b) op c
    const ops = ['+', '-', '×'];
    const op1 = ops[getRandomInt(0, ops.length - 1)];
    const op2 = ops[getRandomInt(0, ops.length - 1)];
    let a = getRandomInt(10, 50);
    let b = getRandomInt(2, 50);
    let c = getRandomInt(2, 50);
    let first = 0;
    if (op1 === '+') first = a + b;
    else if (op1 === '-') first = a - b;
    else if (op1 === '×') first = a * b;
    let answer = 0;
    if (op2 === '+') answer = first + c;
    else if (op2 === '-') answer = first - c;
    else if (op2 === '×') answer = first * c;
    return { text: `(${a} ${op1} ${b}) ${op2} ${c}`, answer };
  } else {
    // Hard: (a op b) op (c op d)
    const ops = ['+', '-', '×'];
    const op1 = ops[getRandomInt(0, ops.length - 1)];
    const op2 = ops[getRandomInt(0, ops.length - 1)];
    const op3 = ops[getRandomInt(0, ops.length - 1)];
    let a = getRandomInt(10, 99);
    let b = getRandomInt(2, 99);
    let c = getRandomInt(10, 99);
    let d = getRandomInt(2, 99);
    let left = 0, right = 0;
    if (op1 === '+') left = a + b;
    else if (op1 === '-') left = a - b;
    else if (op1 === '×') left = a * b;
    if (op2 === '+') right = c + d;
    else if (op2 === '-') right = c - d;
    else if (op2 === '×') right = c * d;
    let answer = 0;
    if (op3 === '+') answer = left + right;
    else if (op3 === '-') answer = left - right;
    else if (op3 === '×') answer = left * right;
    return { text: `(${a} ${op1} ${b}) ${op3} (${c} ${op2} ${d})`, answer };
  }
}


export default function MentalMathScreen() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  React.useEffect(() => {
    if (!timerActive) return;
    if (timer === 0) {
      setMessage(`Time's up! The answer was ${question.answer}. Game reset.`);
      setScore(0);
      setUserInput('');
      setTimerActive(false);
      setTimeout(() => {
        setQuestion(getRandomQuestion());
        setMessage('');
        setTimer(20);
        setTimerActive(true);
      }, 1500);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  React.useEffect(() => {
    setTimer(20);
    setTimerActive(true);
  }, [question.text]);

  const handleInputChange = (text: string) => {
    setUserInput(text.replace(/[^0-9\-]/g, ''));
  };

  const handleSubmit = () => {
    if (userInput.trim() === '') return;
    const userAns = Number(userInput.trim());
    if (userAns === question.answer) {
      setScore(score + 1);
      setMessage('Correct!');
      setUserInput('');
      setTimerActive(false);
      setTimeout(() => {
        setQuestion(getRandomQuestion());
        setMessage('');
        setTimer(20);
        setTimerActive(true);
      }, 800);
    } else {
      setMessage(`Wrong! The answer was ${question.answer}. Game reset.`);
      setScore(0);
      setUserInput('');
      setTimerActive(false);
      setTimeout(() => {
        setQuestion(getRandomQuestion());
        setMessage('');
        setTimer(20);
        setTimerActive(true);
      }, 1500);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Math</Text>
      <Text style={styles.text}>Solve as many arithmetic questions as you can. Your score increases for each correct answer! You have 20 seconds for each question.</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.timer}>Time left: {timer}s</Text>
      <View style={styles.questionBox}>
        <Text style={styles.question}>{question.text} = ?</Text>
      </View>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={handleInputChange}
        placeholder="Enter answer"
        keyboardType="number-pad"
        onSubmitEditing={handleSubmit}
        editable={timerActive}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!timerActive}>
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
  score: { fontSize: 18, color: '#2d7be5', fontWeight: 'bold', marginBottom: 4 },
  timer: { fontSize: 16, color: '#F44336', fontWeight: 'bold', marginBottom: 8 },
  questionBox: {
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
  question: { fontSize: 24, letterSpacing: 2, color: '#222', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#2d7be5',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    width: 180,
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
