import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { enableScreens } from "react-native-screens";
enableScreens(false);

const { width, height } = Dimensions.get("window");

const getRandomPosition = () => ({
  top: Math.random() * (height - 200),
  left: Math.random() * (width - 100),
});

const randomColor = () => {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#03a9f4",
    "#009688",
    "#4caf50",
    "#ff9800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Balloon = ({ id, onPop }) => {
  const [position] = useState(getRandomPosition());
  const scale = useRef(new Animated.Value(1)).current;
  const [color] = useState(randomColor());

  useEffect(() => {
    const timeout = setTimeout(() => {
      onPop(id, false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePress = () => {
    Animated.timing(scale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onPop(id, true));
  };

  return (
    <Animated.View
      style={[styles.balloon, position, { transform: [{ scale }] }]}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <Ionicons name="balloon-outline" size={120} color={color} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const BalloonPopScreen = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score >= 10) {
      setGameOver(true);
    }
  }, [score]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, { id: Date.now() }]);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  const popBalloon = (id, isUserPopped) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
    if (isUserPopped) {
      setScore((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    setScore(0);
    setBalloons([]);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Skor: {score}</Text>

      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>🎉 Tebrikler! Oyun Bitti 🎉</Text>
          <Button title="Yeniden Başla" onPress={restartGame} />
        </View>
      ) : (
        balloons.map((balloon) => (
          <Balloon key={balloon.id} id={balloon.id} onPop={popBalloon} />
        ))
      )}
    </View>
  );
};

export default BalloonPopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    position: "relative",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#00796b",
  },
  balloon: {
    position: "absolute",
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  gameOverText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00695c",
    textAlign: "center",
  },
});
