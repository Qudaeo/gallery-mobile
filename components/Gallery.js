import React, {useEffect} from "react";

import {FlatList, Text, useWindowDimensions, View} from "react-native";
import GalleryImageItem from "./GalleryImageItem";
import {observer, inject} from "mobx-react";
import {useStore} from "../mobx/store";

const Gallery = (props) => {

    const { galleryStore } = useStore()

    const windowWidth = useWindowDimensions().width

    useEffect(() => {
        galleryStore.getNextPage()
        alert(galleryStore.detailId)
    }, [])

    useEffect(() => {
        galleryStore.setDetailId(10)
        galleryStore.setAppWindowWidth(windowWidth)

    }, [windowWidth])

    return <>
        {<Text>{`${props.galleryStore.detailId}`}</Text>}
    <View style={{flex: 1}}>
        {(props.galleryStore.gallery.length === 0)
            ? <Text>loading...</Text>
            : (props.galleryStore.gallery) &&  <FlatList
            data={props.galleryStore.gallery}
            renderItem={({item}) => <GalleryImageItem key={item.id} image={item} windowWidth={windowWidth}
                                                      navigation={props.navigation}/>}
            onEndReached={() => {
                galleryStore.getNextPage()
            }}
            onEndReachedThreshold={0.5}
        />}
    </View>
    </>
}
export default inject("galleryStore")(observer(Gallery))
