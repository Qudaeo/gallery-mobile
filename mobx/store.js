import {runInAction, observable, action} from 'mobx';
import axios from "axios";

class Store {

    constructor() {
        this.gallery = observable.array([])
//        this.images = observable.array([]);
        this.getGallery = action(this.getGallery.bind(this))
    }

    getGallery() {

        axios.get("https://picsum.photos/v2/list?page=2&limit=5")
            .then(response => {
                runInAction(() => {

                    this.gallery.replace(response.data)
                      //  this.gallery.push(...response.data)

                    /*
                        for (let image of response.data) {
                            axios.post(image.download_url, {responseType: "arraybuffer"})
                                .then(res => {
                                    this.images.push({
                                        download_url: image.download_url,
                                        image: res.data
                                    })

                                })
                                .catch((error) => {
                                    alert(error.message + ': ' + image.url);
                                })
                        }
                     */
                    }
                )
            })
            .catch((error) => {
                alert(error.message);
            });
    }

}

export default new Store();
