import AsyncStorage from "@react-native-async-storage/async-storage";

export const writeToStorage = async (prefix, item) => {
    try {
        if (item) {
            await AsyncStorage.setItem(prefix, JSON.stringify(item))
        }
    } catch (e) {
        alert('Exception: writeToStorage = async (prefix, item): ' + e.message)
    }
}

export const readFromStorage = async (prefix) => {
    try {
        const storedValue = await AsyncStorage.getItem(prefix)
        if (storedValue !== null) {
            return JSON.parse(storedValue)
        }
    } catch (e) {
        alert('Exception: readFromStorage = async (prefix): ' + e.message)
    }
}
