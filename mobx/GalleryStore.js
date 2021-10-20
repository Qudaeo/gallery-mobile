import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";

export default class GalleryStore {

    gallery = []
    currentPage = 0
    appImagesWidth = null
    detailPhoto = {
        id: null,
        width: null,
        height: null
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    _getGallery() {
        axios.get(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=5`)
            .then(response => {


                for (let photo of response.data) {

                    alert(this.appImagesWidth)


                    axios.get(`https://picsum.photos/id/${photo.id}/200/300.webp`)
                        .then(resp => {
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

    setAppImagesWidth(width) {
        runInAction(() =>
            this.appImagesWidth = width
        )
    }

}
