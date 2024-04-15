import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  subContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const parseThousands = (value) => {
  if (value > 999) {
    return String((value / 1000).toFixed(1)) + 'k';
  } else {
    return String(value);
  }
};

const StatItem = ({ statKey, statValue }) => {
  return (
    <View style={styles.subContainer}>
      <Text fontWeight='bold'>{parseThousands(statValue)}</Text>
      <Text color='textSecondary'>{statKey}</Text>
    </View>
  );
};

const RepositoryStats = ({ item }) => {
  return (
    <View style={styles.container}>
      <StatItem statKey='Stars' statValue={item.stargazersCount} />
      <StatItem statKey='Forks' statValue={item.forksCount} />
      <StatItem statKey='Reviews' statValue={item.reviewCount} />
      <StatItem statKey='Rating' statValue={item.ratingAverage} />
    </View>
  );
};

export default RepositoryStats;
