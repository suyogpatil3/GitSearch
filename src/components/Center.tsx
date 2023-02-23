import React from 'react';
import {StyleSheet, View} from 'react-native';

type CenterType = {
  children: React.ReactNode;
};

const Center = ({children}: CenterType) => {
  return <View style={styles.center}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default Center;
