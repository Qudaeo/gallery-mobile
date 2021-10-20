import React from "react";
import {Text, View} from "react-native";
import {inject} from "mobx-react";


const GalleryDetailedImage = (props) => {
 //   const { galleryStore } = useStore()

    return <View>
        <Text>{props.commonStore.detailId}</Text>
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

export default inject("commonStore")(GalleryDetailedImage)
