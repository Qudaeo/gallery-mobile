import React from "react";
import {Image, TouchableOpacity} from "react-native";
import {actionsPictures} from "../../common/const";

const PhotoAction = ({index}) => <TouchableOpacity activeOpacity={.5} /*onPress={() => {}}*/>

    <Image
        style={{
            width: 30,
            height: 30,
            marginLeft: 15
        }}
        source={actionsPictures[index]}/>

</TouchableOpacity>


export default PhotoAction
