import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-dom';
import * as Linking from 'expo-linking';

import OwnerProfile from './OwnerProfile';
import RepositoryStats from './RepositoryStats';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundWhite,
  },
  gitLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 3,
    margin: 10,
    backgroundColor: theme.colors.backgroundBlue,
  },
  gitLinkPadding: {
    padding: 10,
  },
});

export const RepositoryItem = ({ item, renderLink }) => {
  const navigate = useNavigate();
  const repositoryOnPress = () => {
    const id = item.id;
    console.log('repo clicked, id:', id);
    navigate(`/Repository/${id}`);
  };

  const gitOnPress = () => {
    console.log('git link pressed');
    Linking.openURL(item.url);
  };

  const GitLink = () => {
    return (
      <View style={styles.gitLinkContainer}>
        <Pressable onPress={gitOnPress}>
          <Text
            style={styles.gitLinkPadding}
            fontWeight='bold'
            fontSize='subheading'
            color='light'
          >
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Pressable onPress={repositoryOnPress}>
      <View testID='repositoryItem' style={styles.container}>
        <OwnerProfile item={item} />
        <RepositoryStats item={item} />
        {renderLink ? <GitLink /> : <></>}
      </View>
    </Pressable>
  );
};
