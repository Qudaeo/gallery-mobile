import React from "react";
import { Image,  View} from "react-native";

export const GalleryImageItem = ({imageId}) => {
    return <View>
        <Image
            style={{width: 411, height: 300}}
            source={{
                uri: 'https://picsum.photos/id/' + imageId + '/888/500.webp'
            }}/>
    </View>
}

export default GalleryImageItem

