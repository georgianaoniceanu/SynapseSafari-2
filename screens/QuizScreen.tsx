import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type Quiz = {
  title: string;
  description: string;
  color: string;
  questions: QuizQuestion[];
};

const quizList: Quiz[] = [
  {
    title: 'Memory Quiz',
    description: 'Test your short-term and working memory with fun questions.',
    color: '#FFA500',
    questions: [
      {
        question: 'Remember this sequence: 7, 2, 9, 4. What was the third number?',
        options: ['2', '9', '4', '7'],
        answer: '9',
      },
      {
        question: 'Which word did you see at the start? (Apple, Table, River)',
        options: ['Apple', 'Table', 'River', 'None'],
        answer: 'Apple',
      },
      {
        question: 'What color was the first square? (Red, Blue, Green)',
        options: ['Red', 'Blue', 'Green', 'None'],
        answer: 'Red',
      },
    ],
  },
  {
    title: 'Reaction Speed Quiz',
    description: 'How fast can you answer? Test your reaction time with quick-fire questions.',
    color: '#4CAF50',
    questions: [
      {
        question: 'Press the correct answer as fast as you can: What is 3 + 4?',
        options: ['5', '7', '8', '6'],
        answer: '7',
      },
      {
        question: 'Tap the color that appears: [Red]',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        answer: 'Red',
      },
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Rome'],
        answer: 'Paris',
      },
    ],
  },
  {
    title: 'Logic & Reasoning',
    description: 'Challenge your logic and reasoning with tricky questions.',
    color: '#F44336',
    questions: [
      {
        question: 'Which number comes next: 2, 4, 6, ?',
        options: ['7', '8', '10', '12'],
        answer: '8',
      },
      {
        question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
        options: ['Yes', 'No', 'Maybe', 'Not enough info'],
        answer: 'Yes',
      },
    ],
  },
];


interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
  quiz: Quiz | null;
}

function QuizModal({ visible, onClose, quiz }: QuizModalProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  if (!quiz) return null;
  const q = quiz.questions[current];

  function handleSelect(option: string) {
    setSelected(option);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      if (quiz) {
        setCurrent((prev) => (prev + 1) % quiz.questions.length);
      }
    }, 1200);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Text style={styles.text}>{q.question}</Text>
          <View style={styles.options}>
            {q.options.map((option: string) => (
              <Text
                key={option}
                style={[
                  styles.option,
                  selected === option && (option === q.answer ? styles.correct : styles.incorrect),
                ]}
                onPress={() => !showResult && handleSelect(option)}
              >
                {option}
              </Text>
            ))}
          </View>
          {showResult && (
            <Text style={selected === q.answer ? styles.correct : styles.incorrect}>
              {selected === q.answer ? 'Correct!' : 'Incorrect!'}
            </Text>
          )}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}><Text style={{color:'#1976d2',fontWeight:'bold'}}>Close</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function QuizScreen() {
  const [openQuiz, setOpenQuiz] = useState<Quiz | null>(null);
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Quizzes</Text>
      <Text style={styles.text}>Choose a quiz to test your memory, reaction speed, or logic!</Text>
      <View style={styles.gamesGrid}>
        {quizList.map((quiz, idx) => (
          <View key={quiz.title} style={styles.card}>
            <View style={[styles.difficultyBadge, { backgroundColor: quiz.color }]}> 
              <Text style={styles.difficultyText}>{idx === 0 ? 'Memory' : idx === 1 ? 'Reaction' : 'Logic'}</Text>
            </View>
            <Text style={styles.cardTitle}>{quiz.title}</Text>
            <Text style={styles.cardDesc}>{quiz.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setOpenQuiz(quiz)}>
                <Text style={styles.playButton}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <QuizModal visible={!!openQuiz} onClose={() => setOpenQuiz(null)} quiz={openQuiz} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#f7f9fb' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d7be5', marginTop: 24, marginBottom: 8 },
  text: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 16 },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  options: { width: '100%', marginTop: 8 },
  option: {
    backgroundColor: '#e3eafc',
    color: '#1976d2',
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 6,
    textAlign: 'center',
    overflow: 'hidden',
  },
  correct: {
    backgroundColor: '#b6f2c8',
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  incorrect: {
    backgroundColor: '#ffd6d6',
    color: '#b71c1c',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 18,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e3eafc',
  },
});

export default QuizScreen;
