import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {inject} from "mobx-react";
import {marginHorizontalPercent, marginVerticalPercent} from "../common/const";


const DetailedImage = (props) => {

    const photo =props.commonStore.detailPhoto

    const openLargeImage = () => {
        //navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontalPercent + '%',
        marginVertical: (marginVerticalPercent + 1) + '%'
    }}>
        {/*<Text>{JSON.stringify(photo)}</Text>*/}
        <TouchableOpacity activeOpacity={.5} onPress={() => openLargeImage()}>
            <Image
                style={{
                    width: photo.width,
                    height: photo.height
                }}
                source={{
                    uri: `https://picsum.photos/id/${photo.id}/${photo.width}/${photo.height}.webp`
                }}/>
        </TouchableOpacity>

    </View>
}

export default inject("commonStore")(DetailedImage)
