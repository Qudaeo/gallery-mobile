import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";

const Store = makeAutoObservable({
        gallery: [],

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
)

/*
decorate(Store, {
    gallery: observable,
    getGallery: action
});
 */

export default Store;
