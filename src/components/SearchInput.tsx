import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';

import TouchableImage from './TouchableImage';

type SearchInputType = {
  setSearchQuery: (arg: string) => void;
  onSearch: (arg: string) => void;
};

const SearchInput = ({setSearchQuery, onSearch}: SearchInputType) => {
  const [clicked, setClicked] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const onSubmit = () => {
    setSearchQuery(searchValue);
    onSearch(searchValue);
    setClicked(false);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchValue}
          onChangeText={text => {
            setSearchValue(text);
            setClicked(true);
          }}
          onFocus={() => {
            setClicked(true);
          }}
          onSubmitEditing={onSubmit}
        />
        {searchValue?.length > 0 ? (
          clicked ? (
            <TouchableImage
              disabled={searchValue?.length < 1}
              onPress={onSubmit}
              source="search"
            />
          ) : (
            <TouchableImage
              disabled={searchValue?.length < 1}
              onPress={() => {
                setSearchValue('');
                setClicked(true);
                Keyboard.dismiss();
              }}
              source="cancel"
            />
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '90%',
  },
  container: {
    marginBottom: 6,
    marginVertical: 16,
    paddingLeft: 16,
    width: '85%',
  },
  searchbar: {
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 15,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
    paddingRight: 18,
    shadowOffset: {
      width: -0,
      height: -0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    height: 60,
  },
  image: {
    height: 30,
    width: 30,
  },
});
