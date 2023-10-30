import { Dimensions } from "react-native";
import * as Clipboard from 'expo-clipboard';

export const windowHeight = Dimensions.get("window").height;

export const windowWidth = Dimensions.get("window").width;

export const copyToClipboard = async (text, callBackFunction) => {
    try {
        await Clipboard.setStringAsync(text);
        callBackFunction();
    } catch (error) {
        console.log(error);        
    }
};