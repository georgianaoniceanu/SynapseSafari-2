
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';

export default function ResourcesScreen() {
  const articles = [
    {
      title: 'What is Alzheimer’s Disease?',
      url: 'https://www.alz.org/alzheimers-dementia/what-is-alzheimers',
      source: 'Alzheimer’s Association',
    },
    {
      title: '10 Ways to Love Your Brain',
      url: 'https://www.alz.org/help-support/brain_health/10_ways_to_love_your_brain',
      source: 'Alzheimer’s Association',
    },
    {
      title: 'Dementia: Symptoms, Types, and Diagnosis',
      url: 'https://www.nia.nih.gov/health/what-is-dementia',
      source: 'National Institute on Aging',
    },
    {
      title: 'Brain Health: You Can Make a Difference!',
      url: 'https://www.cdc.gov/aging/publications/features/healthy-brain.html',
      source: 'CDC',
    },
    {
      title: 'Cognitive Health and Older Adults',
      url: 'https://www.cdc.gov/aging/publications/features/cognitive-health.html',
      source: 'CDC',
    },
    {
      title: 'How to Keep Your Brain Healthy',
      url: 'https://www.health.harvard.edu/mind-and-mood/12-ways-to-keep-your-brain-young',
      source: 'Harvard Health Publishing',
    },
    {
      title: 'What is Mild Cognitive Impairment?',
      url: 'https://www.nia.nih.gov/health/mild-cognitive-impairment-mci',
      source: 'National Institute on Aging',
    },
    {
      title: 'Dementia vs. Alzheimer’s Disease: What is the Difference?',
      url: 'https://www.alz.org/alzheimers-dementia/difference-between-dementia-and-alzheimer-s',
      source: 'Alzheimer’s Association',
    },
    {
      title: 'Brain Health Resources',
      url: 'https://www.brainhealth.nia.nih.gov/',
      source: 'National Institute on Aging',
    },
  ];

  return (
    <View style={styles.container}>
      <GradientBackground>{null}</GradientBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.text}>
          Access articles, guides, and more to learn about cognitive health, Alzheimer’s, dementia, and brain training.
        </Text>
        {articles.map((article, idx) => (
          <TouchableOpacity
            key={article.url}
            style={styles.article}
            activeOpacity={0.7}
            onPress={() => Linking.openURL(article.url)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleSource}>{article.source}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  text: {
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    maxWidth: 420,
    marginBottom: 18,
  },
  article: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  articleSource: {
    fontSize: 14,
    color: '#888',
  },
});
