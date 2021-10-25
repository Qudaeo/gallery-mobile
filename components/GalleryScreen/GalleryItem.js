import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import {baseURL} from "../../api/api";

export const GalleryItem = (props) => {

    const {galleryStore} = useStore()

    const id = props.image.id
    const width = props.imageDimensions.width
    const height = props.imageDimensions.height


    const openDetailedImage = () => {
        galleryStore.setDetailPhoto(props.image)
        props.navigation.navigate('DetailedImageScreen')
    };

    return <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>
        <Image
            style={{
                width: width,
                height: height,
                position: "relative"
            }}
            source={galleryStore.base64Images[id]
                ? {uri: galleryStore.base64Images[id]}
                : {uri: baseURL + `id/${id}/${width}/${height}.webp`}}
        />
        <Text style={{
            position: 'absolute',
            fontSize: Math.round(12 / galleryStore.appColumnCount),
            color: 'rgba(255,255,255,0.5)',
            textAlign: "right",
            bottom: Math.round(5 / galleryStore.appColumnCount),
            right: Math.round(10 / galleryStore.appColumnCount),
        }}>{`Photo by ${props.image.author}`}</Text>
        <Text style={{
            position: 'absolute',
            fontSize: Math.round(12 / galleryStore.appColumnCount),
            color: 'rgba(255,255,255,1)',
            textAlign: "left",
            top: Math.round(5 / galleryStore.appColumnCount),
            left: Math.round(10 / galleryStore.appColumnCount),
        }}>{`id=${id}   ${width}:${height}${galleryStore.base64Images[id] ? `   ${Math.round(galleryStore.base64Images[id].length / 1024)}kb` : ''}`}</Text>


    </TouchableOpacity>
}

export default observer(GalleryItem)
