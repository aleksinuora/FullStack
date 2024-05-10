import { StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import Text from '../Text';
import AppBarTab from './AppBarTab';
import useMe from '../../hooks/useMe';
import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    flexGrow: 1,
    width: '100%',
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
        return <AppBarTab name='Sign out' target='' onPress={signOut} />;
      } else {
        return <AppBarTab name='Sign in' target='SignIn' />;
      }
    }
  };

  const CreateReview = () => {
    if (loading) {
      return <AppBarTab name='loading...' target='' />;
    } else {
      if (data.me) {
        return <AppBarTab name='Create a review' target='CreateReview' />;
      }
    }
  };

  const SignUp = () => {
    if (loading) {
      return <></>;
    } else {
      if (data.me) {
        return <></>;
      } else {
        return <AppBarTab name='Sign up' target='SignUp' />;
      }
    }
  };

  const MyReviews = () => {
    if (loading) {
      return <></>;
    } else {
      if (data.me) {
        return <AppBarTab name='My reviews' target='MyReviews' />;
      }
    }
  };

  return (
    <Text backgroundColor='dark'>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        fillViewport='true'
      >
        <AppBarTab name='Repositories' target='' />
        <CreateReview />
        <MyReviews />
        <SignIn />
        <SignUp />
      </ScrollView>
    </Text>
  );
};

export default AppBar;
