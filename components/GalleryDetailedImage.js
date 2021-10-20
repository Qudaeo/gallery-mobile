import React from "react";
import {Text, View} from "react-native";
import {inject} from "mobx-react";
import {useStore} from "../mobx/store";


const GalleryDetailedImage = () => {
    const { galleryStore } = useStore()

    return <View>
        <Text>{galleryStore.detailId}</Text>
        {/*
        <Image
            style={{
                width: calcImageWidth,
                height: calcImageHeight
            }}
            source={{
                uri: `https://picsum.photos/id/${galleryStore.detailId}/${calcImageWidth}/${calcImageHeight}.webp`
            }}/>
            */}
    </View>
}

export default inject("galleryStore")(GalleryDetailedImage)
