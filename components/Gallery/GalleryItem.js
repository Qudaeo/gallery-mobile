import React from "react";
import {Image, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {marginHorizontal, marginVertical} from "../../common/const";
import {calcImageDimensions} from "../../common/funcions";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";


export const GalleryItem = (props) => {

    const {galleryStore} = useStore()

    const ratio = props.image.height / props.image.width

    const imageDimensions = calcImageDimensions(useWindowDimensions().width, ratio)

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

        {/*<Text>{`${props.image.id} - ${props.image.width}:${props.image.height} - ${imageDimensions.width}:${imageDimensions.height}`}</Text>*/}
        <TouchableOpacity activeOpacity={.7} onPress={() => openDetailedImage()}>

            <Image
                style={{
                    width: imageDimensions.width,
                    height: imageDimensions.height,
                    position: "relative",
                }}
                source={{uri: galleryStore.base64Images[props.image.id]}}
            />


            {/* <Text>{props.galleryStore.images[props.image.id]}</Text>*/}


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

export default observer(GalleryItem)

