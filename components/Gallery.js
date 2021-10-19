import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {FlatList, Text, useWindowDimensions, View} from "react-native";
import GalleryImageItem from "./GalleryImageItem";

const Gallery = ({gallery, setAppWindowWidth, getNextPage, navigation}) => {

    const windowWidth = useWindowDimensions().width

    useEffect(() => {
        getNextPage()
    }, [])

    useEffect(() => {
        setAppWindowWidth(windowWidth)
    }, [windowWidth])

    return <View style={{flex: 1}}>
        {(gallery.length === 0)
            ? <Text>loading...</Text>
            : (gallery) && <FlatList
            data={gallery}
            renderItem={({item}) => <GalleryImageItem key={item.id} image={item} windowWidth={windowWidth}
                                                      navigation={navigation}/>}
            onEndReached={() => {
                getNextPage()
            }}
            onEndReachedThreshold={0.5}
        />}
    </View>
}

export default inject("gallery", "setAppWindowWidth", "getNextPage")(observer(Gallery))
