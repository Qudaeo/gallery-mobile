import React, {useEffect} from "react";

import {FlatList, Text, useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {observer, inject} from "mobx-react";
import {useStore} from "../mobx/store";

const Gallery = (props) => {

    const {galleryStore} = useStore()

    const imageWidth = (useWindowDimensions().width > useWindowDimensions().height)
        ? useWindowDimensions().width
        : useWindowDimensions().height

    useEffect(() => {
        galleryStore.getNextPage()
    }, [])

    useEffect(() => {
        galleryStore.setAppImagesWidth(imageWidth)
    }, [imageWidth])

    return <>
        {/*<Text>{`${props.galleryStore.detailId}`}</Text>*/}
        <View style={{flex: 1}}>
            {(props.galleryStore.gallery.length === 0)
                ? <Text>loading...</Text>
                : (props.galleryStore.gallery) && <FlatList
                data={props.galleryStore.gallery}
                renderItem={({item}) => <GalleryItem key={item.id} image={item} navigation={props.navigation}/>}
                onEndReached={() => {
                    galleryStore.getNextPage()
                }}
                onEndReachedThreshold={0.5}
            />}
        </View>
    </>
}
export default inject("galleryStore")(observer(Gallery))
