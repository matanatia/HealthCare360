import AsyncStorage from '@react-native-community/async-storage';

const Storage = {

    getItem: async (key) => {
        let item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    },
    setItem: async (key, value) => {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key) => {
        return await AsyncStorage.removeItem(key);
    }
};

export default Storage;