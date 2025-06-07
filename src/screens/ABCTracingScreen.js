import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';

const letters = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
const { width } = Dimensions.get('window');
const BUTTON_SIZE = 70;
const BUTTON_MARGIN = 10;

const ABCTracingScreen = ({ navigation }) => {
  const speakLetter = (letter) => {
    Speech.speak(letter, { language: 'tr-TR' }); 
  };

  const onPressLetter = (letter) => {
    speakLetter(letter);
    navigation.navigate('LetterTracing', { letter });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✍️ Harf Çizme</Text>
      <Text style={styles.subtitle}>Bir harf seçin ve çizmeye başlayın!</Text>

      <View style={styles.lettersContainer}>
        {letters.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={styles.letterButton}
            onPress={() => onPressLetter(letter)}
            activeOpacity={0.7}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ABCTracingScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fef3e2',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#666',
    textAlign: 'center',
  },
  lettersContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: BUTTON_MARGIN * 2,
  },
  letterButton: {
    backgroundColor: '#ffae42',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: BUTTON_MARGIN,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  letterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
