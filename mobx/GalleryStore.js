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

            const getGalleryResponse = await galleryAPI.getGallery(page, apiPageSize)
            return getGalleryResponse.data

        } catch (e) {
            alert(e.message)
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
        // const pageResponse = await this._getGallery(this.currentPage)//await cacheRequest(STORAGE_GALLERY_PAGE_, {id: this.currentPage})

        try {
            const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
            const pageResponseData = response.data

            runInAction(() => {
                this.response.push(...pageResponseData)
                this.gallery.push(...pageResponseData)
            })

            for (let photo of pageResponseData) {
                await this.getGalleryImage(photo.id, photo.width, photo.height)
            }
          //  return getGalleryResponse
        } catch (e) {
            alert(e.message)
        }







 //       await writeToStorage(STORAGE_GALLERY_PAGE_, this.currentPage, response)
 //       const value = await readFromStorage(STORAGE_GALLERY_PAGE_, this.currentPage)
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
