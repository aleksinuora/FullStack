import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'column',
    margin: 10,
  },
  languageIcon: {
    borderRadius: 3,
    marginVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
    margin: 10,
  },
});

const OwnerProfile = ({ item }) => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.subContainer}>
        <Text fontSize='subheading' fontWeight='bold'>
          {item.fullName}
        </Text>
        <Text color='textSecondary'>{item.description}</Text>
        <View alignSelf='flex-start'>
          <Text
            style={styles.languageIcon}
            color='light'
            backgroundColor='blue'
            padding={4}
          >
            {item.language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OwnerProfile;
