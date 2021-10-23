import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_GALLERY_PAGE_ = 'STORAGE_GALLERY_PAGE_'
export const STORAGE_BASE64_IMAGE_ = 'STORAGE_BASE64_IMAGE_'

export const writeToStorage = async (prefix, id, item) => {
    try {
        await AsyncStorage.setItem(prefix + id, JSON.stringify(item))
    } catch (error) {
        alert(error.message)
    }
}

export const readFromStorage = async (prefix, id) => {
    try {
        const storedValue = await AsyncStorage.getItem(prefix + id)
        return storedValue ? JSON.parse(storedValue) : null
    } catch (error) {
        alert(error.message)
    }
}

export const cacheRequest = async (prefix, options) => {
    let response = await readFromStorage(prefix, options.id)
    if (!response) {
        if (prefix === STORAGE_GALLERY_PAGE_) {
            response = await this._getGallery(options.id)
        }

        await writeToStorage(prefix, options.id, response)
    }

    alert(JSON.stringify(response))

    return response
}
