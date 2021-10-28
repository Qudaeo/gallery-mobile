import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {Searchbar} from 'react-native-paper';
import magnifierPicture from '../../images/GalleryScreen/magnifier.png'
import clearPicture from '../../images/GalleryScreen/cancel.png'

const SearchPhotoBar = (props) => {

    const [isFocused, setIsFocused] = useState(false)
    const [searchTextTemp, setSearchTextTemp] = useState(props.searchText)

    useEffect(
        () => setSearchTextTemp(props.searchText),
        [props.searchText]
    )

    const currentWindowWidth = useWindowDimensions().width

    const searchbarRef = useRef(null);
    useEffect(() => {
        if (isFocused) {
            searchbarRef.current.focus()
        }
    }, [isFocused])

    const styles = StyleSheet.create({
        searchButton: {
            position: 'absolute',
            left: 15,
            top: 10,
            zIndex: 100,
            width: isFocused ? currentWindowWidth - 100 : 50,
            borderRadius: 50,
            height: 50,

            backgroundColor: isFocused ? "rgba(230, 249, 255, 0.92)" : "rgba(230, 249, 255, 0.7)",
        }
    })

    return <View style={{
        position: 'absolute',
        zIndex: 100,
        direction: "row"

    }}>
        <View>
            <Searchbar
                ref={searchbarRef}
                style={styles.searchButton}
                placeholder="Search photos..."
                onChangeText={text => {
                    setSearchTextTemp(text)
                    if (text === '') {
                        props.searchTextChange('')
                    }
                }}
                value={searchTextTemp}
                onIconPress={() => {
                    setIsFocused(!isFocused)
                }}
                onBlur={() => {
                    setIsFocused(false)
                    props.searchTextChange(searchTextTemp)
                }}


                icon={magnifierPicture}
                clearIcon={clearPicture}
                iconColor={'rgb(0, 0, 255)'}

            />
        </View>
        {!!(props.searchText) &&
        <View style={{
            borderWidth: 1,
            marginLeft: isFocused ? currentWindowWidth : 120,
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: 'rgba(230, 249, 255, 0.7)',
            borderColor: 'rgba(245,245,245,0.5)',


        }}>
            <Text style={{
                fontSize: 17,
                marginHorizontal: 5,
                marginVertical:2,
            }}>{props.searchText}</Text>
        </View>}
    </View>
}


export default SearchPhotoBar
