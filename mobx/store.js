import {runInAction, observable, action} from 'mobx';
import axios from "axios";

class Store {

    constructor() {
        this.gallery = observable.array([])
        this.getGallery = action(this.getGallery.bind(this))

        this.appWindowWidth = observable(null)
        this.setAppWindowWidth = action(this.setAppWindowWidth.bind(this))

        this.currentPage = observable(1)
        this.setNextCurrentPage = action(this.setNextCurrentPage.bind(this))
    }

    setAppWindowWidth(width) {
        runInAction(() =>
            this.appWindowWidth = width
        )
    }

    setNextCurrentPage() {
        runInAction(() =>
            this.currentPage++
        )
    }

    getGallery() {

        axios.get("https://picsum.photos/v2/list?page=2&limit=4")
            .then(response => {
                runInAction(() => {
                    this.gallery.replace(response.data)
                })
            })
            .catch((error) => {
                alert(error.message);
            })
    }

}

export default new Store();
