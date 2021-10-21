import axios from "axios";

const instance = axios.create({
    baseURL: "https://picsum.photos/"
    /*,
    withCredentials: true,
    headers: {"API-KEY": "26818ec0-b02b-4c09-944c-b4d6ca23fec0"}
     */
})

export const galleryAPI = {
    async getGallery(currentPage, pageSize) {
        return instance.get(`v2/list?page=${currentPage}&limit=${pageSize}`)
    },

    async getImage(id, width, height) {
        return instance.get(`id/${id}/${width}/${height}.webp`, {responseType: 'arraybuffer'})
    }

}
