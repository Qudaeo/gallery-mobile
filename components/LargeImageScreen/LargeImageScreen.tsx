import React from 'react';

import {inject, observer} from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StatusBar} from 'react-native';
import GalleryStore from '../../mobx/GalleryStore';

type IProps = {
  galleryStore?: GalleryStore;
};

const LargeImageScreen: React.FC<IProps> = ({galleryStore}) => {
  return (
    <>
      <StatusBar backgroundColor={'#000000'} barStyle={'light-content'} />
      <ImageViewer
        imageUrls={[
          {
            url:
              galleryStore?.detailPhoto[galleryStore.selectedDetailPhotoId].urls
                .regular || '',
          },
        ]}
        renderIndicator={() => <></>}
      />
    </>
  );
};

export default inject('galleryStore')(observer(LargeImageScreen));
