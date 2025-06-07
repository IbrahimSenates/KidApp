import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const animals = [
  { name: 'Kuş', sound: require('../../assets/sounds/bird.mp3'), image: require('../../assets/images/bird.jpg') },
  { name: 'Köpek', sound: require('../../assets/sounds/dog.mp3'), image: require('../../assets/images/dog.jpg') },
  { name: 'Kedi', sound: require('../../assets/sounds/cat.mp3'), image: require('../../assets/images/cat.png') },
  { name: 'Horoz', sound: require('../../assets/sounds/rooster.mp3'), image: require('../../assets/images/rooster.png') },
  { name: 'Fil', sound: require('../../assets/sounds/elephant.mp3'), image: require('../../assets/images/elephant.png') },
  { name: 'Karga', sound: require('../../assets/sounds/crow.mp3'), image: require('../../assets/images/crow.png') },
  { name: 'Kurbağa', sound: require('../../assets/sounds/frog.mp3'), image: require('../../assets/images/frog.png') },
  { name: 'Fare', sound: require('../../assets/sounds/rat.mp3'), image: require('../../assets/images/rat.png') },
  { name: 'Arı', sound: require('../../assets/sounds/bee.mp3'), image: require('../../assets/images/bee.png') },
  { name: 'At', sound: require('../../assets/sounds/horse.mp3'), image: require('../../assets/images/horse.png') },
  { name: 'Baykuş', sound: require('../../assets/sounds/owl.mp3'), image: require('../../assets/images/owl.png') },
];

const AnimalSoundsGameScreen = () => {
  const soundRef = useRef(null);

  const playSound = async (soundFile) => {
    try {

      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(soundFile);
      soundRef.current = sound;
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      console.error('Ses oynatma hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hayvan Sesleri</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.animalButton}
            onPress={() => playSound(animal.sound)}
          >
            <Image source={animal.image} style={styles.image} />
            <Text style={styles.animalName}>{animal.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AnimalSoundsGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  animalButton: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  animalName: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '500',
  },
});
