import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2; 

const cards = [
  {
    label: '✍️ Harfleri Tanıyalım',
    screen: 'Tracing',
    bgColor: '#f7a400', 
  },
  {
    label: '🔢 123 Sayı Oyunları',
    screen: 'Number',
    bgColor: '#4a90e2', 
  },
  {
    label: '🎈 Balonları Patlat',
    screen: 'BalloonPop',
    bgColor: '#34a853', 
  },
  {
    label: '🔤 Alfabe',
    screen: 'Alphabet',
    bgColor: '#e94e77', 
  },
  {
    label: '🎨 Renk Eşleştirme',
    screen: 'ColorMatch',
    bgColor: '#8e44ad',
  },
  {
    label: '🐾 Hayvanları Tanıyalım',
    screen: 'AnimalSounds',
    bgColor: '#d35400', 
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldiniz 👋</Text>
      <View style={styles.grid}>
        {cards.map(({ label, screen, bgColor }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: bgColor }]}
            onPress={() => navigation.navigate(screen)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ff8c00',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#ffb347',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
});
