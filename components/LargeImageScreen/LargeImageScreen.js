import React from "react";

import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import ImageViewer from 'react-native-image-zoom-viewer';

const LargeImageScreen = () => {
    const {galleryStore} = useStore()

    return <ImageViewer
        imageUrls={[{url: galleryStore.detailPhoto.urls.raw}]}
        renderIndicator = {() => null}
    />
 }
 //.urls.raw
//       backgroundColor = "white"
//       imageUrls={[{url: galleryStore.base64Images[galleryStore.detailPhoto.id]}]}


export default observer(LargeImageScreen)
