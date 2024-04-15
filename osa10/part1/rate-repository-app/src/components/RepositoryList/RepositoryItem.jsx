import React from 'react';
import { View, StyleSheet } from 'react-native';

import OwnerProfile from './OwnerProfile';
import RepositoryStats from './RepositoryStats';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundWhite,
  },
});

export const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <OwnerProfile item={item} />
      <RepositoryStats item={item} />
    </View>
  );
};
