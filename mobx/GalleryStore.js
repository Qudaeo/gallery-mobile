import {makeAutoObservable, runInAction} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";
import {cacheRequest, readFromStorage, writeToStorage} from "../storage/storageApi";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_GALLERY_PAGE_ = 'STORAGE_GALLERY_PAGE_'
const STORAGE_BASE64_IMAGE_ = 'STORAGE_BASE64_IMAGE_'

export default class GalleryStore {

    gallery = []
    currentPage = 0

    response = []

    appColumnCount = 1
    appImagesWidth = null

    detailPhoto = {
        id: null,
        width: null,
        height: null
    }

    base64Images = {}

    isFetching: false

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    /*
    async writeToStorage(prefix, id, item) {
        try {
            await AsyncStorage.setItem(prefix + id, JSON.stringify(item))
        } catch (error) {
            alert(error.message)
        }
    }

    async readFromStorage(prefix, id) {
        try {
            const storedValue = await AsyncStorage.getItem(prefix + id)
            return storedValue ? JSON.parse(storedValue) : null
        } catch (error) {
            alert(error.message)
        }
    }
*/
    async getGalleryImage(id, width, height) {
        let imageDimensions = calcImageDimensions(this.appImagesWidth, height / width)

        const getImageResponse = await galleryAPI.getImage(id, imageDimensions.width, imageDimensions.height)

        runInAction(() => {
            this.base64Images[id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
        })
    }

    async _getGallery(page) {
        try {
            runInAction(
                () => this.isFetching = true
            )
            const getGalleryResponse = await galleryAPI.getGallery(page, apiPageSize)
            return getGalleryResponse.data

        } catch (error) {
            alert(error.message)
        } finally {
            runInAction(
                () => this.isFetching = false
            )
        }

    }



    async getNextPage() {
        this.currentPage++
        /*
                let pageResponse = await readFromStorage(STORAGE_GALLERY_PAGE_, this.currentPage)
                if (!pageResponse) {
                    pageResponse = await this._getGallery(this.currentPage)
                    await writeToStorage(STORAGE_GALLERY_PAGE_, this.currentPage, pageResponse)
                }
        */
        const pageResponse = await cacheRequest(STORAGE_GALLERY_PAGE_, {id: this.currentPage})
        alert(JSON.stringify(pageResponse))

        runInAction(() => {
            this.response.push(...pageResponse)
            this.gallery.push(...pageResponse)
        })


        for (let photo of pageResponse) {
            await this.getGalleryImage(photo.id, photo.width, photo.height)
        }


        await writeToStorage(STORAGE_GALLERY_PAGE_, this.currentPage, response)
        const value = await readFromStorage(STORAGE_GALLERY_PAGE_, this.currentPage)
        runInAction(() => {
            this.response = value
        })


    }


    setDetailPhoto(id, width, height) {
        runInAction(() =>
            this.detailPhoto = {id, width, height}
        )
    }

    setAppImagesSize(width) {
        runInAction(() => {
            this.appImagesWidth = width
        })
    }

    toggleColumnCount() {
        this.appColumnCount = (this.appColumnCount === 1) ? 2 : 1
    }
}
