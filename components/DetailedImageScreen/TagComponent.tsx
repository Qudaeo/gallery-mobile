import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import GalleryStore from '../../mobx/GalleryStore';

type IProps = {
  galleryStore?: GalleryStore;
  tagTitle: string;
};

const TagComponent: React.FC<IProps> = ({galleryStore, tagTitle}) => {
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
    <TouchableOpacity activeOpacity={0.5} onPress={() => openTagSearch()}>
      <View
        style={{
          height: 30,
          borderWidth: 1,
          borderRadius: 8,
          margin: 5,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        }}>
        <Text style={{marginHorizontal: 10}}>{tagTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default inject('galleryStore')(observer(TagComponent));
