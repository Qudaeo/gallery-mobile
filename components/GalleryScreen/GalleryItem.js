import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";

export const GalleryItem = (props) => {

    const {galleryStore} = useStore()

    const id = props.photo.id
    const width = props.imageDimensions.width
    const height = props.imageDimensions.height


    const openDetailedImage = async () => {
        await galleryStore.getDetailPhoto(id)
        props.navigation.navigate('DetailedImageScreen')
    };

    return <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>
        <Image
            style={{
                width: width,
                height: height,
                position: "relative"
            }}
            source={{uri: galleryStore.base64Images[id]}}
        />
        {/*                : {uri: baseURL + `id/${id}/${width}/${height}.webp`}}*/}
        <Text style={{
            position: 'absolute',
            fontSize: Math.round(12 / galleryStore.appColumnCount),
            color: 'rgba(255,255,255,0.5)',
            textAlign: "right",
            bottom: Math.round(5 / galleryStore.appColumnCount),
            right: Math.round(10 / galleryStore.appColumnCount),
        }}>{`Photo by ${props.photo.user.name}`}</Text>
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
