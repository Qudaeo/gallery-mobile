import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";

export const GalleryItem = (props) => {

    const {galleryStore} = useStore()

    const id = props.image.id
    const width = props.imageDimensions.width
    const height = props.imageDimensions.height



    const openDetailedImage = () => {
        galleryStore.setDetailPhoto(id, width, height)
        props.navigation.navigate('DetailedImage')
    };

    return <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>

        <Image
            style={{
                width: width,
                height: height,
                position: "relative",
            }}
            source={{uri: galleryStore.base64Images[id]}}
        />

        <Text style={{
            position: 'absolute',
            fontSize: Math.round(12 / galleryStore.appColumnCount),
            color: 'rgba(255,255,255,0.5)',
            textAlign: "right",
            bottom: Math.round(5 / galleryStore.appColumnCount),
            right: Math.round(10 / galleryStore.appColumnCount),
        }}>{`Photo by ${props.image.author}`}</Text>

    </TouchableOpacity>
}

export default observer(GalleryItem)
