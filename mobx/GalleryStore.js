import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";

export default class GalleryStore {

    gallery = []
    currentPage = 0

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
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

}
