import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import GalleryStore from '../../mobx/GalleryStore';
import {PhotoType} from '../../types/photo';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../common/colors';

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

  const openDetailedImage = useCallback(async () => {
    await galleryStore?.getDetailPhoto(id);
    if (galleryStore?.detailPhoto[id]) {
      navigation.navigate('DetailedImageScreen');
    }
  }, [galleryStore, id, navigation]);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={openDetailedImage}>
      <Image style={imageDimensions} source={{uri: photo.urls.regular}} />
      <Text
        style={[
          styles.copyrightText,
          {
            fontSize: Math.round(12 / (galleryStore?.appColumnCount || 1)),
            bottom: Math.round(5 / (galleryStore?.appColumnCount || 1)),
            right: Math.round(10 / (galleryStore?.appColumnCount || 1)),
          },
        ]}>{`Photo by ${photo.user.name}`}</Text>
    </TouchableOpacity>
  );
};

export default inject('galleryStore')(observer(GalleryItem));

const styles = StyleSheet.create({
  copyrightText: {
    position: 'absolute',
    color: colors.white_FFFFFF70,
  },
});
