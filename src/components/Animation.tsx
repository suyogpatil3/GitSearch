import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const animations: any = {
  error: require('../../assets/error.json'),
  loader: require('../../assets/loader.json'),
  noResults: require('../../assets/noResults.json'),
  github: require('../../assets/github.json'),
};

type AnimationType = {
  animation: string;
  message?: string;
  loop: boolean;
};

const Animation = ({animation, message, loop = false}: AnimationType) => (
  <View style={styles.container}>
    <Lottie
      style={styles.animation}
      source={animations[animation]}
      autoPlay
      loop={loop}
    />
    {message && <Text style={styles.message}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
  },
  message:{fontSize:18}
});

export default Animation;
