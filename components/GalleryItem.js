import React from "react";
import {Image, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {marginHorizontal, marginVertical} from "../common/const";
import {calcImageDimensions} from "../common/funcions";
import {inject, observer} from "mobx-react";
import {useStore} from "../mobx/store";


export const GalleryItem = (props) => {

    const {galleryStore} = useStore()

    const imageDimensions = calcImageDimensions(useWindowDimensions().width,props.image.height / props.image.width)

    const openDetailedImage = () => {
        galleryStore.setDetailPhoto(props.image.id, imageDimensions.width, imageDimensions.height)
        props.navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        width: imageDimensions.width,
        height: imageDimensions.height,
    }}>

        {/*<Text>{`${image.id} - ${image.width}:${image.height} - ${calcImageWidth}:${calcImageHeight}`}</Text>*/}
        <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>

            <Image
                style={{
                    width: imageDimensions.width,
                    height: imageDimensions.height,
                    position: "relative",
                }}
                source={{uri: props.galleryStore.images[props.image.id]}}
            />


            {/* <Text>{props.galleryStore.images[props.image.id]}</Text>*/}

                {/*
                source={{
                    uri: `https://picsum.photos/id/${image.id}/${imageDimensions.width}/${imageDimensions.height}.webp`
                }}
                */}


            <Text style={{
                position: 'absolute',
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                textAlign: "right",
                bottom: 5,
                right: 10
            }}>{`Photo by ${props.image.author}`}</Text>


        </TouchableOpacity>
    </View>
}

export default inject("galleryStore")(observer(GalleryItem))

