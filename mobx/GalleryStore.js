import {runInAction, makeAutoObservable} from 'mobx';
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";
import {galleryAPI} from "../api/api";

export default class GalleryStore {

    gallery = []
    currentPage = 0

    appImagesWidth = null
    appImagesCropSize = null


    detailPhoto = {
        id: null,
        width: null,
        height: null
    }

    base64Images = {}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    _getGallery() {
        galleryAPI.getGallery(this.currentPage, 5)
            .then(response => {

                for (let photo of response.data) {
                    let imageDimensions = calcImageDimensions(this.appImagesWidth, photo.height / photo.width)

                    galleryAPI.getImage(photo.id, imageDimensions.width, imageDimensions.height)
                        .then(resp => {
                            runInAction(() => {

                                    this.base64Images[photo.id] = `data:${resp.headers['content-type'].toLowerCase()};base64,${encode(resp.data)}`
                                }
                            )

                        })
                        .catch((err) => {
                                alert(err.message);
                            }
                        )

                }

                runInAction(() => {
                    this.gallery.push(...response.data)
                })
            })
            .catch((error) => {
                    alert(error.message);
                }
            )
    }

    getNextPage() {
        runInAction(() => {
            this.currentPage++
            this._getGallery()
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
            }
        )
    }

}
