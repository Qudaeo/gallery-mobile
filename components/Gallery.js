import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Text} from "react-native";

const Gallery = ({gallery, getGallery}) => {

    useEffect(() => {
        getGallery()
    }, [])

    if (gallery) {

        return (gallery.length === 0)
            ? <Text>loading...</Text>
            : gallery.map(el => <Text key={el.id}>{el.author}</Text>)
    }
}

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        height: null,
        width: null,
        backgroundColor: '#000',
    }
});
*/

export default inject("gallery", "getGallery")(observer(Gallery))

