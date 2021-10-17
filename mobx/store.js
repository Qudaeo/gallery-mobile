import {observable, action} from 'mobx';
import {decorate} from 'core-decorators';
import axios from "axios";

class Store {
    constructor() {
        this.gallery = observable.array([]);
        this.getGallery = action(this.getGallery.bind(this));
    }

    getGallery() {

        axios.get("https://picsum.photos/v2/list?page=2&limit=100")
            .then(action(response => {
                this.gallery.replace(response.data)
            }))
            .catch((error) => {
                alert(error.message);
            });
    }
}

decorate(Store, {
    gallery: observable,
    getGallery: action
});

export default new Store();
