import React, {useState} from 'react';
import { ActivityIndicator} from "react-native";
import SearchBar from 'react-native-platform-searchbar';

export default function Search({executeSearch}) {
const [search, setSearch] = useState('');

  return (
    
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        theme="light"
        platform="android"
        onCancel={() => executeSearch('')}
        onClear={() => executeSearch('')}
        onSubmitEditing={() => executeSearch(search)}
        //style={styles.searchBar}
    >
        {/* {loading ? (
            <ActivityIndicator style={{ marginRight: 10 }} />
        ) : undefined} */}
    </SearchBar>
      
  )
}