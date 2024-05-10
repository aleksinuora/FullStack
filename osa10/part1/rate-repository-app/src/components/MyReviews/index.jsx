import { FlatList, StyleSheet, View } from 'react-native';

import ReviewItem from '../ReviewItem';
import Text from '../Text';
import theme from '../../theme';
import useMe from '../../hooks/useMe';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    width: '100%',
    backgroundColor: theme.colors.backgroundLight,
  },
});

export const ReviewsContainer = ({ reviewData, refetchReviews }) => {
  const reviewNodes = reviewData
    ? reviewData.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <>
          <ReviewItem data={item} loggedIn refetchReviews={refetchReviews} />
        </>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useMe(true);

  if (loading) {
    return <Text>loading...</Text>;
  }
  const reviews = data.me.reviews;

  return <ReviewsContainer reviewData={reviews} refetchReviews={refetch} />;
};

export default MyReviews;
