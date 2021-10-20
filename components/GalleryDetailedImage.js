import React from "react";
import {Text, View} from "react-native";
import {inject} from "mobx-react";
import {useStore} from "../mobx/store";


const GalleryDetailedImage = () => {
    const { galleryStore } = useStore()

    return <View>
        <Text>{galleryStore.detailId}</Text>
    </View>
}

export default inject("galleryStore")(GalleryDetailedImage)
