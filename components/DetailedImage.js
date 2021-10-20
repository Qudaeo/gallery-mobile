import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {inject} from "mobx-react";
import {marginHorizontalPercent, marginVerticalPercent} from "../common/const";
import likePicture from '../images/DetailedImage/like.png'
import messagePicture from '../images/DetailedImage/message.png'
import addPicture from '../images/DetailedImage/add.png'
import add2Picture from '../images/DetailedImage/add2.png'
import etcPicture from '../images/DetailedImage/etc.png'


const DetailedImage = (props) => {

    const actionsPictures = [likePicture, messagePicture, addPicture, add2Picture, etcPicture]

    const photo = props.commonStore.detailPhoto

    const openLargeImage = () => {
        //navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontalPercent + '%',
        marginVertical: (marginVerticalPercent + 1) + '%'
    }}>
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
        <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            {actionsPictures.map((el, index) => <Image key={index}
                                                       style={{
                                                           width: 40,
                                                           height: 40,
                                                           marginLeft: 20
                                                       }}
                                                       source={el}/>)}

        </View>

    </View>
}

export default inject("commonStore")(DetailedImage)
