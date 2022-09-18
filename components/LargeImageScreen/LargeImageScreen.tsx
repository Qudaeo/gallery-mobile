import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Platform, StatusBar} from 'react-native';
import GalleryStore from '../../mobx/GalleryStore';
import SystemNavigationBar from 'react-native-system-navigation-bar';

type IProps = {
  galleryStore?: GalleryStore;
};

const LargeImageScreen: React.FC<IProps> = ({galleryStore}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor('#000000');

      return () => {
        SystemNavigationBar.setNavigationColor('#FFFFFF');
      };
    }
  }, []);

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
