import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  setItem: async function (key, data) {
    try {
      // console.log('setData =>', data);
      AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log('error', error);
    }
  },

  getItem: async function (key) {
    try {
      const responce = await AsyncStorage.getItem(key);
      // console.log('getData =>', responce);
      return responce;
    } catch (error) {
      console.log('error', error);
    }
  },
  removeItem: async function (key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('error', error);
    }
  },
};

export default asyncStorage;
