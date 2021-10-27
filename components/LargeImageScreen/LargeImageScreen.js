import React from "react";

import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import ImageViewer from 'react-native-image-zoom-viewer';

const LargeImageScreen = () => {
    const {galleryStore} = useStore()
    return <ImageViewer
        imageUrls={[{url: galleryStore.detailPhoto[galleryStore.selectedDetailPhotoId].urls.regular}]}
        renderIndicator={() => null}
    />
}

export default observer(LargeImageScreen)
