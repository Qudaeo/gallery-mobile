import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {actionsPictures} from '../../common/const';

type IProps = {
  index: number;
};

const PhotoAction: React.FC<IProps> = ({index}) => (
  <TouchableOpacity activeOpacity={0.5}>
    <Image
      style={{
        width: 30,
        height: 30,
        marginLeft: 15,
      }}
      source={actionsPictures[index] as ImageSourcePropType}
    />
  </TouchableOpacity>
);

export default PhotoAction;
