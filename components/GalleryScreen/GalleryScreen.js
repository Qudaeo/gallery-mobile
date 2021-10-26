import React, {useCallback, useEffect} from "react";

import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, useWindowDimensions
} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import GalleryRow from "./GalleryRow";
import NetInfo from "@react-native-community/netinfo";

const GalleryScreen = (props) => {

    const {galleryStore} = useStore()
    const imagesWidth = useWindowDimensions().width

    const handleViewableItemsChanged = useCallback(async ({viewableItems}) => {
        await galleryStore.setViewableItems(viewableItems)
    }, [])

    galleryStore.setIsAppInternetReachable(NetInfo.useNetInfo().isInternetReachable)

    useEffect(() => {
        galleryStore.initializeApp(imagesWidth)

        return () => {
            galleryStore.saveStateToStorage()
        }
    }, [])

    const galleryByColumn = galleryStore.gallery.reduce((result, el, index) => {
        switch (index % galleryStore.appColumnCount) {
            case 0: {
                return [...result, [el]]
            }
            default: {
                let lastRow = result.pop()
                lastRow.push(el)
                return [...result, lastRow]
            }
        }
    }, [])

    const styles = StyleSheet.create({
        menuButton: {
            position: 'absolute',
            right: 15,
            top: 10,
            zIndex: 100,

            borderWidth: 1,
            borderColor: 'rgba(255,255,0,0.5)',
            backgroundColor: galleryStore.isAppInternetReachable
                ?"rgba(153, 255, 153, 0.7)"
                :"rgba(255, 26, 26, 0.7)",
            alignItems: 'center',
            justifyContent: 'center',
            width: 53,
            height: 53,
            borderRadius: 50,
        }
    });

    return (
        <View style={{flex: 1}}>

            {/*<Text>{'bebug info:'}</Text>*/}
            {<Text>{'galleryStore.isAppSync=' + galleryStore.isAppSync}</Text>}
            {/*<Text>{'appImagesWidth=' + JSON.stringify(galleryStore.appImagesWidth)}</Text>*/}
            {<Text>{'base64 objects=' + Object.keys(galleryStore.base64Images).length}</Text>}
            {<Text>{'galleryStore.currentPage=' + galleryStore.currentPage}</Text>}
            {/*<Text>{'galleryStore.startIndex=' + JSON.stringify(galleryStore.startIndex)}</Text>*/}
            {/*<Button title={'saveStateToStorage'} onPress={galleryStore.saveStateToStorage}/>*/}
            {/*<Button title={'initializeApp()'} onPress={galleryStore.initializeApp}/>*/}


            <View style={styles.menuButton}>
                <TouchableOpacity onPress={() => galleryStore.toggleColumnCount()}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: "bold"
                    }}
                    >{galleryStore.appColumnCount}</Text>
                </TouchableOpacity>
            </View>

            {(galleryByColumn.length === 0)
                ? <Text>loading...</Text>
                : (galleryByColumn) &&
                <FlatList
                    data={galleryByColumn}
                    renderItem={({item}) => <GalleryRow key={item.id} row={item} navigation={props.navigation}/>}
                    onEndReached={() => {
                        galleryStore.getNextPage()
                    }}
                    onEndReachedThreshold={0.5}
                    onViewableItemsChanged={handleViewableItemsChanged}
                />}


        </View>
    )

}
export default observer(GalleryScreen)
