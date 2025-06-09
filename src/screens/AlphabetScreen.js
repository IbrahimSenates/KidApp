
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const alphabet = [
  {
    letter: "A",
    image: "https://dummyimage.com/150x150/007AFF/fff&text=A",
    word: "Araba",
  },
  {
    letter: "B",
    image: "https://dummyimage.com/150x150/FF9500/fff&text=B",
    word: "Balık",
  },
  {
    letter: "C",
    image: "https://dummyimage.com/150x150/FF2D55/fff&text=C",
    word: "Ceviz",
  },
  {
    letter: "Ç",
    image: "https://dummyimage.com/150x150/5856D6/fff&text=Ç",
    word: "Çiçek",
  },
  {
    letter: "D",
    image: "https://dummyimage.com/150x150/FF3B30/fff&text=D",
    word: "Deniz",
  },
  {
    letter: "E",
    image: "https://dummyimage.com/150x150/FF9500/fff&text=E",
    word: "Elma",
  },
  {
    letter: "F",
    image: "https://dummyimage.com/150x150/34C759/fff&text=F",
    word: "Fındık",
  },
  {
    letter: "G",
    image: "https://dummyimage.com/150x150/AF52DE/fff&text=G",
    word: "Gül",
  },
  {
    letter: "Ğ",
    image: "https://dummyimage.com/150x150/FF9F0A/fff&text=Ğ",
    word: "Ağrı",
  },
  {
    letter: "H",
    image: "https://dummyimage.com/150x150/FF2D55/fff&text=H",
    word: "Hayvan",
  },
  {
    letter: "I",
    image: "https://dummyimage.com/150x150/5AC8FA/fff&text=I",
    word: "Ispanak",
  },
  {
    letter: "İ",
    image: "https://dummyimage.com/150x150/007AFF/fff&text=İ",
    word: "İnek",
  },
  {
    letter: "J",
    image: "https://dummyimage.com/150x150/FF375F/fff&text=J",
    word: "Japon",
  },
  {
    letter: "K",
    image: "https://dummyimage.com/150x150/FF9F0A/fff&text=K",
    word: "Kuş",
  },
  {
    letter: "L",
    image: "https://dummyimage.com/150x150/34C759/fff&text=L",
    word: "Limon",
  },
  {
    letter: "M",
    image: "https://dummyimage.com/150x150/AF52DE/fff&text=M",
    word: "Masa",
  },
  {
    letter: "N",
    image: "https://dummyimage.com/150x150/FF3B30/fff&text=N",
    word: "Nar",
  },
  {
    letter: "O",
    image: "https://dummyimage.com/150x150/5AC8FA/fff&text=O",
    word: "Orman",
  },
  {
    letter: "Ö",
    image: "https://dummyimage.com/150x150/5856D6/fff&text=Ö",
    word: "Ördek",
  },
  {
    letter: "P",
    image: "https://dummyimage.com/150x150/FF375F/fff&text=P",
    word: "Papatya",
  },
  {
    letter: "R",
    image: "https://dummyimage.com/150x150/FF9500/fff&text=R",
    word: "Rüzgar",
  },
  {
    letter: "S",
    image: "https://dummyimage.com/150x150/007AFF/fff&text=S",
    word: "Sandalye",
  },
  {
    letter: "Ş",
    image: "https://dummyimage.com/150x150/FF3B30/fff&text=Ş",
    word: "Şapka",
  },
  {
    letter: "T",
    image: "https://dummyimage.com/150x150/34C759/fff&text=T",
    word: "Top",
  },
  {
    letter: "U",
    image: "https://dummyimage.com/150x150/AF52DE/fff&text=U",
    word: "Uçak",
  },
  {
    letter: "Ü",
    image: "https://dummyimage.com/150x150/FF9F0A/fff&text=Ü",
    word: "Üzüm",
  },
  {
    letter: "V",
    image: "https://dummyimage.com/150x150/FF2D55/fff&text=V",
    word: "Vazo",
  },
  {
    letter: "Y",
    image: "https://dummyimage.com/150x150/5AC8FA/fff&text=Y",
    word: "Yelken",
  },
  {
    letter: "Z",
    image: "https://dummyimage.com/150x150/5856D6/fff&text=Z",
    word: "Zebra",
  },
];

const AlphabetScreen = () => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const soundRef = useRef(null);

  const getGoogleTTSUrl = (text) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&tl=tr&client=tw-ob&q=${encodeURIComponent(
      text
    )}`;

  const playSound = async (soundUrl, index) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setLoadingIndex(index);

      const { sound } = await Audio.Sound.createAsync({ uri: soundUrl });
      soundRef.current = sound;

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setLoadingIndex(null);
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      console.error("Ses oynatma hatası:", error);
      setLoadingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alfabe Öğren</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {alphabet.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.letterRow}>
              <Text style={styles.letter}>{item.letter}</Text>
              <TouchableOpacity
                onPress={() =>
                  playSound(getGoogleTTSUrl(item.letter), index * 2)
                }
                style={styles.soundButton}
                activeOpacity={0.7}
              >
                {loadingIndex === index * 2 ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <MaterialIcons name="volume-up" size={24} color="#fff" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.wordRow}>
              <Text style={styles.word}>{item.word}</Text>
              <TouchableOpacity
                onPress={() =>
                  playSound(getGoogleTTSUrl(item.word), index * 2 + 1)
                }
                style={styles.soundButton}
                activeOpacity={0.7}
              >
                {loadingIndex === index * 2 + 1 ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <MaterialIcons name="volume-up" size={24} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AlphabetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f9ff",
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    color: "#1e3a8a",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#d0d9ff",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 16,
    marginBottom: 16,
  },
  letterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  letter: {
    fontSize: 50,
    fontWeight: "900",
    color: "#2563eb",
    fontFamily: "System",
  },
  soundButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 30,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e40af",
    fontFamily: "System",
  },
});
