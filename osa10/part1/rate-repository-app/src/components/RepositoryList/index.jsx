import { FlatList, StyleSheet } from 'react-native';

import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import Text from '../Text';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    gap: 10,
  },
});

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) {
    return <Text>loading...</Text>;
  } else {
    const repositoryNodes = data.repositories
      ? data.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        contentContainerStyle={styles.flexContainer}
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
};

export default RepositoryList;
