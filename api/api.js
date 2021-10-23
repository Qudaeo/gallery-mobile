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
