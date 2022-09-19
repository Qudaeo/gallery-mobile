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
import {colors} from '../../common/colors';
import {commonStyles} from '../../common/styles';

type IProps = {
  searchText: string;
  searchTextChange?: (text: string) => void;
};

const SearchPhotoBar: React.FC<IProps> = ({searchText, searchTextChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTextTemp, setSearchTextTemp] = useState(searchText);

  useEffect(() => setSearchTextTemp(searchText), [searchText]);

  const windowWidth = useWindowDimensions().width;

  const searchbarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isFocused) {
      searchbarRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <View style={commonStyles.row}>
      <Searchbar
        ref={searchbarRef}
        style={[
          styles.searchButton,
          {
            width: isFocused ? windowWidth - 100 : 50,
            opacity: isFocused ? 0.95 : 0.85,
          },
        ]}
        placeholder="Search photos..."
        onChangeText={text => {
          setSearchTextTemp(text);
          if (text === '') {
            searchTextChange?.('');
          }
        }}
        value={searchTextTemp}
        onIconPress={() => {
          setIsFocused(!isFocused);
        }}
        onBlur={() => {
          setIsFocused(false);
          searchTextChange?.(searchTextTemp);
        }}
        icon={magnifierPicture}
        clearIcon={clearPicture}
        iconColor={'rgb(51, 102, 255)'}
      />
      {!!searchText && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsFocused(true)}>
          <View
            style={{
              borderWidth: 1,
              marginLeft: isFocused ? windowWidth : 50,
              marginTop: 10,
              borderRadius: 8,
              backgroundColor: 'rgba(230, 249, 255, 0.7)',
              borderColor: 'rgba(191, 191, 191,0.7)',
              maxWidth: windowWidth - 180,
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
    backgroundColor: colors.blue_e6fff9,
    zIndex: 10,
    borderRadius: 25,
    height: 50,
  },
});
