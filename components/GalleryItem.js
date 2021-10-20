import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {marginHorizontalPercent, marginVerticalPercent} from "../common/const";

export const GalleryItem = ({image, windowWidth, setDetailPhoto, navigation}) => {

    const calcImageWidth = Math.floor(windowWidth * (100 - 2 * marginHorizontalPercent) / 100)
    const calcImageHeight = Math.floor(calcImageWidth * image.height / image.width)

    const openDetailedImage = () => {
        setDetailPhoto(image.id, calcImageWidth, calcImageHeight)
        navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontalPercent + '%',
        marginVertical: marginVerticalPercent + '%',
        width: calcImageWidth,
        height: calcImageHeight,
    }}>

        {/*<Text>{`${image.id} - ${image.width}:${image.height} - ${calcImageWidth}:${calcImageHeight}`}</Text>*/}
        <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>
            <Image
                style={{
                    width: calcImageWidth,
                    height: calcImageHeight,
                    position: "relative",
                }}
                source={{
                    uri: `https://picsum.photos/id/${image.id}/${calcImageWidth}/${calcImageHeight}.webp`
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

