import { StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import Text from '../Text';
import AppBarTab from './AppBarTab';
import useMe from '../../hooks/useMe';
import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
});

const AppBar = () => {
  const { data, loading } = useMe();
  const [signOut] = useSignOut();

  const SignIn = () => {
    if (loading) {
      return <AppBarTab name='loading...' target='' />;
    } else {
      if (data.me) {
        return <AppBarTab name='SignOut' target='' onPress={signOut} />;
      } else {
        return <AppBarTab name='SignIn' target='SignIn' />;
      }
    }
  };

  return (
    <Text backgroundColor='dark' style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name='Repositories' target='' />
        <SignIn />
      </ScrollView>
    </Text>
  );
};

export default AppBar;
