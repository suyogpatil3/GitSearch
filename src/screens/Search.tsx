import React, {useRef, useState} from 'react';
import axios from 'axios';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';

import Animation from '../components/Animation';
import Card from '../components/Card';
import Center from '../components/Center';
import SearchInput from '../components/SearchInput';
import SortingModal from '../components/SortingModal';
import {API_URL} from '../lib/constants';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<String>('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const flatlistRef = useRef<FlatList>(null);
  const onSort = () => {
    flatlistRef?.current?.scrollToIndex({index: 0, animated: true});
  };
  const onSearch = async (query: string) => {
    setApiError(false);
    setIsLoading(true);
    try {
      const result = await axios.get(`${API_URL}?q=${query.toLowerCase()}`);
      if (result) {
        setSearchResult(result?.data?.items);
        setIsLoading(false);
      }
    } catch (error) {
      setApiError(true);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchInput setSearchQuery={setSearchQuery} onSearch={onSearch} />
        <SortingModal
          data={searchResult}
          setData={setSearchResult}
          onSort={onSort}
        />
      </View>
      {isLoading || apiError || searchQuery?.length < 1 ? (
        <Center>
          <Text>
            {searchQuery?.length < 1 ? (
              <View>
                <Animation loop={true} animation="github" />
                <Text style={styles.initialView}>
                  Discover github repositories
                </Text>
              </View>
            ) : (
              <Animation
                loop={!apiError}
                animation={apiError ? 'error' : 'loader'}
                message={
                  apiError ? 'Oops! Something went wrong!' : 'Loading...'
                }
              />
            )}
          </Text>
        </Center>
      ) : (
        <FlatList
          ref={flatlistRef}
          scrollsToTop={true}
          scrollEnabled={true}
          style={styles.flatlistStyle}
          contentContainerStyle={styles.flatlistContainerStyle}
          data={searchResult}
          renderItem={({item}) => <Card item={item} />}
          ListEmptyComponent={
            <Center>
              <Animation
                animation="noResults"
                loop={false}
                message="No results found"
              />
            </Center>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistStyle: {
    flexGrow: 1,
    paddingTop: 24,
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    paddingBottom: 36,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  initialView: {fontSize: 18, marginTop: 20},
});

export default Search;
