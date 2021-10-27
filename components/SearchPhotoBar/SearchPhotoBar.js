import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Searchbar} from 'react-native-paper';
import magnifierPicture from '../../images/GalleryScreen/magnifier.png'
import clearPicture from '../../images/GalleryScreen/cancel.png'

const SearchPhotoBar = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
        searchButton: {
            position: 'absolute',
            left: 15,
            top: 10,
            zIndex: 100,
            width: isFocused ? 300 : 50,
            borderRadius: 50,
            height: 50,

            backgroundColor: "rgba(230, 249, 255, 0.7)",
        }
    });

    return <Searchbar
        style={styles.searchButton}
        placeholder="Search photos..."
        onChangeText={text => {
            props.searchTextChange(text)
        }}
        value={props.searchText}
        onIconPress={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(false)}

        icon={magnifierPicture}
        clearIcon={clearPicture}/>
}
export default SearchPhotoBar
