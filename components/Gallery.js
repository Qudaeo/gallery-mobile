import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Dimensions, Text} from "react-native";
import GalleryImageItem from "./GalleryImageItem";

const Gallery = ({gallery, getGallery, setAppWindowWidth, currentPage}) => {

    const windowWidth = Dimensions.get('window').width

    useEffect(() => {
        getGallery()
    }, [currentPage])

    useEffect(() => {
        setAppWindowWidth(windowWidth)
    }, [windowWidth])

    return <>
        <Text>{windowWidth}</Text>
        {(gallery.length === 0)
            ? <Text>loading...</Text>
            : (gallery) && gallery.map(el =>
            <GalleryImageItem key={el.id} imageId={el.id}/>)
        }
    </>
}


/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image:
});
*/

export default inject("gallery", "getGallery", "setAppWindowWidth", "currentPage")(observer(Gallery))

