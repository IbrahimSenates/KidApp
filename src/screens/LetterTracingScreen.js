import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Button,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const getBezierPath = points => {
  if (points.length === 0) return '';
  if (points.length === 1) {
    return `M${points[0].x},${points[0].y}`;
  }
  if (points.length === 2) {
    return `M${points[0].x},${points[0].y} L${points[1].x},${points[1].y}`;
  }

  let d = `M${points[0].x},${points[0].y} `;
  for (let i = 1; i < points.length - 2; i++) {
    const cpx = (points[i].x + points[i + 1].x) / 2;
    const cpy = (points[i].y + points[i + 1].y) / 2;
    d += `Q${points[i].x},${points[i].y} ${cpx},${cpy} `;
  }
  const last = points.length - 1;
  d += `L${points[last].x},${points[last].y}`;
  return d;
};

const LetterTracingScreen = ({ route }) => {
  const { letter } = route.params;
  const [paths, setPaths] = useState([]);
  const currentPoints = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
        setPaths(prev => [...prev, currentPoints.current]);
      },

      onPanResponderMove: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current = [...currentPoints.current, { x: locationX, y: locationY }];

        setPaths(prev => {
          const newPaths = [...prev];
          newPaths[newPaths.length - 1] = currentPoints.current;
          return newPaths;
        });
      },

      onPanResponderRelease: () => {
        currentPoints.current = [];
      },

      onPanResponderTerminate: () => {
        currentPoints.current = [];
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harf: {letter}</Text>
      <Button title="Temizle" onPress={() => setPaths([])} />
      <View style={styles.drawingArea} {...panResponder.panHandlers}>

        
        <Text style={styles.letterBackground}>{letter}</Text>
       
        <Text style={styles.smallLetterBackground}>{letter.toLowerCase()}</Text>

        <Svg height="100%" width="100%">
          {paths.map((points, i) => (
            <Path
              key={i}
              d={getBezierPath(points)}
              stroke="black"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

export default LetterTracingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffef2',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  drawingArea: {
    width: width - 40,
    height: height / 1.6,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  letterBackground: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    fontSize: 220,
    color: '#f0f0f0',
    fontWeight: 'bold',
    userSelect: 'none',
  },
  smallLetterBackground: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    fontSize: 200,
    color: '#e0e0e0',
    fontWeight: 'bold',
    opacity: 0.5,
    userSelect: 'none',
  },
});
