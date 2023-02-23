import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {countFormatter} from '../utils/helpers';

type CardItemType = {
  item: {
    description: string;
    language: string;
    name: string;
    stargazers_count: number;
    owner: {
      avatar_url: string;
    };
    forks_count: number;
    html_url: string;
  };
};

type StatisticType = {
  label: string;
  source: any;
};

const Statistic = ({label, source}: StatisticType) => (
  <View style={styles.row}>
    <Image style={styles.itemLogo} source={source} />
    <Text style={styles.language}>{label}</Text>
  </View>
);

const Card = ({item}: CardItemType) => {
  const {
    description,
    language,
    name,
    stargazers_count,
    owner,
    forks_count,
    html_url,
  } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(html_url)}>
      <View style={styles.headingWrapper}>
        <Image style={styles.avatar} source={{uri: owner.avatar_url}} />
        <Text style={styles.heading}>{name}</Text>
      </View>
      <Text numberOfLines={3}>{description}</Text>
      <View style={styles.footer}>
        <Statistic
          label={countFormatter(stargazers_count)}
          source={require('../icons/star.png')}
        />
        <Statistic label={language} source={require('../icons/language.png')} />
        <Statistic
          label={countFormatter(forks_count)}
          source={require('../icons/fork.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  language: {fontSize: 16},
  container: {
    height: 170,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    padding: 12,
    shadowOffset: {
      width: -0,
      height: -0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  itemLogo: {
    width: 22,
    height: 22,
    marginRight: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  headingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heading: {
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 16,
    width: '80%',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fork: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
