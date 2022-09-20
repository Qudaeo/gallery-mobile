import React, {useCallback, useEffect} from 'react';

import {FlatList, View, StatusBar, Platform, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import GalleryRow from '../components/GalleryScreen/GalleryRow';
import NetInfo from '@react-native-community/netinfo';

import SearchPhotoBar from '../components/GalleryScreen/SearchPhotoBar';
import ToggleColumnCount from '../components/GalleryScreen/ToggleColumnCount';
import TextMessage from '../components/LoadingScreen/TextMessage';
import GalleryActivityIndicator from '../components/LoadingScreen/GalleryActivityIndicator';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import GalleryStore from '../mobx/GalleryStore';
import {PhotoType} from '../types/photo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonStyles} from '../common/styles';
import {colors} from '../common/colors';

type IProps = {
  galleryStore?: GalleryStore;
};

const GalleryScreen: React.FC<IProps> = ({galleryStore}) => {
  const renderItem = useCallback(
    ({item}: {item: PhotoType[]}) => <GalleryRow images={item} />,
    [],
  );

  const isInternetReachable = NetInfo.useNetInfo().isInternetReachable;

  useEffect(() => {
    galleryStore?.setIsAppInternetReachable(isInternetReachable);
  }, [galleryStore, isInternetReachable]);

  useEffect(() => {
    galleryStore?.getCurrentPage();
  }, [galleryStore]);

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
    <SafeAreaView style={commonStyles.flex1}>
      <StatusBar
        backgroundColor={colors.grey_f3f2f2}
        barStyle={'dark-content'}
      />
      {galleryByColumn.length === 0 ? (
        <TextMessage messageText={galleryStore?.messageText || 'loading...'} />
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
                !galleryStore?.isAllPhotoFetch
              ) {
                galleryStore?.getNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <>
                {galleryStore?.isFetchingInProgress &&
                  galleryStore?.gallery.length > 0 && (
                    <View style={{height: 100}}>
                      <GalleryActivityIndicator />
                    </View>
                  )}
              </>
            }
          />
        )
      )}
      <View
        style={[
          styles.menuContainer,
          {top: (Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 15},
        ]}>
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
      {galleryStore?.isShowActivityIndicator && <GalleryActivityIndicator />}
    </SafeAreaView>
  );
};

export default inject('galleryStore')(observer(GalleryScreen));

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
