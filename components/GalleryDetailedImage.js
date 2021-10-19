import React from "react";
import {inject, observer} from "mobx-react";
import {Text, View} from "react-native";


const GalleryDetailedImage = ({detailPhotoId}) => {

    return <View>
        <Text>{detailPhotoId}</Text>

    </View>
}

export default inject("detailPhotoId")(observer(GalleryDetailedImage))
