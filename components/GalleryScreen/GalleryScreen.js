import React, {useCallback, useEffect} from "react";
//import useFocusEffect from '@react-navigation/native'

import {
    FlatList,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    StyleSheet
} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import GalleryRow from "./GalleryRow";
import BackHandler from "react-native/Libraries/Utilities/BackHandler";

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 100,

        borderWidth: 1,
        borderColor: 'rgba(255,255,0,0.5)',
        backgroundColor: 'rgba(153, 255, 153, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});

const GalleryScreen = (props) => {

    const {galleryStore} = useStore()

    const handleViewableItemsChanged = useCallback(({viewableItems}) => {
        galleryStore.setViewableItems(viewableItems)
    }, [])

    useEffect(() => {
        galleryStore.initializeApp()
        galleryStore.setAppImagesSize(imagesWidth)
        galleryStore.getNextPage()
        return () => {
            galleryStore.saveStateToStorage()
        }
    }, [])

    React.useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', galleryStore.saveStateToStorage)

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", galleryStore.saveStateToStorage)
    }, [props.navigation]);

    /*
        const handleBlur = useCallback(() => {
            galleryStore.saveStateToStorage()
        }, [])
    */
    /*
    props.navigation.addListener('willBlur', async () => {
        galleryStore.saveStateToStorage()
    });
*/
    const imagesWidth = Math.max(useWindowDimensions().width, useWindowDimensions().height)

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


    return (
        <View style={{flex: 1}}>
            {/*<Text>{JSON.stringify(galleryStore.response)}</Text>*/}
            {<Text>{JSON.stringify(galleryStore.viewableItems)}</Text>}
            {<Text>{JSON.stringify(galleryStore.stateToStorage)}</Text>}
            <View style={styles.menuButton}>
                <TouchableOpacity onPress={() => galleryStore.toggleColumnCount()}>
                    <Text style={{
                        fontSize: 25,
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
