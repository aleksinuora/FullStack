import { StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import Text from '../Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
});

const AppBar = () => {
  return (
    <Text backgroundColor='dark' style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name='Repositories' target='' />
        <AppBarTab name='SignIn' target='SignIn' />
      </ScrollView>
    </Text>
  );
};

export default AppBar;
