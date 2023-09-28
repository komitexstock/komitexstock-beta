import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useStack = () => useContext(AppContext).currentStack;

export const firstLaunch = async () => {
    try {
        const value = await AsyncStorage.getItem('first_launch')
        if (value !== null) {
            return value
        } else {
            await AsyncStorage.setItem('first_launch', true);
            return true;
        }
    } catch (error) {
        
    }
}

// session context
export const useSession = async () => await AsyncStorage.getItem('session');

const AppProvider = ({children}) => {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [currentStack, setCurrentStack] = useState("");

    // console.log(useSession());

    // function to listen for change in navigation, and update currentStack
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
          setCurrentStack(navigation.getCurrentRoute().name);
        });
    
        return unsubscribe;
    }, [isFocused, navigation]);

    
    return (
        <AppContext.Provider value={{currentStack}}>
            {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;