import {runInAction, makeAutoObservable} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class GalleryStore {

    gallery = []
    currentPage = 0

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

        const response = await this._getGallery(this.currentPage)

        runInAction(() => {
            this.gallery.push(...response)
        })

        for (let photo of response) {
            await this.getGalleryImage(photo.id, photo.width, photo.height)
        }

    }

    async setGalleryToStorage(page, item) {
        try {
            await AsyncStorage.setItem('@galleryPage' + page, item)
        } catch (error) {
            alert(error.message)
        }
    }

    async getGalleryFromStorage(page) {
        try {
            const storageValue = await AsyncStorage.getItem('@galleryPage' + page)
            return storageValue != null ? JSON.parse(storageValue) : null
        } catch (error) {
            alert(error.message)
        }
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
