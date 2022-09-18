import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import GalleryStore, {PhotoType} from '../../mobx/GalleryStore';
import {useNavigation} from '@react-navigation/native';

type IProps = {
  galleryStore?: GalleryStore;
  photo: PhotoType;
  imageDimensions: {
    width: number;
    height: number;
  };
};

export const GalleryItem: React.FC<IProps> = ({
  galleryStore,
  photo,
  imageDimensions,
}) => {
  const navigation = useNavigation<any>();
  const id = photo.id;

  const openDetailedImage = async () => {
    await galleryStore?.getDetailPhoto(id);
    if (galleryStore?.detailPhoto[id]) {
      navigation.navigate('DetailedImageScreen');
    } else {
      alert('Check internet connection!');
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => openDetailedImage()}>
      <Image
        style={{
          width: imageDimensions.width,
          height: imageDimensions.height,
          position: 'relative',
        }}
        source={{uri: galleryStore?.base64Images[id]}}
      />
      <Text
        style={{
          position: 'absolute',
          fontSize: Math.round(12 / (galleryStore?.appColumnCount || 1)),
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'right',
          bottom: Math.round(5 / (galleryStore?.appColumnCount || 1)),
          right: Math.round(10 / (galleryStore?.appColumnCount || 1)),
        }}>{`Photo by ${photo.user.name}`}</Text>
    </TouchableOpacity>
  );
};

export default inject('galleryStore')(observer(GalleryItem));
