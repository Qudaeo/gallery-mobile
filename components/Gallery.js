import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Image, Text} from "react-native";

export const Gallery = inject("gallery", "images", "getGallery")(observer(
    ({gallery, images, getGallery}) => {

        useEffect(() => {
            getGallery()
        }, [])

        return (gallery.length === 0)
            ? <Text>loading...</Text>
            : <>
                {gallery.map(el => <Text key={el.id}>{el.author}</Text>)}
                {images.map(el => <Text key={el.url}>{JSON.stringify(el)}</Text>)}
            </>

        /*
        if (gallery.length === 0) {
            return <Text>loading...</Text>
        } else {
            return <>
                gallery.map(let el => <Text key={el.id}>{el.author}</Text>)
                {/*images.map(el => <Image key={el.url} source=require(el.image)/>)*/

    }
))

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

//export default inject("gallery", "getGallery")(observer(Gallery))

