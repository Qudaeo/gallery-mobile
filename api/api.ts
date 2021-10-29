import axios from "axios";
import {API_KEY, baseURL} from "../common/const";

const instance = axios.create({
    baseURL,
    headers: {"Authorization": `Client-ID ${API_KEY}`}
})

export const galleryAPI = {
    async getGallery(currentPage: number, pageSize: number) {
        try {
            return instance.get(`/photos?page=${currentPage}&per_page=${pageSize}`)
        } catch (e) {
            alert('Exception: galleryAPI: getGallery(currentPage, pageSize): ' + e.message)
        }
    },

    async getSearchedGallery(searchText: string, currentPage: number, pageSize: number) {
        try {
            return instance.get(`/search/photos?query=${searchText}&page=${currentPage}&per_page=${pageSize}`)
        } catch (e) {
            alert('Exception: galleryAPI: getSearchedGallery(searchText, currentPage, pageSize): ' + e.message)
        }
    },

    async getImageByUrl(url: string, width: number, height: number) {
        try {
            return instance.get(`${url}?w=${width}&h=${height}`, {responseType: 'arraybuffer'})
        } catch (e) {
            alert('Exception: galleryAPI: getImageByUrl(url, width, height): ' + e.message)
        }
    },

    async getPhotoDetail(id: string) {
        try {
            return instance.get(`/photos/${id}`)
        } catch (e) {
            alert('Exception: galleryAPI: getPhotoDetail(id): ' + e.message)
        }
    },
}
