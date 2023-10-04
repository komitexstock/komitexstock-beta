import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const AppContext = createContext();

export const useStack = () => useContext(AppContext).currentStack;

const AppProvider = ({children}) => {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [currentStack, setCurrentStack] = useState("");

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