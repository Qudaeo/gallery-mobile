import React, {useEffect} from "react";

import {FlatList, Text, useWindowDimensions, View} from "react-native";
import GalleryItem from "./GalleryItem";
import {observer} from "mobx-react";
import {useStore} from "../mobx/store";

const Gallery = (props) => {

    const {galleryStore} = useStore()

    const imagesWidth = Math.max(useWindowDimensions().width, useWindowDimensions().height)

    useEffect(() => {
        galleryStore.getNextPage()
    }, [])

    useEffect(() => {
        galleryStore.setAppImagesSize(imagesWidth)
    }, [imagesWidth])

    return <>
        {/*<Text>{`${imagesWidth}`}</Text>*/}
        <View style={{flex: 1}}>
            {(galleryStore.gallery.length === 0)
                ? <Text>loading...</Text>
                : (galleryStore.gallery) && <FlatList
                data={galleryStore.gallery}
                renderItem={({item}) => <GalleryItem key={item.id} image={item} navigation={props.navigation}/>}
                onEndReached={() => {
                    galleryStore.getNextPage()
                }}
                onEndReachedThreshold={0.5}
            />}
        </View>
    </>
}
export default observer(Gallery)
