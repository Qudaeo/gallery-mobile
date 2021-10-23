import {makeAutoObservable, runInAction} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";

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

    async getNextPage() {
        runInAction(() => {
            this.currentPage++
        })

        const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
        const pageResponseData = response.data

        runInAction(() => {
            this.response.push(...pageResponseData)
            this.gallery.push(...pageResponseData)
        })

        for (let photo of pageResponseData) {
            await this.getGalleryImage(photo.id, photo.width, photo.height)
        }


    }


    setDetailPhoto(id, width, height) {
        this.detailPhoto = {id, width, height}
    }

    setAppImagesSize(width) {
        this.appImagesWidth = width
    }

    toggleColumnCount() {
        this.appColumnCount = (this.appColumnCount === 1) ? 2 : 1
    }
}
