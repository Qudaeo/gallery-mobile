import {makeAutoObservable, runInAction} from 'mobx';
import {galleryAPI} from '../api/api';
import {apiPageSize} from '../common/const';
import {DetailsType, PhotoType} from '../types/photo';

export default class GalleryStore {
  gallery: PhotoType[] = [];
  setGallery = (photo: PhotoType) => {
    this.gallery.push(photo);
  };

  currentPage = 1;
  searchText = '';

  isFetchingInProgress = true;
  setIsFetchingInProgress = (isFetchingInProgress: boolean) => {
    this.isFetchingInProgress = isFetchingInProgress;
  };

  isAllPhotoFetch = false;

  messageText = '';
  setMessageText = (messageText: string) => {
    this.messageText = messageText;
  };

  isShowActivityIndicator = false;

  appColumnCount: 1 | 2 = 1;
  toggleColumnCount = () => {
    this.appColumnCount = this.appColumnCount === 1 ? 2 : 1;
  };

  isAppInternetReachable: boolean | null = true;
  setIsAppInternetReachable = (isReachable: boolean | null) => {
    this.isAppInternetReachable = isReachable;
  };

  selectedDetailPhotoId = '';

  detailPhoto: {[key: string]: DetailsType} = {};

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  searchTextChange(text: string) {
    if (this.searchText !== text) {
      this.searchText = text;
      this.setMessageText('loading photos...');
      this.isAllPhotoFetch = false;
      this.currentPage = 1;
      this.gallery = [];
      this.getCurrentPage();
    }
  }

  getResponseData = async () => {
    try {
      if (this.searchText !== '') {
        const response = await galleryAPI.getSearchedGallery(
          this.searchText,
          this.currentPage,
          apiPageSize,
        );

        return response?.data.results;
      } else {
        const response = await galleryAPI.getGallery(
          this.currentPage,
          apiPageSize,
        );
        return response?.data;
      }
    } catch (e) {
      console.log('getResponseData', e);
    }
  };

  getCurrentPage = async () => {
    try {
      this.setIsFetchingInProgress(true);

      const pageResponseData = await this.getResponseData();

      if (!pageResponseData) {
        return;
      }

      if (pageResponseData.length < apiPageSize) {
        this.isAllPhotoFetch = true;
      }

      for (let photo of pageResponseData) {
        if (this.gallery.findIndex(p => p.id === photo.id) === -1) {
          this.setGallery(photo);
        }
      }
    } catch (e) {
      console.log('getCurrentPage', e);
    } finally {
      this.setIsFetchingInProgress(false);
    }
  };

  getNextPage = async () => {
    this.currentPage++;
    await this.getCurrentPage();
  };

  getDetailPhoto = async (id: string) => {
    if (!this.detailPhoto[id]) {
      try {
        runInAction(() => {
          this.isShowActivityIndicator = true;
        });

        const response = await galleryAPI.getPhotoDetail(id);

        const detailResponseData = response?.data;
        if (detailResponseData) {
          runInAction(() => {
            this.detailPhoto[id] = detailResponseData;
          });
        }
      } catch (e) {
        console.log('getDetailPhoto ', e);
      } finally {
        runInAction(() => {
          this.isShowActivityIndicator = false;
        });
      }
    }

    runInAction(() => {
      this.selectedDetailPhotoId = id;
    });
  };
}
