import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import GalleryItem from './GalleryItem';
import {marginHorizontal, marginBottom} from '../../common/const';
import {calcImageDimensions} from '../../common/helper';
import {PhotoType} from '../../mobx/GalleryStore';

type IProps = {
  images: PhotoType[];
};

export const GalleryRow: React.FC<IProps> = ({images}) => {
  const windowWidth = useWindowDimensions().width;

  const imageDimensions = images.map(image =>
    calcImageDimensions(
      windowWidth,
      (windowWidth * image.height) / image.width,
      images.length,
    ),
  );

  const normalizedHeight = 10000;
  const normalizedDimensions = imageDimensions.map(el => ({
    width: (el.width * normalizedHeight) / el.height,
    height: normalizedHeight,
  }));

  const imagesWidth = imageDimensions.reduce((sum, el) => sum + el.width, 0);
  const imagesHeight = normalizedDimensions.reduce(
    (sum, el) => sum + el.width,
    0,
  );
  const ratio = imagesWidth / imagesHeight;

  const normalizedImageDimensions = normalizedDimensions.map(el => ({
    width: el.width * ratio,
    height: el.height * ratio,
  }));

  return (
    <View style={styles.container}>
      {images.map((el, index) => (
        <View key={el.id} style={{marginLeft: marginHorizontal}}>
          <GalleryItem
            photo={el}
            imageDimensions={normalizedImageDimensions[index]}
          />
        </View>
      ))}
    </View>
  );
};

export default GalleryRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom,
  },
});
