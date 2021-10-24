import {makeAutoObservable, runInAction} from 'mobx';
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";
import {readFromStorage, writeToStorage} from "../storage/storageApi";
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";

export const STORAGE_CURRENT_PAGE = 'STORAGE_IMAGES'
export const STORAGE_VIEWABLE_GALLERY = 'STORAGE_VIEWABLE_ITEMS'
export const STORAGE_BASE64_IMAGE = 'STORAGE_BASE64_IMAGE'

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

    async getCurrentPage() {
        if (this.isAppInternetReachable) {
            try {
                //         alert(this.currentPage)
                const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
                const pageResponseData = response.data

                runInAction(() => {
                    this.gallery.push(...pageResponseData)
                })
            } catch (e) {
                alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
            }
        }
    }


    async getNextPage() {
        if ((this.isAppInternetReachable) && (this.isAppSync)) {
            runInAction(() => {
                this.currentPage++
                this.getCurrentPage()
            })
        }
    }


    async saveStateToStorage() {
        if (this.isAppInternetReachable) {
            try {
                const viewableGallery = this.viewableItems.map(el => el.item).map(el2 => el2[0])

                if (viewableGallery) {
                    await writeToStorage(STORAGE_VIEWABLE_GALLERY, viewableGallery)

                    let base64Items = {}

                    for (let photo of viewableGallery) {

                        if (photo.id) {
                            const imageDimensions = calcImageDimensions(this.appImagesWidth, this.appImagesWidth * photo.height / photo.width)
                            //     alert(JSON.stringify(imageDimensions))
                            const getImageResponse = await galleryAPI.getImage(photo.id, imageDimensions.width, imageDimensions.height)

                            base64Items[photo.id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`

                        }
                    }

                    await writeToStorage(STORAGE_BASE64_IMAGE, base64Items)

                    // alert(JSON.stringify(Object.keys(base64Items).length) + ' saved')
                }

            } catch (e) {
                alert('Exception: writeToStorage(STORAGE_VIEWABLE_GALLERY, viewableGallery): ' + e.message)
            }

            try {
                await writeToStorage(STORAGE_CURRENT_PAGE, this.currentPage)
            } catch (e) {
                alert('Exception: writeToStorage(STORAGE_CURRENT_PAGE, this.currentPage): ' + e.message)
            }
        }
    }


    async initializeApp(width) {
        runInAction(() =>
            this.appImagesWidth = width
        )
        if (!this.isAppSync) {
            try {
                const currentPage = await readFromStorage(STORAGE_CURRENT_PAGE)
                runInAction(() =>
                    this.currentPage = currentPage ? currentPage : 1
                )
            } catch (e) {
                alert('Exception: readFromStorage(STORAGE_CURRENT_PAGE): ' + e.message)
            }

            try {
                const storedGallery = await readFromStorage(STORAGE_VIEWABLE_GALLERY)

                if (this.isAppInternetReachable) {
                    await this.getCurrentPage()

                    runInAction(() =>
                        this.isAppSync = true
                    )

                    /*
                                    if (storedGallery) {

                                        runInAction(() => {
                                            const firstId = (storedGallery[0]) ? storedGallery[0].id : null
                                            if (firstId) {
                                                this.startIndex = this.gallery.findIndex(el => el.id === firstId)
                                            }
                                        })
                                        }
                    */
                } else if (storedGallery) {
                    runInAction(() => {
                        this.gallery = []
                        this.gallery.push(...storedGallery)
                    })
                } else {
                    alert('Check internet connection!')
                }


            } catch (e) {
                alert('Exception: readFromStorage(STORAGE_VIEWABLE_GALLERY): ' + e.message)
            }

            try {
                const imagesFromStorage = await readFromStorage(STORAGE_BASE64_IMAGE)
//            alert(JSON.stringify(Object.keys(imagesFromStorage).length) + ' base64 read')

                if (imagesFromStorage) {
                    runInAction(() => {
                        this.base64Images = imagesFromStorage
                    })
                }
            } catch (e) {
                alert('Exception: readFromStorage(STORAGE_BASE64_IMAGE): ' + e.message)
            }

        }

    }


    setIsAppInternetReachable(isReachable) {
        runInAction(() =>
            this.isAppInternetReachable = isReachable
        )
        if ((this.isAppInternetReachable) && !(this.isAppSync)) {
            this.initializeApp(this.appImagesWidth)
        }
    }

    setDetailPhoto(photo) {
        runInAction(() =>
            this.detailPhoto = {...photo}
        )
    }

    setViewableItems(viewableItems) {
        runInAction(() =>
            this.viewableItems = [...viewableItems]
        )
    }

    toggleColumnCount() {
        runInAction(() =>
            this.appColumnCount = (this.appColumnCount === 1) ? 2 : 1
        )
    }
}
