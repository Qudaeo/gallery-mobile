import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import {PhotoType} from "../../mobx/GalleryStore";

type IProps = {
    photo: PhotoType
    imageDimensions: {
        width: number
        height: number
    }
    navigation: {
        navigate: (screen: string) => void
    }
}

export const GalleryItem: React.FC<IProps> = ({photo, imageDimensions, navigation}) => {
    const {galleryStore} = useStore()

    const id = photo.id

    const openDetailedImage = async () => {
        await galleryStore.getDetailPhoto(id)
        if (galleryStore.detailPhoto[id]) {
            navigation.navigate('DetailedImageScreen')
        } else {
            alert('Check internet connection!')
        }
    }

    return <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>
        <Image
            style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
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
        }}>{`Photo by ${photo.user.name}`}</Text>
        {/*<Text style={{
            position: 'absolute',
            fontSize: Math.round(12 / galleryStore.appColumnCount),
            color: 'rgba(255,255,255,1)',
            textAlign: "left",
            top: Math.round(5 / galleryStore.appColumnCount),
            left: Math.round(10 / galleryStore.appColumnCount),
        }}>{`id=${photo.id}   ${width}:${height}${galleryStore.base64Images[photo.id] ? `   ${Math.round(galleryStore.base64Images[id].length / 1024)}kb` : ''}`}</Text>*/}

    </TouchableOpacity>
}

export default observer(GalleryItem)
