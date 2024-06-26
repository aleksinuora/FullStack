import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList/';
import AppBar from './AppBar/AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Repository from './Repository';
import theme from '../theme';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundMain,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <View>
        <AppBar />
      </View>
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/Repository/:repositoryId' element={<Repository />} />
        <Route path='/CreateReview' element={<CreateReview />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/MyReviews' element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
