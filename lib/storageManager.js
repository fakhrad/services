import { AsyncStorage } from "react-native";


const setItem = async (key, value) => {
    try {
        var jsonOfItem = await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
};
const getItem = async (key) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
        console.log(error.message);
    }
    return;
};

const removeItem = async (key) => {
    try {
        var jsonOfItem = await AsyncStorage.removeItem(key);
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
};

const removeAllItem = async () => {
    try {
        var jsonOfItem = await AsyncStorage.removeAllItem();
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
};

const storage = { setItem, getItem, removeItem, removeAllItem };
export default storage;
