import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const ratingIconRadius = 20;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    backgroundColor: theme.colors.backgroundWhite,
    gap: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundWhite,
    gap: 10,
  },
  subContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: ratingIconRadius * 2,
    width: ratingIconRadius * 2,
    borderColor: theme.colors.backgroundBlue,
    borderRadius: ratingIconRadius,
    borderWidth: 2,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 4,
    margin: 10,
  },
});

const ReviewItem = ({ data, loggedIn = false, refetchReviews }) => {
  const [deleteReview] = useDeleteReview();

  const ReviewActions = () => {
    const navigate = useNavigate();

    const repositoryOnPress = () => {
      const id = data.repository.id;
      console.log('repo clicked, id:', id);
      navigate(`/Repository/${id}`);
    };

    const alertOnPress = async () => {
      console.log('delete review clicked, id:', data.id);
      deleteReview(data.id, refetchReviews);
    };

    const deleteReviewOnPress = () => {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'CANCEL',
            onPress: () => console.log('Cancel pressed'),
          },
          {
            text: 'DELETE',
            onPress: alertOnPress,
          },
        ]
      );
    };

    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: theme.colors.backgroundBlue,
          }}
          onPress={repositoryOnPress}
        >
          <Text color='light' fontSize='subheading'>
            View repository
          </Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button, backgroundColor: theme.colors.textError }}
          onPress={deleteReviewOnPress}
        >
          <Text color='light' fontSize='subheading'>
            Delete review
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingIcon}>
          <Text color='blue' fontSize='subheading'>
            {data.rating}
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text fontWeight='bold'>
            {loggedIn ? data.repository.fullName : data.user.username}
          </Text>
          <Text color='textSecondary'>
            {format(new Date(data.createdAt), 'dd/MM/yyyy')}
          </Text>
          <Text>{data.text}</Text>
        </View>
      </View>
      {loggedIn ? <ReviewActions /> : <></>}
    </View>
  );
};

export default ReviewItem;
