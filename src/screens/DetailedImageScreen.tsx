import React, {useCallback} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {marginHorizontal} from '../common/const';
import {calcImageDimensions} from '../common/helper';
import LocationIcon from '../assets/svg/location.svg';

import moment from 'moment';
import Tag from '../components/DetailedImageScreen/Tag';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import GalleryStore from '../mobx/GalleryStore';
import {colors} from '../common/colors';

type IProps = {
  galleryStore?: GalleryStore;
};

const DetailedImageScreen: React.FC<IProps> = ({galleryStore}) => {
  const navigation = useNavigation<any>();

  const photoGalleryInfo = galleryStore?.gallery.find(
    el => el.id === galleryStore.selectedDetailPhotoId,
  );

  let takenPhoto;
  let uploaded;

  if (photoGalleryInfo) {
    takenPhoto = moment(new Date(photoGalleryInfo.created_at)).format(
      'DD MMM YYYY',
    );
    uploaded = moment(new Date(photoGalleryInfo.updated_at)).fromNow();
  }

  const photo = galleryStore?.detailPhoto[galleryStore.selectedDetailPhotoId];

  const windowWidth = useWindowDimensions().width;
  const photoDimensions = calcImageDimensions(
    windowWidth,
    photo ? (windowWidth * photo.height) / photo.width : 1,
    1,
  );

  const openLargeImage = useCallback(() => {
    if (galleryStore?.isAppInternetReachable) {
      navigation.navigate('LargeImageScreen');
    }
  }, [galleryStore?.isAppInternetReachable, navigation]);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={colors.grey_f3f2f2}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginHorizontal: marginHorizontal}}>
        <TouchableOpacity activeOpacity={0.9} onPress={openLargeImage}>
          <Image
            style={photoDimensions}
            source={{uri: photo?.urls.regular || ''}}
          />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: photo
                ? galleryStore?.detailPhoto[photo?.id].urls.regular
                : '',
            }}
          />
          <View style={styles.photoDescriptionContainer}>
            <Text style={styles.photoDescriptionText}>
              {photo?.description || 'No description'}
            </Text>
            <Text style={styles.byUserNameText}>
              {'by ' + photo?.user.name}
            </Text>
          </View>
        </View>
        {photo?.user.location && (
          <View style={styles.block}>
            <LocationIcon width={14} height={14} fill={colors.blue_000099} />
            <Text style={styles.locationText}>{photo.user.location}</Text>
          </View>
        )}
        <View style={styles.block}>
          <Text style={styles.boldText}>
            {`Taken: ${takenPhoto}      Uploaded: ${uploaded}`}
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.boldText}>
            {`${photo?.likes} people liked this photo`}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          {photo?.tags.map(tag => (
            <Tag key={tag.title} tagTitle={tag.title} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default inject('galleryStore')(observer(DetailedImageScreen));

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 15,
  },
  photoDescriptionContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  photoDescriptionText: {
    fontSize: 20,
    fontWeight: '900',
    paddingRight: 105,
  },
  byUserNameText: {
    fontSize: 15,
    fontWeight: '500',
    paddingRight: 105,
  },
  block: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '700',
  },
  locationText: {
    marginLeft: 5,
    textDecorationStyle: 'dashed',
    textDecorationLine: 'underline',
    color: colors.blue_000099,
  },
  tagsContainer: {
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
