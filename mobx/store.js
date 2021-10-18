import {runInAction, observable, action} from 'mobx';
import axios from "axios";

class Store {

    constructor() {
        this.gallery = observable.array([]);
        this.getGallery = action(this.getGallery.bind(this));
    }

    getGallery() {

        axios.get("https://picsum.photos/v2/list?page=2&limit=100")
            .then(response => {
                runInAction(() =>
                    this.gallery.replace(response.data)
                )
            })
            .catch((error) => {
                alert(error.message);
            });
    }

}

export default new Store();
