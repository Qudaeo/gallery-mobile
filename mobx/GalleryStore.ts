import {makeAutoObservable, runInAction} from 'mobx';
import {galleryAPI} from '../api/api';
import {apiPageSize} from '../common/const';
import {
  readFromStorage,
  writeToStorage,
  STORAGE_DETAILS,
  STORAGE_GALLERY,
} from '../storage/storageApi';
import {ViewToken} from 'react-native';
import {DetailsType, PhotoType} from '../types/photo';

export default class GalleryStore {
  gallery: PhotoType[] = []; // основной массив фотографий галереи
  currentPage = 1; // максимальная загрущенная страница через API
  searchText = '';

  isAppSync = false;
  isFetchingInProgress = true;
  isAllPhotoFetch = false;
  messageText = ''; // сообщение для окна LoadingScreen

  isShowActivityIndicator = false; // показывать индикатор загрузки?

  appColumnCount: 1 | 2 = 1; // количество колонок по умолчанию
  appImagesWidth = 0; // ширина загрущаемых картинок

  isAppInternetReachable: boolean | null = true; // доступен ли интернет

  viewableItems: ViewToken[] = []; // массив видимых элементов из FlatList основного скрина галерии

  selectedDetailPhotoId = '';

  detailPhoto: {[key: string]: DetailsType} = {}; // объект элементов вида {id: detailRequest}

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  searchTextChange(text: string) {
    if (this.searchText !== text && this.isAppSync) {
      runInAction(() => {
        this.searchText = text;
        if (this.isAppInternetReachable) {
          this.messageText = 'loading photos...';
          this.isAllPhotoFetch = false;
          this.currentPage = 1;
          this.gallery = [];
          this.getCurrentPage();
        }
      });
    }
  }

  async getResponseData() {
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
      console.log('Exception: getResponseData(): ' + e.message);
    }
  }

  async getCurrentPage() {
    if (!this.isAppInternetReachable) {
      runInAction(() => {
        this.messageText = 'no internet connection';
      });
      return;
    }

    try {
      runInAction(() => {
        this.isFetchingInProgress = true;
      });

      const pageResponseData = await this.getResponseData();

      if (!pageResponseData || pageResponseData.length < apiPageSize) {
        this.isAllPhotoFetch = true;
      }

      if (pageResponseData) {
        runInAction(() => {
          this.messageText = 'found ' + pageResponseData.length + ' photos';
        });

        for (let photo of pageResponseData) {
          if (this.gallery.findIndex(p => p.id === photo.id) === -1) {
            runInAction(() => {
              this.gallery.push(photo);
            });
          }
        }
      }
    } catch (e) {
      console.log(
        'Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' +
          e.message,
      );
    } finally {
      runInAction(() => {
        this.isFetchingInProgress = false;
      });
    }

    //await this.saveStateToStorage();
  }

  getNextPage() {
    if (this.isAppInternetReachable) {
      runInAction(() => {
        this.currentPage++;
        this.getCurrentPage();
      });
    }
  }

  async saveStateToStorage() {
    try {
      if (this.gallery) {
        const viewableItems = this.viewableItems
          .map(el => el.item)
          .map(el2 => el2[0]);
        const firstViewableId = viewableItems[0].id;
        const firstViewableIndex = this.gallery.findIndex(
          photo => photo.id === firstViewableId,
        );

        let minIndex;
        if (firstViewableIndex < 5) {
          minIndex = 0;
        } else if (this.gallery.length - firstViewableIndex < 5) {
          minIndex = Math.min(0, this.gallery.length - 10);
        } else {
          minIndex = firstViewableIndex - 5;
        }

        let gallerySave = this.gallery.slice(
          minIndex,
          Math.min(minIndex + 10, this.gallery.length),
        );
        const detailPhotoSave: {[key: string]: DetailsType} = {};

        await writeToStorage(STORAGE_GALLERY, gallerySave);
        await writeToStorage(STORAGE_DETAILS, detailPhotoSave);
      }
    } catch (e) {
      console.log('saveStateToStorage', e);
    }
  }

  async initializeApp(width: number) {
    if (!this.isAppSync) {
      runInAction(() => {
        this.isFetchingInProgress = true;
        this.appImagesWidth = width;
        this.messageText = 'read saved photos...';
      });

      try {
        const storedGallery: PhotoType[] = await readFromStorage(
          STORAGE_GALLERY,
        );

        if (this.isAppInternetReachable) {
          runInAction(() => {
            this.messageText = 'loading photos...';
          });

          await this.getCurrentPage();
        } else if (storedGallery && storedGallery.length > 0) {
          runInAction(() => {
            this.gallery = [];
            this.gallery.push(...storedGallery);
          });

          const detailsFromStorage: {[key: string]: DetailsType} =
            await readFromStorage(STORAGE_DETAILS);
          if (detailsFromStorage) {
            runInAction(() => {
              this.detailPhoto = detailsFromStorage;
            });
          }
        } else {
          runInAction(() => {
            this.messageText = 'no internet connection';
          });
        }
      } catch (e) {
        console.log('readFromStorage' + e);
      }

      runInAction(() => {
        this.isFetchingInProgress = false;
        this.isAppSync = true;
      });
    }
  }

  setIsAppInternetReachable(isReachable: boolean | null) {
    if (
      isReachable &&
      this.isAppInternetReachable &&
      this.isAppSync &&
      this.gallery.length === 0
    ) {
      runInAction(() => (this.isAppInternetReachable = isReachable));

      this.getCurrentPage();
    }

    runInAction(() => (this.isAppInternetReachable = isReachable));
  }

  async getDetailPhoto(id: string) {
    if (!this.detailPhoto[id]) {
      if (this.isAppInternetReachable) {
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

      await this.saveStateToStorage();
    }

    runInAction(() => {
      this.selectedDetailPhotoId = id;
    });
  }

  toggleColumnCount = () => {
    this.appColumnCount = this.appColumnCount === 1 ? 2 : 1;
  };
}
