import React, {useState} from 'react';
import { Searchbar } from 'react-native-paper';

export default function Search ({executeSearch}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={text => setSearchQuery(text)}
      value={searchQuery}
      returnKeyType="search"
      onSubmitEditing={() => executeSearch(searchQuery)}
      onIconPress={() => executeSearch(searchQuery)}
    />
  );
};

