import React, {useEffect} from "react";

import {
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    StyleSheet
} from "react-native";
import GalleryItem from "./GalleryItem";
import {observer} from "mobx-react";
import {useStore} from "../mobx/store";

const styles = StyleSheet.create({
    backgroundImage: {

        resizeMode: "cover",
        position: 'absolute',
        right: 10,
        top: 10,
        //       width: 50,
        //      height: 50,
        zIndex: 100
    },

    topBar: {
        height: 50,
        // color : 'red',
        flex: 1,
        alignItems: 'stretch'
    },

    profileButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(51, 255, 51, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,

    },
});

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


        <View style={{
            flex: 1,
        }}>

            <ImageBackground

                style={styles.backgroundImage}>

                <View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => galleryStore.toggleColumnCount()}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: "bold"
                        }}
                        >{galleryStore.appColumnCount}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* </View>*/}


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
