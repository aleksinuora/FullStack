import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBox = ({ keyword, setKeyword }) => {
  return (
    <Searchbar
      placeholder='Search repositories'
      value={keyword}
      onChangeText={setKeyword}
    />
  );
};

export const SearchBoxMemo = React.memo(SearchBox);
