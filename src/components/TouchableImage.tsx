import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

type TouchableIImageType = {
  onPress: () => void;
  source: string;
  disabled?: boolean;
};

const icons: any = {
  sort: require('../icons/sorting.png'),
  search: require('../icons/search.png'),
  cancel: require('../icons/cancel.png'),
};

const TouchableImage = ({
  onPress,
  source,
  disabled = false,
}: TouchableIImageType) => {
  return (
    <TouchableOpacity
      style={disabled ? styles.disabledOpacity : styles.activeOpacity}
      onPress={onPress}
      disabled={disabled}>
      <Image source={icons[source]} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
  disabledOpacity: {opacity: 0.6},
  activeOpacity: {opacity: 1},
});

export default TouchableImage;
