import React from "react";
import {Image, View} from "react-native";
import {marginHorizontalPercent, marginVerticalPercent} from "../common/const";

export const GalleryImageItem = ({image, windowWidth}) => {

    const calcImageWidth = Math.floor(windowWidth * (100 - 2 * marginHorizontalPercent) / 100)
    const calcImageHeight = Math.floor(calcImageWidth * image.height / image.width)

    return <View style={{
        marginHorizontal: marginHorizontalPercent + '%',
        marginVertical: marginVerticalPercent + '%'
    }}>
        {/*<Text>{`${image.id} - ${image.width}:${image.height} - ${calcImageWidth}:${calcImageHeight}`}</Text>*/}
        <Image
            style={{
                width: calcImageWidth,
                height: calcImageHeight
            }}
            source={{
                uri: `https://picsum.photos/id/${image.id}/${calcImageWidth}/${calcImageHeight}.webp`
            }}/>
    </View>
}

export default GalleryImageItem

