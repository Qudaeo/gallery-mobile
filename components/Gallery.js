import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Image, Text, View, StyleSheet} from "react-native";
import {decorate} from "core-decorators";
import {action, computed, observable} from "mobx";

const Gallery = (props) => {
    useEffect(() => {
        props.getGallery();
    },[])

    return props.gallery.map(el => <Text key={el.id}>{el.author}</Text>)
};

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

export default inject("gallery", "getGallery")(Gallery);

decorate(Gallery, {
    gallery: observable,
    getGallery: action
})
