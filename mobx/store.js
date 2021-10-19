import {runInAction, observable, action} from 'mobx';
import axios from "axios";

class Store {

    constructor() {
        this.gallery = observable.array([])
        this._getGallery = action(this._getGallery.bind(this))

        this.appWindowWidth = observable(null)
        this.setAppWindowWidth = action(this.setAppWindowWidth.bind(this))

        this.currentPage = observable(0)
        this.getNextPage = action(this.getNextPage.bind(this))
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
            })
    }

    setAppWindowWidth(width) {
        runInAction(() =>
            this.appWindowWidth = width
        )
    }

    getNextPage() {
        runInAction(() => {
                this.currentPage++
                this._getGallery()
            }
        )
    }

}

export default new Store();
