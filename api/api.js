import axios from "axios";

export const API_KEY = "RfyHijtOTgB32xK8fjfc95K_cOMUIw7os6e_dT4Yehc"

const baseURL = "https://api.unsplash.com/"

const instance = axios.create({
    baseURL,
    headers: {"Authorization": `Client-ID ${API_KEY}`}
})

export const galleryAPI = {
    async getGallery(currentPage, pageSize) {
        try {
            return instance.get(`photos?page=${currentPage}&per_page=${pageSize}`)
        } catch (e) {
            alert(e.message)
        }
    },

    async getImageByUrl(ulr, width, height) {
        try {
            return instance.get(`${url}?w=${width}h=${height}`, {responseType: 'arraybuffer'})
        } catch (e) {
            alert(e.message)
        }
    }

    /*
    async getImage(id, width, height) {
        try {
            return instance.get(`id/${id}/${width}/${height}.webp`, {responseType: 'arraybuffer'})
        } catch (e) {
            alert(e.message)
        }
    }
     */

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
