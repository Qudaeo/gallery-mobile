import GalleryStore from './GalleryStore';
import {createContext, useContext} from 'react';

export const store = {
  galleryStore: new GalleryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
