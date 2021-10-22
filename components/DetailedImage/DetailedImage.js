import React from "react";
import {Image, ScrollView, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {observer} from "mobx-react";
import {actionsPictures, marginHorizontal, marginVertical} from "../../common/const"
import {calcImageDimensions} from "../../common/funcions"
import {useStore} from "../../mobx/store";
import PhotoAction from "./PhotoAction";

const DetailedImage = () => {
    const {galleryStore} = useStore()

    const photo = galleryStore.detailPhoto

    /*
    useEffect(() => {
        galleryStore.getGalleryImage(photo.id, photo.width, photo.height)
    }, [photo.id])
*/

    const photoDimensions = calcImageDimensions(useWindowDimensions().width, photo.height / photo.width, 1)

    const openLargeImage = () => {
        //navigation.navigate('DetailedImage')
    };

    return <ScrollView style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical
    }}>
        <TouchableOpacity activeOpacity={.5} onPress={() => openLargeImage()}>
            <Image
                style={{
                    width: photoDimensions.width,
                    height: photoDimensions.height
                }}
                source={{uri: galleryStore.base64Images[photo.id]}}
            />
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            {actionsPictures.map((el, index) => <PhotoAction key={index} index={index}/>)}
        </View>

    </ScrollView>
}

export default observer(DetailedImage)
