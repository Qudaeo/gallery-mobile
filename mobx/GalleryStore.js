import {runInAction, makeAutoObservable} from 'mobx';
import axios from "axios";
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";

export default class GalleryStore {

    gallery = []
    currentPage = 0

    appImagesWidth = null
    appImagesCropSize = null


    detailPhoto = {
        id: null,
        width: null,
        height: null
    }

    base64Images = {}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    _getGallery() {
        axios.get(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=5`)
            .then(response => {


                for (let photo of response.data) {

                    let imageDimensions = calcImageDimensions(this.appImagesWidth, photo.height / photo.width)
//                    alert(`https://picsum.photos/id/${photo.id}/${imageDimensions.width}/${imageDimensions.height}.webp`)

                    axios.get(`https://picsum.photos/id/${photo.id}/${imageDimensions.width}/${imageDimensions.height}.webp`, {responseType: 'arraybuffer'})
                        .then(resp => {
                            runInAction(() => {
                                    //let image = Buffer.from(resp.data, 'binary').toString('base64')
//`data:${resp.headers['content-type'].toLowerCase()};base64,${base64.encode(resp.data[0])}`
                                    this.base64Images[photo.id] = `data:${resp.headers['content-type'].toLowerCase()};base64,${encode(resp.data)}`
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

    setAppImagesSize(width) {
        runInAction(() => {
                this.appImagesWidth = width
            }
        )
    }

}
