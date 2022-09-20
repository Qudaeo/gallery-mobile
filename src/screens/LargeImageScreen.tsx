import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Platform, StatusBar} from 'react-native';
import GalleryStore from '../mobx/GalleryStore';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {colors} from '../common/colors';

type IProps = {
  galleryStore?: GalleryStore;
};

const LargeImageScreen: React.FC<IProps> = ({galleryStore}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor(colors.black_000000);

      return () => {
        SystemNavigationBar.setNavigationColor(colors.grey_f3f2f2);
      };
    }
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={colors.black_000000}
        barStyle={'light-content'}
      />
      <ImageViewer
        imageUrls={[
          {
            url:
              galleryStore?.detailPhoto[galleryStore.selectedDetailPhotoId].urls
                .raw || '',
          },
        ]}
        renderIndicator={() => <></>}
      />
    </>
  );
};

export default inject('galleryStore')(observer(LargeImageScreen));
