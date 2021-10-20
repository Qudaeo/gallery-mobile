import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";

export default class GalleryStore {
    gallery = []
    appWindowWidth = null
    currentPage = 0
    detailId = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setDetailId(id) {
        runInAction(() =>
            this.detailId = id
        )
    }

    _getGallery() {
        axios.get(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=5`)
            .then(response => {
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

    setAppWindowWidth(width) {
        runInAction(() =>
            this.appWindowWidth = width
        )
    }

}
