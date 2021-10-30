import React from "react";

import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import ImageViewer from 'react-native-image-zoom-viewer';

const LargeImageScreen: React.FC = () => {
    const {galleryStore} = useStore()
    return <ImageViewer
        imageUrls={[{url: galleryStore.detailPhoto[galleryStore.selectedDetailPhotoId].urls.regular}]}
        renderIndicator={() => <></>}
    />
}

export default observer(LargeImageScreen)
