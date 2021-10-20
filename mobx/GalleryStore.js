import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";
import {calcImageDimensions} from "../common/funcions";
import binaryToBase64 from "react-native";
import base64 from "react-native-base64";

export default class GalleryStore {

    gallery = []
    currentPage = 0
    appImagesWidth = null
    detailPhoto = {
        id: null,
        width: null,
        height: null
    }
    images = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    _getGallery() {
        axios.get(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=5`)
            .then(response => {


                for (let photo of response.data) {

                    let imageDimensions =calcImageDimensions(this.appImagesWidth, photo.height / photo.width)
//                    alert(`https://picsum.photos/id/${photo.id}/${imageDimensions.width}/${imageDimensions.height}.webp`)

                    axios.get(`https://picsum.photos/id/${photo.id}/${imageDimensions.width}/${imageDimensions.height}.webp`, { responseType: 'arraybuffer' })
                        .then(resp => {
                            runInAction(() => {
                                    //let image = Buffer.from(resp.data, 'binary').toString('base64')
//`data:${resp.headers['content-type'].toLowerCase()};base64,${base64.encode(resp.data[0])}`
                                    this.images[photo.id] = typeof resp.data
                                }
                            )

         //                   alert(resp.data)
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
