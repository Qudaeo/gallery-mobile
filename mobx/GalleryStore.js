import {runInAction, makeAutoObservable} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";

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

    async _getGallery() {
        try {
            runInAction(
                () => this.isFetching = true
            )

            const getGalleryResponse = await galleryAPI.getGallery(this.currentPage, apiPageSize)

            runInAction(() => {
                this.gallery.push(...getGalleryResponse.data)
            })

            for (let photo of getGalleryResponse.data) {
                await this.getGalleryImage(photo.id, photo.width, photo.height)
            }

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

    toggleColumnCount() {
        this.appColumnCount = (this.appColumnCount === 1) ? 2 : 1
    }
}
