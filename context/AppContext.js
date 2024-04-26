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

    // regular bottom sheet ref
    const bottomSheetRef = useRef(null);
    // stacked bottom sheet ref
    const stackedSheetRef = useRef(null);
    // filter bottom sheet ref
    const filterSheetRef = useRef(null);
    // calendar bottom sheet ref
    const calendarSheetRef = useRef(null);
    // popup bottom sheet ref
    const popUpSheetRef = useRef(null);
    // popup bottom sheet ref
    const successSheetRef = useRef(null);

    // state to keep track if bottomsheet is open
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    // state to keep track if stacked bottomsheet is open
    const [stackedSheetOpen, setStackedSheetOpen] = useState(false);
    // state to keep track if filter bottomsheet is open
    const [filterSheetOpen, setFilterSheetOpen] = useState(false);
    // state to keep track if calendar bottomsheet is open
    const [calendarSheetOpen, setCalendarSheetOpen] = useState(false);
    // state to keep track if pop up bottomsheet is open
    const [popUpSheetOpen, setPopUpSheetOpen] = useState(false);
    // state to keep track if success up bottomsheet is open
    const [successSheetOpen, setSuccessSheetOpen] = useState(false);
    
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

    // block of code to listen for onPress back button
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {

            if (stackedBottomSheet.opened) { // if stacked bottomsheet is opened
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

    }, [bottomSheet, stackedBottomSheet]);

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
                bottomSheetRef,
                stackedSheetRef,
                filterSheetRef,
                calendarSheetRef,
                popUpSheetRef,
                successSheetRef,
                bottomSheetOpen,
                calendarSheetOpen,
                popUpSheetOpen,
                stackedSheetOpen,
                setBottomSheetOpen,
                setCalendarSheetOpen,
                setFilterSheetOpen,
                setPopUpSheetOpen,
                setStackedSheetOpen,
                setSuccessSheetOpen,
                toast,
                setToast,
                isLoading,
                setIsLoading,
                isLoadingSecondary,
                setIsLoadingSecondary,
                bottomSheet,
                setBottomSheet,
                stackedBottomSheet,
                setStackedBottomSheet,
            }}
        >
           {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;