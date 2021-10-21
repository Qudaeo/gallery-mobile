import {runInAction, makeAutoObservable} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";

export default class GalleryStore {

    gallery = []
    currentPage = 0

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

    async _getGallery() {
        try {
            const getGalleryResponse = await galleryAPI.getGallery(this.currentPage, 5)

            runInAction(() => {
                this.gallery.push(...getGalleryResponse.data)
            })

            for (let photo of getGalleryResponse.data) {
                let imageDimensions = calcImageDimensions(this.appImagesWidth, photo.height / photo.width)

                const getImageResponse = await galleryAPI.getImage(photo.id, imageDimensions.width, imageDimensions.height)

                runInAction(() => {
                    this.base64Images[photo.id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
                })
            }

        } catch (error) {
            alert(error.message)
        }

    }

    async getNextPage() {
        this.currentPage++
        await this._getGallery()
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
}
