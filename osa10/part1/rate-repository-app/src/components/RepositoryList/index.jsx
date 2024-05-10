import { FlatList, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import React from 'react';

import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import Text from '../Text';
import { SearchBoxMemo } from './SearchBox';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    gap: 10,
  },
});

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  keyword,
  setKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const OrderMenu = () => {
    return (
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
      >
        <Picker.Item label='Latest repositories' value='CREATED_AT' />
        <Picker.Item label='Highest rated repositories' value='DESC' />
        <Picker.Item label='Lowest rated repositories' value='ASC' />
      </Picker>
    );
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.flexContainer}
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <SearchBoxMemo keyword={keyword} setKeyword={setKeyword} />
            <OrderMenu />
          </>
        }
      />
    </View>
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('CREATED_AT');
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 1000);

  const { data, loading } = useRepositories(order, debouncedKeyword);

  if (loading) {
    return <Text>loading...</Text>;
  } else {
    const repositories = data.repositories ? data.repositories : [];

    return (
      <RepositoryListContainer
        repositories={repositories}
        order={order}
        setOrder={setOrder}
        keyword={keyword}
        setKeyword={setKeyword}
      />
    );
  }
};

export default RepositoryList;
