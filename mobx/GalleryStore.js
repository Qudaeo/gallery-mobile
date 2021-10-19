import {runInAction, observable, action, makeAutoObservable} from 'mobx';
import axios from "axios";

export default class GalleryStore {
 /*
    gallery = observable.array([])
    appWindowWidth = observable(null)
    currentPage = observable(0)


    detailId = observable(0)
*/

    constructor() {
   //     makeAutoObservable(this)

        this.gallery = observable.array([])
        this._getGallery = action(this._getGallery.bind(this))

        this.appWindowWidth = observable(null)
        this.setAppWindowWidth = action(this.setAppWindowWidth.bind(this))

        this.currentPage = observable(0)
        this.getNextPage = action(this.getNextPage.bind(this))

        this.detailId = observable(0)
        this.setDetailId = action(this.setDetailId.bind(this))
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
