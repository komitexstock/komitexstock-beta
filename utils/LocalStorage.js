import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthData = async () => {
    try {
        //Try get the data from Async Storage
        const authDataSerialized = await AsyncStorage.getItem('@AuthData');
        if (authDataSerialized) {
            //If there are data, it's converted to an Object and the state is updated.
            const _authData = JSON.parse(authDataSerialized);
            return _authData;
        }
      } catch (error) {
        console.log(error);
    } 
}

export const setAuthData = async (_authData) => {
    try {
        //Try get the data from Async Storage
		await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
      } catch (error) {
        console.log(error);
    } 
}

export const removeAuthData = async()  => {
    
    try {
        //Try get the data from Async Storage
		await AsyncStorage.removeItem('@AuthData');
    } catch (error) {
        console.log(error);
    } 
}