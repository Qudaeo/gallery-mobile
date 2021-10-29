import {makeAutoObservable, runInAction} from 'mobx';
import {galleryAPI} from "../api/api";
import {apiPageSize} from "../common/const";
import {readFromStorage, writeToStorage} from "../storage/storageApi";
import {calcImageDimensions} from "../common/funcions";
import {encode} from "base64-arraybuffer";

export const STORAGE_GALLERY = 'STORAGE_ITEMS'
export const STORAGE_BASE64_IMAGE = 'STORAGE_BASE64_IMAGE'
export const STORAGE_DETAILS = 'STORAGE_DETAILS'
export const STORAGE_USERS_AVATAR = 'STORAGE_USERS_AVATAR'

export default class GalleryStore {

    gallery = [] // основной массив фотографий галереи
    currentPage = 1 // максимальная загрущенная страница через API
    searchText = ''

    isFetchingInProgress = false
    messageText = '' // сообщение для окна LoadingScreen

    isShowActivityIndicator = false // показывать индикатор загрузки?

    appColumnCount = 1 // количество колонок по умолчанию
    appImagesWidth = null // ширина загрущаемых картинок

    isAppInternetReachable = true // доступен ли интернет

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
                runInAction(() => {
                    this.isFetchingInProgress = true
                })

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

                runInAction(() => {
                    this.isFetchingInProgress = false
                })
            } catch (e) {
                alert('Exception: getCurrentPage: galleryAPI.getGallery(this.currentPage, apiPageSize): ' + e.message)
            }
        } else {
            runInAction(() => {
                this.messageText = 'no internet connection'
            })
        }

        await this.saveStateToStorage();
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
            if (this.gallery) {

                const viewableItems = this.viewableItems.map(el => el.item).map(el2 => el2[0])
                const firstViewableId = viewableItems[0].id
                const firstViewableIndex = this.gallery.findIndex(photo => photo.id === firstViewableId)

                let minIndex
                if (firstViewableIndex < 15) {
                    minIndex = 0
                } else if (this.gallery.length - firstViewableIndex < 15)
                    minIndex = Math.min(0, this.gallery.length - 30)
                else {
                    minIndex = firstViewableIndex - 15
                }

       //         alert(JSON.stringify(firstViewableIndex))

                const gallerySave = this.gallery.slice(minIndex, Math.min(minIndex+30, this.gallery.length))
                const base64ImagesSave = {}
                const detailPhotoSave = {}
                const base64UsersAvatarSave = {}

                //gallery.length


                for (let photo of gallerySave) {
                    if ((photo.id) && (this.base64Images[photo.id])) {
                        base64ImagesSave[photo.id] = this.base64Images[photo.id]

                        let details = this.detailPhoto[photo.id]
                        if (this.detailPhoto[photo.id]) {
                            detailPhotoSave[photo.id] = details

                            const userId = details.user.id
                            if (this.base64UsersAvatar[userId]) {
                                base64UsersAvatarSave[userId] = this.base64UsersAvatar[userId]

                            }
                        }
                    }
                }

                await writeToStorage(STORAGE_GALLERY, gallerySave)
                await writeToStorage(STORAGE_BASE64_IMAGE, base64ImagesSave)
                await writeToStorage(STORAGE_DETAILS, detailPhotoSave)
                await writeToStorage(STORAGE_USERS_AVATAR, base64UsersAvatarSave)

                //          alert(JSON.stringify(Object.keys(base64ImagesSave).length) + ' saved')
            }

        } catch (e) {
            alert('Exception: saveStateToStorage(): ' + e.message)
        }
    }


    async initializeApp(width) {

        runInAction(() => {
            this.isFetchingInProgress = true
            this.appImagesWidth = width
            this.messageText = 'read saved photos...'
        })

        try {
            const storedGallery = await readFromStorage(STORAGE_GALLERY)

            //       alert('storedGallery.length=' + JSON.stringify(storedGallery.length))

            if (storedGallery && (storedGallery.length > 0)) {
                runInAction(() => {
                    this.gallery = []
                    this.gallery.push(...storedGallery)
                })

                const imagesFromStorage = await readFromStorage(STORAGE_BASE64_IMAGE)
                if (imagesFromStorage) {
                    runInAction(() => {
                        this.base64Images = imagesFromStorage
                    })
                }

                const detailsFromStorage = await readFromStorage(STORAGE_DETAILS)
                if (detailsFromStorage) {
                    runInAction(() => {
                        this.detailPhoto = detailsFromStorage
                    })
                }

                const base64UsersAvatarFromStorage = await readFromStorage(STORAGE_USERS_AVATAR)
                if (base64UsersAvatarFromStorage) {
                    runInAction(() => {
                        this.base64UsersAvatar = base64UsersAvatarFromStorage
                    })
                }

            } else if (this.isAppInternetReachable) {
                runInAction(() => {
                    this.messageText = 'loading photos...'
                })

                await this.getCurrentPage()
            } else {
                runInAction(() => {
                    this.messageText = 'no internet connection'
                })
            }

        } catch (e) {
            alert('Exception: readFromStorage: ' + e.message)
        }


        runInAction(() => {
            this.isFetchingInProgress = false
        })

    }


    setIsAppInternetReachable(isReachable) {
        if ((isReachable) && (!this.isAppInternetReachable) && (this.gallery.length === 0)) {

            runInAction(() =>
                this.isAppInternetReachable = isReachable
            )

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

        await this.saveStateToStorage();
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
