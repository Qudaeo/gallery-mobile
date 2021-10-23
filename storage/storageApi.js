import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_GALLERY_PAGE_ = 'STORAGE_GALLERY_PAGE_'
export const STORAGE_BASE64_IMAGE_ = 'STORAGE_BASE64_IMAGE_'

export const writeToStorage = async (prefix, id, item) => {
    try {
        await AsyncStorage.setItem(prefix + id, JSON.stringify(item))
    } catch (e) {
        alert(e.message)
    }
}

export const readFromStorage = async (prefix, id) => {
    try {
        const storedValue = await AsyncStorage.getItem(prefix + id)
        return !(storedValue === null) ? JSON.parse(storedValue) : null
    } catch (e) {
        alert(e.message)
    }
}
