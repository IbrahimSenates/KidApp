import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';

const generateShuffledNumbers = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5);
};

const NumberTouchGameScreen = () => {
  const [numbers, setNumbers] = useState(generateShuffledNumbers());
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handlePress = (num) => {
    if (num !== nextNumber || isSpeaking) return; 

    if (nextNumber === 1) setStartTime(Date.now());

    setIsSpeaking(true);

    Speech.speak(num.toString(), {
      language: 'tr-TR',
      onDone: () => {
        setIsSpeaking(false);

        if (nextNumber === 10) {
          Alert.alert('Tebrikler!', `Oyunu ${elapsedTime} saniyede tamamladınız.`);
          setNumbers(generateShuffledNumbers());
          setNextNumber(1);
          setStartTime(null);
          setElapsedTime(0);
        } else {
          setNextNumber(nextNumber + 1);
        }
      },
      onError: () => {
        setIsSpeaking(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sıradaki Sayı: {nextNumber}</Text>
      <Text style={styles.timer}>Süre: {elapsedTime} sn</Text>
      <View style={styles.grid}>
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handlePress(num)}
            disabled={num !== nextNumber || isSpeaking}
            style={[
              styles.numberButton,
              num === nextNumber ? styles.active : styles.inactive,
            ]}
          >
            <Text style={styles.numberText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NumberTouchGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  timer: {
    fontSize: 18,
    marginBottom: 16,
    color: '#33691e',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  active: {
    backgroundColor: '#66bb6a',
  },
  inactive: {
    backgroundColor: '#c8e6c9',
  },
  numberText: {
    fontSize: 24,
    color: '#1b5e20',
    fontWeight: 'bold',
  },
});
