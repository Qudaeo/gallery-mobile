import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_GALLERY = 'STORAGE_ITEMS';
export const STORAGE_BASE64_IMAGE = 'STORAGE_BASE64_IMAGE';
export const STORAGE_DETAILS = 'STORAGE_DETAILS';
export const STORAGE_USERS_AVATAR = 'STORAGE_USERS_AVATAR';

type PrefixType =
  | typeof STORAGE_GALLERY
  | typeof STORAGE_BASE64_IMAGE
  | typeof STORAGE_DETAILS
  | typeof STORAGE_USERS_AVATAR;

export const writeToStorage = async (prefix: PrefixType, item: any) => {
  try {
    if (item) {
      await AsyncStorage.setItem(prefix, JSON.stringify(item));
    }
  } catch (e) {
    console.log('Exception: writeToStorage = async (prefix, item):', e);
  }
};

export const readFromStorage = async (prefix: PrefixType) => {
  try {
    const storedValue = await AsyncStorage.getItem(prefix);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  } catch (e) {
    console.log('Exception: readFromStorage = async (prefix):', e.message);
  }
};
