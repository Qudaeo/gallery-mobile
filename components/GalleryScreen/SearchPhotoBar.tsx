import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import magnifierPicture from '../../images/SearchPhotoBar/magnifier.png';
import clearPicture from '../../images/SearchPhotoBar/cancel.png';

type IProps = {
  searchText: string;
  searchTextChange: (text: string) => void;
};

const SearchPhotoBar: React.FC<IProps> = ({searchText, searchTextChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTextTemp, setSearchTextTemp] = useState(searchText);

  useEffect(() => setSearchTextTemp(searchText), [searchText]);

  const currentWindowWidth = useWindowDimensions().width;

  const searchbarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isFocused) {
      searchbarRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 100,
          flexDirection: 'row',
        },
      ]}>
      <Searchbar
        ref={searchbarRef}
        style={[
          styles.searchButton,
          {
            width: isFocused ? currentWindowWidth - 100 : 50,
            borderRadius: 25,
            height: 50,
            backgroundColor: isFocused
              ? 'rgba(230, 249, 255, 0.92)'
              : 'rgba(230, 249, 255, 0.7)',
          },
        ]}
        placeholder="Search photos..."
        onChangeText={text => {
          setSearchTextTemp(text);
          if (text === '') {
            searchTextChange('');
          }
        }}
        value={searchTextTemp}
        onIconPress={() => {
          setIsFocused(!isFocused);
        }}
        onBlur={() => {
          setIsFocused(false);
          searchTextChange(searchTextTemp);
        }}
        icon={magnifierPicture}
        clearIcon={clearPicture}
        iconColor={'rgb(51, 102, 255)'}
      />
      {!!searchText && (
        <TouchableOpacity onPress={() => setIsFocused(true)}>
          <View
            style={{
              borderWidth: 1,
              marginLeft: isFocused ? currentWindowWidth : 115,
              marginTop: 10,
              borderRadius: 8,
              backgroundColor: 'rgba(230, 249, 255, 0.7)',
              borderColor: 'rgba(191, 191, 191,0.7)',
              opacity: 10,
              maxWidth: currentWindowWidth - 180,
            }}>
            <Text
              style={{
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 2,
                color: 'rgb(46, 45, 41)',
              }}>
              {searchText}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchPhotoBar;

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    left: 15,
    zIndex: 100,
    borderRadius: 50,
    height: 50,
  },
});
