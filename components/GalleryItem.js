import React from "react";
import {Image, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {marginHorizontal, marginVertical} from "../common/const";
import {calcImageDimensions} from "../common/funcions";

export const GalleryItem = ({image, setDetailPhoto, navigation}) => {
    const imageDimensions = calcImageDimensions(useWindowDimensions().width,image.height / image.width)

    const openDetailedImage = () => {
        setDetailPhoto(image.id, imageDimensions.width, imageDimensions.height)
        navigation.navigate('DetailedImage')
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
                source={{
                    uri: `https://picsum.photos/id/${image.id}/${imageDimensions.width}/${imageDimensions.height}.webp`
                }}>
            </Image>
            <Text style={{
                position: 'absolute',
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                textAlign: "right",
                bottom: 5,
                right: 10
            }}>{`Photo by ${image.author}`}</Text>


        </TouchableOpacity>
    </View>
}

export default GalleryItem

