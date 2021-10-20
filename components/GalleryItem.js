import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {marginHorizontalPercent, marginVerticalPercent} from "../common/const";

export const GalleryItem = ({image, windowWidth, setDetailPhoto, navigation}) => {

    const calcImageWidth = Math.floor(windowWidth * (100 - 2 * marginHorizontalPercent) / 100)
    const calcImageHeight = Math.floor(calcImageWidth * image.height / image.width)

    const openDetailedImage = () => {
        setDetailPhoto(image.id, calcImageWidth,calcImageHeight)
        navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontalPercent + '%',
        marginVertical: marginVerticalPercent + '%'
    }}>

        {/*<Text>{`${image.id} - ${image.width}:${image.height} - ${calcImageWidth}:${calcImageHeight}`}</Text>*/}
        <TouchableOpacity activeOpacity={.5} onPress={() => openDetailedImage()}>
            <Image
                style={{
                    width: calcImageWidth,
                    height: calcImageHeight
                }}
                source={{
                    uri: `https://picsum.photos/id/${image.id}/${calcImageWidth}/${calcImageHeight}.webp`
                }}/>
        </TouchableOpacity>
    </View>
}

export default GalleryItem
