import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ABCTracingScreen from "../screens/ABCTracingScreen";
import LetterTracingScreen from "../screens/LetterTracingScreen";
import BalloonPopScreen from "../screens/BalloonPopScreen";
import NumberTouchGameScreen from "../screens/NumberTouchGameScreen";
import ColorMatchGameScreen from "../screens/ColorMatchGameScreen";
import AnimalSoundsGameScreen from "../screens/AnimalSoundsGameScreen";
import AlphabetScreen from "../screens/AlphabetScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Öğrenme Uygulaması" }}
        />
        <Stack.Screen
          name="Tracing"
          component={ABCTracingScreen}
          options={{ title: "Harfleri Tanıyalım" }}
        />
        <Stack.Screen
          name="LetterTracing"
          component={LetterTracingScreen}
          options={{ title: "Harf Çiz" }}
        />
        <Stack.Screen
          name="BalloonPop"
          component={BalloonPopScreen}
          options={{ title: "Balonları Patlat" }}
        />
        <Stack.Screen
          name="Number"
          component={NumberTouchGameScreen}
          options={{ title: "Sayıları Öğrenelim" }}
        />
        <Stack.Screen
          name="ColorMatch"
          component={ColorMatchGameScreen}
          options={{ title: "Renkleri Öğrenelim" }}
        />
        <Stack.Screen
          name="AnimalSounds"
          component={AnimalSoundsGameScreen}
          options={{ title: "Hayvanları Tanıyalım" }}
        />
        <Stack.Screen
          name="Alphabet"
          component={AlphabetScreen}
          options={{ title: "Alfabe Öğren" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
