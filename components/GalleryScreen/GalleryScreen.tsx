import React, {useCallback, useEffect} from 'react';

import {
  FlatList,
  View,
  ViewToken,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import GalleryRow from './GalleryRow';
import NetInfo from '@react-native-community/netinfo';

import SearchPhotoBar from './SearchPhotoBar';
import ToggleColumnCount from './ToggleColumnCount';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import GalleryActivityIndicator from '../LoadingScreen/GalleryActivityIndicator';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import GalleryStore, {PhotoType} from '../../mobx/GalleryStore';
import {SafeAreaView} from 'react-native-safe-area-context';

type IProps = {
  galleryStore?: GalleryStore;
};

const GalleryScreen: React.FC<IProps> = ({galleryStore}) => {
  const imagesWidth = Dimensions.get('window').width;

  const handleViewableItemsChanged = useCallback(
    async (info: {viewableItems: ViewToken[]}) => {
      await galleryStore?.setViewableItems(info.viewableItems);
    },
    [galleryStore],
  );

  const renderItem = useCallback(
    ({item}: {item: PhotoType[]}) => <GalleryRow row={item} />,
    [],
  );

  const isInternetReachable = NetInfo.useNetInfo().isInternetReachable;

  useEffect(() => {
    galleryStore?.setIsAppInternetReachable(isInternetReachable);
  }, [galleryStore, isInternetReachable]);

  useEffect(() => {
    galleryStore?.initializeApp(imagesWidth);
  }, [galleryStore, imagesWidth]);

  const galleryByColumn = galleryStore?.gallery.reduce(
    (result: any, el, index) => {
      switch (index % galleryStore.appColumnCount) {
        case 0: {
          return [...result, [el]];
        }
        default: {
          const lastRow = result.pop();
          lastRow.push(el);
          return [...result, lastRow];
        }
      }
    },
    [],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <View
        style={{
          position: 'absolute',
          top: (Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          zIndex: 100,
        }}>
        <SearchPhotoBar
          searchText={galleryStore?.searchText || ''}
          searchTextChange={galleryStore?.searchTextChange}
        />
        <ToggleColumnCount
          appColumnCount={galleryStore?.appColumnCount || 1}
          toggleColumnCount={galleryStore?.toggleColumnCount}
          isAppInternetReachable={galleryStore?.isAppInternetReachable || true}
          isFetchingInProgress={galleryStore?.isFetchingInProgress || false}
        />
      </View>
      {galleryByColumn.length === 0 ? (
        <LoadingScreen
          messageText={
            galleryStore?.messageText ? galleryStore.messageText : 'loading...'
          }
        />
      ) : (
        galleryByColumn && (
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={galleryByColumn}
            renderItem={renderItem}
            onEndReached={() => {
              if (
                !galleryStore?.isFetchingInProgress &&
                galleryStore?.isAppSync &&
                !galleryStore?.isAllPhotoFetch
              ) {
                galleryStore?.getNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            onViewableItemsChanged={handleViewableItemsChanged}
          />
        )
      )}
      {galleryStore?.isShowActivityIndicator && <GalleryActivityIndicator />}
    </SafeAreaView>
  );
};

export default inject('galleryStore')(observer(GalleryScreen));
