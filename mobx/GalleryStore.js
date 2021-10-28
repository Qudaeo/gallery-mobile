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
    currentPage = null // максимальная загрущенная старница по API по apiPageSize(по умолчаанию 20) элеметов
    searchText = 'animals'

    appColumnCount = 1 // количество колонок по умолчанию
    appImagesWidth = null // ширина загрущаемых картинок

    isAppInternetReachable = true // доступен ли интернет
    isAppSync = false // синхронизировано ли приложение с API

    viewableItems = [] // массив видимых элементов из FlatList основного скрина галерии


    selectedDetailPhotoId = null
    detailPhoto = {} // объект элементов вида {id: detailRequest}
    base64Images = {} // объект элементов вида {id: base64hash}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    searchTextChange(text) {
        this.searchText = text
    }

    async getBase64Image(url, id, width, height) {
        if (this.isAppInternetReachable) {
            try {
                const imageDimensions = calcImageDimensions(this.appImagesWidth, this.appImagesWidth * height / width)

//           await alert(url+ ' ' +imageDimensions.width+ ' ' +imageDimensions.height)

                const getImageResponse = await galleryAPI.getImageByUrl(url, imageDimensions.width, imageDimensions.height)

                runInAction(() => {
                    this.base64Images[id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
                })

            } catch (e) {
                alert('Exception: getBase64Image(url, id, width, height) : ' + e.message)
            }
        }
    }

    async getResponseData() {
        if (this.searchText !== '') {
            const response = await galleryAPI.getSearchedGallery(this.searchText, this.currentPage, apiPageSize)
            return response.data.results
        } else {
            const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
            return response.data
        }
    }

    async getCurrentPage() {
        if (this.isAppInternetReachable) {
            try {
                const pageResponseData = await this.getResponseData()
   //             alert(JSON.stringify(pageResponseData))

                runInAction(() => {
                    this.gallery.push(...pageResponseData)
                })

                for (let photo of pageResponseData) {
                    //   await alert(photo.urls.raw + ' ' + photo.id+ ' ' +photo.width+ ' ' +photo.height)
                    await this.getBase64Image(photo.urls.raw, photo.id, photo.width, photo.height)
                }


            } catch (e) {
                alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
            }
        }
    }

    getNextPage() {
        if (this.isAppInternetReachable) {
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
                        if ((photo.id) && (this.base64Images[photo.id])) {
                            base64Items[photo.id] = this.base64Images[photo.id]
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
        if (!this.isAppSync) {
            runInAction(() => {
                this.isAppSync = true
                this.appImagesWidth = width
            })
            try {
                let currentPage = await readFromStorage(STORAGE_CURRENT_PAGE)
                currentPage = currentPage ? currentPage : 1

                runInAction(() =>
                    this.currentPage = this.currentPage ? this.currentPage : currentPage
                )
            } catch (e) {
                alert('Exception: readFromStorage(STORAGE_CURRENT_PAGE): ' + e.message)
            }

            try {
                const storedGallery = await readFromStorage(STORAGE_VIEWABLE_GALLERY)

                if (this.isAppInternetReachable) {
                    await this.getCurrentPage()
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

                for (let base64 in imagesFromStorage) {
                    runInAction(() => {
                        this.base64Images[base64] = imagesFromStorage[base64]
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
        if ((this.isAppInternetReachable) && (!this.isAppSync)) {
            this.initializeApp(this.appImagesWidth)
        }
    }

    async getDetailPhoto(id) {
        runInAction(() => {
            this.selectedDetailPhotoId = id
        })
        if (!this.detailPhoto[id]) {
            if (this.isAppInternetReachable) {
                try {
                    const response = await galleryAPI.getPhotoDetail(id)
                    const detailResponseData = response.data

                    runInAction(() => {
                        this.detailPhoto[id] = detailResponseData
                    })
                } catch (e) {
                    alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
                }
            }
        }
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
