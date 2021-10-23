import {makeAutoObservable, runInAction} from 'mobx';
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";
import {readFromStorage, writeToStorage} from "../storage/storageApi";
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";

const STORAGE_CURRENT_PAGE = 'STORAGE_IMAGES'
const STORAGE_VIEWABLE_GALLERY = 'STORAGE_VIEWABLE_ITEMS'
const STORAGE_BASE64_IMAGE = 'STORAGE_BASE64_IMAGE'

export default class GalleryStore {

    gallery = [] // основной массив фотографий галереи
    currentPage = 0 // максимальная загрущенная старница по API по apiPageSize(по умолчаанию 20) элеметов

    appColumnCount = 1 // количество колонок по умолчанию
    appImagesWidth = null // ширина загрущаемых картинок

    isAppInternetReachable = false // доступен ли интернет
    isAppSync = false // синхронизировано ли приложение с API

    viewableItems = [] // массив видимых элементов из FlatList основного скрина галерии

    detailPhoto = { // 1 элемент из массива gallery для показа на детальных
        id: null,
        width: null,
        height: null,
        download_url: null
    }

    base64Images = {} // объект элементов вида {id: base64hash}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    async getNextPage() {
        runInAction(() => {
            this.currentPage++
        })

        const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
        const pageResponseData = response.data

        runInAction(() => {
            this.gallery.push(...pageResponseData)
        })

        /*
        for (let photo of pageResponseData) {
            const imageDimensions = calcImageDimensions(this.appImagesWidth, photo.width / photo.height)
            const getImageResponse = await galleryAPI.getImage(photo.id, imageDimensions.width, imageDimensions.height)

            runInAction(() => {
                this.base64Images[photo.id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
            })
        }
         */
    }


    async saveStateToStorage() {
        if (this.isAppInternetReachable) {
            const viewableGallery = this.viewableItems.map((el) => el.item)
            await writeToStorage(STORAGE_VIEWABLE_GALLERY, viewableGallery)

            this.base64Images.splice(0, this.base64Images.length) // очистка массива мутацией
            for (let photo of viewableGallery) {
                const imageDimensions = calcImageDimensions(this.appImagesWidth, photo.width / photo.height)
                const getImageResponse = await galleryAPI.getImage(photo.id, imageDimensions.width, imageDimensions.height)

                runInAction(() => {
                    this.base64Images[photo.id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
                })
            }

            await writeToStorage(STORAGE_CURRENT_PAGE, this.currentPage)
        }
    }


    async initializeApp() {

        let storedGallery = await readFromStorage(STORAGE_VIEWABLE_GALLERY)

        if (storedGallery) {

            storedGallery = storedGallery.map(el => el[0])
            //           alert(JSON.stringify(storedGallery))

            runInAction(() => {
                    this.gallery.splice(0, this.gallery.length) // очистка массива мутацией
                    this.gallery.push(...storedGallery)
                }
            )
        }


    }


    setIsAppInternetReachable(isReachable) {
        this.isAppInternetReachable = isReachable
    }

    setDetailPhoto(photo) {
        this.detailPhoto = {...photo}
    }

    setViewableItems(viewableItems) {
        this.viewableItems = [...viewableItems]
    }

    setAppImagesSize(width) {
        this.appImagesWidth = width
    }

    toggleColumnCount() {
        this.appColumnCount = (this.appColumnCount === 1) ? 2 : 1
    }
}
