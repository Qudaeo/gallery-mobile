import axios from 'axios';
import {API_KEY, baseURL} from '../common/const';
import {DetailsType, PhotoType} from '../mobx/GalleryStore';

const instance = axios.create({
  baseURL,
  headers: {Authorization: `Client-ID ${API_KEY}`},
});

type GetImageResponseType = {
  headers: {
    'content-type': string;
  };
  data: ArrayBuffer;
};

export const galleryAPI = {
  async getGallery(currentPage: number, pageSize: number) {
    try {
      return instance.get<PhotoType[]>(
        `/photos?page=${currentPage}&per_page=${pageSize}`,
      );
    } catch (e) {
      alert(
        'Exception: galleryAPI: getGallery(currentPage, pageSize): ' +
          e.message,
      );
    }
  },

  async getSearchedGallery(
    searchText: string,
    currentPage: number,
    pageSize: number,
  ) {
    try {
      return instance.get<{results: PhotoType[]}>(
        `/search/photos?query=${searchText}&page=${currentPage}&per_page=${pageSize}`,
      );
    } catch (e) {
      alert(
        'Exception: galleryAPI: getSearchedGallery(searchText, currentPage, pageSize): ' +
          e.message,
      );
    }
  },

  async getImageByUrl(
    url: string,
    width?: number,
    height?: number,
  ): Promise<GetImageResponseType | undefined> {
    try {
      return instance.get(
        `${url}${width || height ? '?' : ''}${width ? `w=${width}` : ''}${
          height ? `&h=${height}` : ''
        }`,
        {responseType: 'arraybuffer'},
      );
    } catch (e) {
      alert(
        'Exception: galleryAPI: getImageByUrl(url, width, height): ' +
          e.message,
      );
    }
  },

  async getPhotoDetail(id: string) {
    try {
      return instance.get<DetailsType>(`/photos/${id}`);
    } catch (e) {
      alert('Exception: galleryAPI: getPhotoDetail(id): ' + e.message);
    }
  },
};
