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
    currentPage = 1 // максимальная загрущенная старница по API по apiPageSize(по умолчаанию 20) элеметов
    searchText = ''

    isFetchingInProgress = false

    messageText = '' // сообщение для окна LoadingScreen

    isShowActivityIndicator = false // показывать индикатор загрузки?

    appColumnCount = 1 // количество колонок по умолчанию
    appImagesWidth = null // ширина загрущаемых картинок

    isAppInternetReachable = true // доступен ли интернет
    isAppSync = false // синхронизировано ли приложение с API

    viewableItems = [] // массив видимых элементов из FlatList основного скрина галерии


    selectedDetailPhotoId = null
    detailPhoto = {} // объект элементов вида {id: detailRequest}
    base64Images = {} // объект элементов вида {id: base64hash}
    base64UsersAvatar = {} // объект элементов вида {userId: base64hash}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    searchTextChange(text) {
        if (this.searchText !== text) {
            runInAction(() => {
                this.messageText = 'loading photos...'
                this.searchText = text
                if (this.isAppInternetReachable) {
                    this.currentPage = 1
                    this.gallery = []
                    this.getCurrentPage()
                }
            })
        }
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
        try {
            if (this.searchText !== '') {
                const response = await galleryAPI.getSearchedGallery(this.searchText, this.currentPage, apiPageSize)
                return response.data.results
            } else {
                const response = await galleryAPI.getGallery(this.currentPage, apiPageSize)
                return response.data
            }
        } catch (e) {
            alert('Exception: getResponseData(): ' + e.message)
        }
    }

    async getCurrentPage() {
        if (this.isAppInternetReachable) {
            try {
                const pageResponseData = await this.getResponseData()

                runInAction(() => {
                    this.messageText = 'found ' + pageResponseData.length + ' photos'
                })

                for (let photo of pageResponseData) {
                    if (this.gallery.findIndex(p => p.id === photo.id) === -1) {
                        runInAction(() => {
                            this.gallery.push(photo)
                        })

                        await this.getBase64Image(photo.urls.raw, photo.id, photo.width, photo.height)
                    }
                }


            } catch (e) {
                alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
            }
        } else {
            runInAction(() => {
                this.messageText = 'no internet connection'
            })
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
    }


    async initializeApp(width) {
        if (!this.isAppSync) {
            runInAction(() => {
                this.isAppSync = true
                this.isFetchingInProgress = true
                this.appImagesWidth = width
                this.messageText = 'read saved photos...'
            })

            try {
                const storedGallery = await readFromStorage(STORAGE_VIEWABLE_GALLERY)

                if (this.isAppInternetReachable) {
                    runInAction(() => {
                        this.messageText = 'loading photos...'
                    })

                    await this.getCurrentPage()
                } else if (storedGallery && (storedGallery.length > 0)) {
                    runInAction(() => {
                        this.gallery = []
                        this.gallery.push(...storedGallery)
                    })
                } else {
                    runInAction(() => {
                        this.messageText = 'no internet connection'
                    })
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

            runInAction(() => {
                this.isFetchingInProgress = false
            })

        }

    }


    setIsAppInternetReachable(isReachable) {
        if ((isReachable) && (!this.isAppInternetReachable) && (this.gallery.length === 0)) {
            this.getCurrentPage()
        }

        runInAction(() =>
            this.isAppInternetReachable = isReachable
        )
    }

    async getDetailPhoto(id) {
        if (!this.detailPhoto[id]) {
            if (this.isAppInternetReachable) {
                try {
                    runInAction(() => {
                        this.isShowActivityIndicator = true
                    })

                    const response = await galleryAPI.getPhotoDetail(id)
                    const detailResponseData = response.data
                    runInAction(() => {
                        this.detailPhoto[id] = detailResponseData
                    })

                    if (!this.base64UsersAvatar[detailResponseData.user.id]) {
                        const getImageResponse = await galleryAPI.getImageByUrl(detailResponseData.user.profile_image.large)
                        runInAction(() => {
                            this.base64UsersAvatar[detailResponseData.user.id] = `data:${getImageResponse.headers['content-type'].toLowerCase()};base64,${encode(getImageResponse.data)}`
                        })
                    }

                } catch (e) {
                    alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
                } finally {
                    runInAction(() => {
                        this.isShowActivityIndicator = false
                    })
                }
            }
        }

        runInAction(() => {
            this.selectedDetailPhotoId = id
        })
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
