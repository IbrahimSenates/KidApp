import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import * as Speech from 'expo-speech';

const COLORS = [
  { name: "Kırmızı", value: "red" },
  { name: "Mavi", value: "blue" },
  { name: "Yeşil", value: "green" },
  { name: "Sarı", value: "yellow" },
  { name: "Mor", value: "purple" },
  { name: "Turuncu", value: "orange" },
  { name: "Pembe", value: "pink" },
  { name: "Kahverengi", value: "#964B00" },
  { name: "Gri", value: "gray" },
  { name: "Siyah", value: "black" },
  { name: "Beyaz", value: "white" },
  { name: "Turkuaz", value: "#40e0d0" },
];

const getRandomColor = (excludeColor) => {
  let filtered = COLORS.filter((c) => c.value !== excludeColor?.value);
  if (filtered.length === 0) return COLORS[0];
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const ColorMatchGameScreen = () => {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    generateOptions();
  }, [targetColor]);

  const generateOptions = () => {
    let others = COLORS.filter((c) => c.value !== targetColor.value);
    let randomThree = [];

    let count = Math.min(3, others.length);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * others.length);
      randomThree.push(others[randomIndex]);
      others.splice(randomIndex, 1);
    }

    let finalOptions = [...randomThree, targetColor];
    finalOptions.sort(() => 0.5 - Math.random());

    setOptions(finalOptions);
  };

  const showError = () => {
    setErrorMessageVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setErrorMessageVisible(false));
      }, 1500);
    });
  };

  const handleColorPress = (color) => {
    Speech.speak(color.name, { language: "tr-TR" });

    if (color.value === targetColor.value) {
      setScore((prev) => prev + 1);
      const newColor = getRandomColor(targetColor);
      setTargetColor(newColor);
    } else {
      // Alert yerine hata mesajını göster
      showError();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renk Eşleştirme</Text>
      <Text style={styles.targetText}>"{targetColor.name}" rengine tıkla!</Text>

      <View style={styles.optionsContainer}>
        {options.map((color) => (
          <TouchableOpacity
            key={color.value}
            style={[styles.colorBox, { backgroundColor: color.value }]}
            onPress={() => handleColorPress(color)}
          />
        ))}
      </View>

      <Text style={styles.score}>Skor: {score}</Text>

      {errorMessageVisible && (
        <Animated.View style={[styles.errorMessage, { opacity: fadeAnim }]}>
          <Text style={styles.errorText}>Yanlış seçim! Tekrar dene.</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default ColorMatchGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbea",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#444",
  },
  targetText: {
    fontSize: 22,
    marginBottom: 20,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    marginBottom: 30,
  },
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    elevation: 4,
  },
  score: {
    fontSize: 20,
    fontWeight: "600",
    color: "#00796b",
  },
  errorMessage: {
    position: "absolute",
    bottom: 180,
    backgroundColor: "#ff4444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 10,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
