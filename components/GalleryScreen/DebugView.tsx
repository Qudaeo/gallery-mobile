import {Text} from "react-native";
import React from "react";
import {useStore} from "../../mobx/store";
import {observer} from "mobx-react";

const DebugView = () => {
    const {galleryStore} = useStore()

    return <>
        {/*<Text>{'galleryStore.gallery.length=' + galleryStore.gallery.length}</Text>*/}
        {/*<Text>{'galleryStore.setIsShowActivityIndicator=' + galleryStore.isShowActivityIndicator}</Text>*/}
        {/*<Text>{'galleryStore.isAppSync=' + galleryStore.isAppSync}</Text>*/}
        {/*<Text>{'appImagesWidth=' + JSON.stringify(galleryStore.appImagesWidth)}</Text>*/}
        {/*<Text>{'base64 objects=' + Object.keys(galleryStore.base64Images).length}</Text>*/}
        {/*<Text>{'galleryStore.detailPhoto.length=' + Object.keys(galleryStore.detailPhoto).length}</Text>*/}
        {/*<Text>{'galleryStore.base64UsersAvatar.length=' + Object.keys(galleryStore.base64UsersAvatar).length}</Text>*/}
        {/*<Text>{'galleryStore.currentPage=' + galleryStore.currentPage}</Text>*/}
        {/*<Button title={'saveStateToStorage'} onPress={() => galleryStore.saveStateToStorage()}/>*/}
        {/*<Button title={'initializeApp()'} onPress={() =>galleryStore.initializeApp(imagesWidth)}/>*/}
        </>
}

export default observer(DebugView)
