import axios from "axios";
import {API_KEY, baseURL} from "../common/const";

const instance = axios.create({
    baseURL,
    headers: {"Authorization": `Client-ID ${API_KEY}`}
})

export const galleryAPI = {
    async getGallery(currentPage, pageSize) {
        try {
            return instance.get(`/photos?page=${currentPage}&per_page=${pageSize}`)
        } catch (e) {
            alert('Exception: galleryAPI: getGallery(currentPage, pageSize): ' + e.message)
        }
    },

    async getSearchedGallery(searchText, currentPage, pageSize) {
        try {
            return instance.get(`/search/photos?query=${searchText}&page=${currentPage}&per_page=${pageSize}`)
        } catch (e) {
            alert('Exception: galleryAPI: getSearchedGallery(searchText, currentPage, pageSize): ' + e.message)
        }
    },

    async getImageByUrl(url, width, height) {
        try {
            return instance.get(`${url}?w=${width}&h=${height}`, {responseType: 'arraybuffer'})
        } catch (e) {
            alert('Exception: galleryAPI: getImageByUrl(url, width, height): ' + e.message)
        }
    },

    async getPhotoDetail(id) {
        try {
            return instance.get(`/photos/${id}`)
        } catch (e) {
            alert('Exception: galleryAPI: getPhotoDetail(id): ' + e.message)
        }
    },
}


/*
import axios from "axios";

export const baseURL = "https://picsum.photos/"

const instance = axios.create({
    baseURL
})

export const galleryAPI = {
    async getGallery(currentPage, pageSize) {
        try {
            return instance.get(`v2/list?page=${currentPage}&limit=${pageSize}`)
        } catch (e) {
            alert(e.message)
        }
    },

    async getImage(id, width, height) {
        try {
            return instance.get(`id/${id}/${width}/${height}.webp`, {responseType: 'arraybuffer'})
        } catch (e) {
            alert(e.message)
        }
    }

}
*/
