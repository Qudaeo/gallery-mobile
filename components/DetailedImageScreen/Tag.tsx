import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import GalleryStore from '../../mobx/GalleryStore';
import {commonStyles} from '../../common/styles';
import {colors} from '../../common/colors';

type IProps = {
  galleryStore?: GalleryStore;
  tagTitle: string;
};

const Tag: React.FC<IProps> = ({galleryStore, tagTitle}) => {
  const navigation = useNavigation<any>();

  const openTagSearch = () => {
    if (galleryStore?.isAppInternetReachable) {
      galleryStore.searchTextChange(tagTitle);
      navigation.navigate('GalleryScreen');
    } else {
      alert('Check internet connection!');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[commonStyles.container, styles.tag]}
      onPress={openTagSearch}>
      <Text style={styles.tagText}>{tagTitle}</Text>
    </TouchableOpacity>
  );
};

export default inject('galleryStore')(observer(Tag));

const styles = StyleSheet.create({
  tag: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
  },
  tagText: {
    marginHorizontal: 10,
    color: colors.black_4a4443,
  },
});
