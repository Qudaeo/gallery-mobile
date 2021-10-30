import React, {useCallback, useEffect} from "react";

import {FlatList, View, useWindowDimensions, Text} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import GalleryRow from "./GalleryRow";
import NetInfo from "@react-native-community/netinfo";

import SearchPhotoBar from "./SearchPhotoBar";
import ToggleColumnCount from "./ToggleColumnCount";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import GalleryScreenActivityIndicator from "../LoadingScreen/GalleryScreenActivityIndicator";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../App";
import {useNavigation} from "@react-navigation/native";

type authScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const GalleryScreen = () => {
    const navigation = useNavigation<authScreenProp>();

    const {galleryStore} = useStore()


    const imagesWidth = useWindowDimensions().width

    const handleViewableItemsChanged = useCallback(async ({viewableItems}) => {
        await galleryStore.setViewableItems(viewableItems)
    }, [])

    galleryStore.setIsAppInternetReachable(NetInfo.useNetInfo().isInternetReachable)

    useEffect(() => {
        galleryStore.initializeApp(imagesWidth)
    }, [])

    const galleryByColumn = galleryStore.gallery.reduce((result: any, el, index) => {
        switch (index % galleryStore.appColumnCount) {
            case 0: {
                return [...result, [el]]
            }
            default: {
                const lastRow = result.pop()
                lastRow.push(el)
                return [...result, lastRow]
            }
        }
    }, [])

    return (
        <View style={{flex: 1}}>
            {/*<Text>'debug info:'</Text>*/}
            {<Text>{'galleryStore.gallery.length=' + galleryStore.gallery.length}</Text>}
            {/*<Text>{'galleryStore.setIsShowActivityIndicator=' + galleryStore.isShowActivityIndicator}</Text>*/}
            {/*<Text>{'galleryStore.isAppSync=' + galleryStore.isAppSync}</Text>*/}
            {/*<Text>{'appImagesWidth=' + JSON.stringify(galleryStore.appImagesWidth)}</Text>*/}
            {<Text>{'base64 objects=' + Object.keys(galleryStore.base64Images).length}</Text>}
            {<Text>{'galleryStore.detailPhoto.length=' + Object.keys(galleryStore.detailPhoto).length}</Text>}
            {
                <Text>{'galleryStore.base64UsersAvatar.length=' + Object.keys(galleryStore.base64UsersAvatar).length}</Text>}
            {<Text>{'galleryStore.currentPage=' + galleryStore.currentPage}</Text>}
            {/*<Button title={'saveStateToStorage'} onPress={() => galleryStore.saveStateToStorage()}/>*/}
            {/*<Button title={'initializeApp()'} onPress={() =>galleryStore.initializeApp(imagesWidth)}/>*/}
            <SearchPhotoBar
                searchText={galleryStore.searchText}
                searchTextChange={galleryStore.searchTextChange}/>

            <ToggleColumnCount
                appColumnCount={galleryStore.appColumnCount}
                toggleColumnCount={galleryStore.toggleColumnCount}
                isAppInternetReachable={galleryStore.isAppInternetReachable}/>

            {(galleryByColumn.length === 0)
                ? <LoadingScreen messageText={galleryStore.messageText ? galleryStore.messageText : 'loadind...'}/>
                : (galleryByColumn) &&
                <>
                    {galleryStore.isShowActivityIndicator && <GalleryScreenActivityIndicator/>}
                    <FlatList
                        data={galleryByColumn}
                        renderItem={({item}) => <GalleryRow key={item.id} row={item} navigation={navigation}/>}
                        onEndReached={() => {
                            if (!galleryStore.isFetchingInProgress) {
                                galleryStore.getNextPage()
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        onViewableItemsChanged={handleViewableItemsChanged}
                    />
                </>}

        </View>
    )

}
export default observer(GalleryScreen)
