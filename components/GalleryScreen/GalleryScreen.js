import React, {useEffect} from "react";

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

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 100,

        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
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

    const imagesWidth = Math.max(useWindowDimensions().width, useWindowDimensions().height)

    useEffect(() => {
        galleryStore.getNextPage()
        galleryStore.setAppImagesSize(imagesWidth)
    }, [])

    /*
    useEffect(() => {
        galleryStore.setAppImagesSize(imagesWidth)
        alert('2 setAppImagesSize')
    }, [imagesWidth])
*/

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
                    on
                />}


        </View>
    )

}
export default observer(GalleryScreen)
