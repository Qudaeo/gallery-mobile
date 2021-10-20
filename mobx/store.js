import GalleryStore from "./GalleryStore";
import {createContext, useContext} from "react";
import CommonStore from "./CommonStore";

export const store = {
    commonStore: new CommonStore(),
    galleryStore: new GalleryStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}
