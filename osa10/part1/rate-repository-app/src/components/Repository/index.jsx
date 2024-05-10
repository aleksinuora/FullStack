import { FlatList, StyleSheet, View } from 'react-native';

import { RepositoryItem } from '../RepositoryList/RepositoryItem';
import ReviewItem from '../ReviewItem';
import useRepository from '../../hooks/useRepository';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    width: '100%',
    backgroundColor: theme.colors.backgroundLight,
  },
});

export const RepositoryContainer = ({ repository, reviewData }) => {
  const reviewNodes = reviewData
    ? reviewData.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem data={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} renderLink />
          <View style={styles.separator} />
        </>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const Repository = () => {
  const { data, loading } = useRepository();

  if (loading) {
    return <Text>loading...</Text>;
  }
  const reviews = data.repository.reviews;

  return (
    <RepositoryContainer repository={data.repository} reviewData={reviews} />
  );
};

export default Repository;
