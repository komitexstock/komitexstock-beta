import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// back handler
import { BackHandler } from "react-native";

const AppContext = createContext();

export const useGlobals = () => useContext(AppContext);

const AppProvider = ({children}) => {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [currentStack, setCurrentStack] = useState("");

    // states to indicate a loading action is being carried out
    const [isLoading, setIsLoading] = useState(false);
    // secondary loading state
    const [isLoadingSecondary, setIsLoadingSecondary] = useState(false);

    // state to control toast
    const [toast, setToast] = useState({
        visible: false,
        text: "",
        type: "success",
    });

    // REFACTORED SHEETS STATES
    // regular bottomsheet
    const [bottomSheet, setBottomSheet] = useState({
        opened: false,
        close: () => {},
    })

    // stacked bottomsheet
    const [stackedBottomSheet, setStackedBottomSheet] = useState({
        opened: false,
        close: () => {},
    })

    // stacked bottomsheet
    const [filterBottomSheet, setFilterBottomSheet] = useState({
        opened: false,
        close: () => {},
    });

    // success bottomsheet
    const [confirmationBottomSheet, setConfirmationBottomSheet] = useState({
        opened: false,
        close: () => {},
    });


    // back handler dependencies
    const backHanderDependencies = [
        bottomSheet,
        stackedBottomSheet,
        filterBottomSheet,
        confirmationBottomSheet,
        isLoading,
        isLoadingSecondary
    ];

    // block of code to listen for onPress back button
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {

            // dont allow users to go back if loading states is active
            if (isLoading || isLoadingSecondary) {
                return true; 
            }

            
            if (confirmationBottomSheet.opened) { // if success bottomsheet is opened
                confirmationBottomSheet.close();
                setStackedBottomSheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
                return true;
            }else if (filterBottomSheet.opened) { // if filter bottomsheet is opened
                filterBottomSheet.close();
                setFilterBottomSheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
                return true;
            } else if (stackedBottomSheet.opened) { // if stacked bottomsheet is opened
                stackedBottomSheet.close();
                setStackedBottomSheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
                return true;
            } else if (bottomSheet.opened) { // if bottomheet is opened
                bottomSheet.close();
                setBottomSheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
                return true;
            } else {
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [...backHanderDependencies]);

    // function to listen for change in navigation, and update currentStack
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            // update currentStack
            setCurrentStack(navigation.getCurrentRoute().name);

            if (bottomSheet.opened) { // if bottomheet is opened
                bottomSheet.close();
                setBottomSheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
            }
        });

        return unsubscribe;
    }, [isFocused, navigation]);

    
    return (
        <AppContext.Provider 
            value={{
                currentStack,
                toast,
                setToast,
                isLoading,
                setIsLoading,
                isLoadingSecondary,
                setIsLoadingSecondary,
                bottomSheet,
                setBottomSheet,
                setStackedBottomSheet,
                setFilterBottomSheet,
                setConfirmationBottomSheet,
            }}
        >
           {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;