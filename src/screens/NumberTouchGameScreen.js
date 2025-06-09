import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import * as Notifications from 'expo-notifications';

// Bildirim davranışını belirle (opsiyonel)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    // Bildirim izinlerini iste
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Bildirim İzni Gerekli", "Bildirimleri gösterebilmek için izin vermen gerekiyor.");
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime && !isGameFinished) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isGameFinished]);

  const handlePress = (num) => {
    if (num !== nextNumber || isSpeaking) return;

    if (nextNumber === 1) setStartTime(Date.now());

    setIsSpeaking(true);

    Speech.speak(num.toString(), {
      language: 'tr-TR',
      onDone: async () => {
        setIsSpeaking(false);

        if (nextNumber === 10) {
          setIsGameFinished(true);

          // Bildirimi gönder
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎉 Tebrikler!",
              body: "Tüm sayıları bildin! Yeni bir oyuna hazır mısın?",
            },
            trigger: null, // Hemen göster
          });
        } else {
          setNextNumber(nextNumber + 1);
        }
      },
      onError: () => {
        setIsSpeaking(false);
      }
    });
  };

  const handlePlayAgain = () => {
    setNumbers(generateShuffledNumbers());
    setNextNumber(1);
    setStartTime(null);
    setElapsedTime(0);
    setIsGameFinished(false);
  };

  return (
    <View style={styles.container}>
      {!isGameFinished ? (
        <>
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
        </>
      ) : (
        <View style={styles.messageBox}>
          <Text style={styles.congratsText}>🎉 Harikasın!</Text>
          <Text style={styles.timeText}>10 sayıyı {elapsedTime} saniyede buldun!</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
            <Text style={styles.playAgainText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>
      )}
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
  messageBox: {
    alignItems: 'center',
    backgroundColor: '#a5d6a7',
    padding: 20,
    borderRadius: 16,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 20,
    color: '#2e7d32',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#66bb6a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  playAgainText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
