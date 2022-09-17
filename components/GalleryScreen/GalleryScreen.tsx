import React, {useCallback, useEffect} from 'react';

import {
  FlatList,
  View,
  useWindowDimensions,
  ViewToken,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import {useStore} from '../../mobx/store';
import GalleryRow from './GalleryRow';
import NetInfo from '@react-native-community/netinfo';

import SearchPhotoBar from './SearchPhotoBar';
import ToggleColumnCount from './ToggleColumnCount';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import GalleryScreenActivityIndicator from '../LoadingScreen/GalleryScreenActivityIndicator';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const GalleryScreen = () => {
  const {galleryStore} = useStore();

  const imagesWidth = useWindowDimensions().width;

  const handleViewableItemsChanged = useCallback(
    async (info: {viewableItems: ViewToken[]}) => {
      await galleryStore.setViewableItems(info.viewableItems);
    },
    [galleryStore],
  );

  galleryStore.setIsAppInternetReachable(
    NetInfo.useNetInfo().isInternetReachable,
  );

  useEffect(() => {
    galleryStore.initializeApp(imagesWidth);
  }, [galleryStore, imagesWidth]);

  const galleryByColumn = galleryStore.gallery.reduce(
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
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <View
        style={{
          position: 'absolute',
          top: getStatusBarHeight() + 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          zIndex: 100,
        }}>
        <SearchPhotoBar
          searchText={galleryStore.searchText}
          searchTextChange={galleryStore.searchTextChange}
        />
        <ToggleColumnCount
          appColumnCount={galleryStore.appColumnCount}
          toggleColumnCount={galleryStore.toggleColumnCount}
          isAppInternetReachable={galleryStore.isAppInternetReachable}
          isFetchingInProgress={galleryStore.isFetchingInProgress}
        />
      </View>
      {galleryByColumn.length === 0 ? (
        <LoadingScreen
          messageText={
            galleryStore.messageText ? galleryStore.messageText : 'loading...'
          }
        />
      ) : (
        galleryByColumn && (
          <>
            {galleryStore.isShowActivityIndicator && (
              <GalleryScreenActivityIndicator />
            )}
            <FlatList
              data={galleryByColumn}
              renderItem={({item}) => <GalleryRow key={item.id} row={item} />}
              onEndReached={() => {
                if (
                  !galleryStore.isFetchingInProgress &&
                  galleryStore.isAppSync &&
                  !galleryStore.isAllPhotoFetch
                ) {
                  galleryStore.getNextPage();
                }
              }}
              onEndReachedThreshold={0.5}
              onViewableItemsChanged={handleViewableItemsChanged}
            />
          </>
        )
      )}
    </View>
  );
};
export default observer(GalleryScreen);
