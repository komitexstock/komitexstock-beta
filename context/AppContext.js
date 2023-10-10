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

    // useEffect to listen for onPress back button and close opened bottomsheets
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {

            if (calendarSheetOpen) {
                // if calendar bottom sheet is open, close it
                calendarSheetRef?.current.close();
                return true;
                
            } else if (filterSheetOpen) {
                // if filter bottom sheet is open, close it
                filterSheetRef?.current.close();
                return true;
                
            } else if (popUpSheetOpen) {
                // if popup bottom sheet is open, close it
                popUpSheetRef?.current.close();
                return true;

            } else if (stackedSheetOpen) {
                // if stacked bottom sheet is open, close it
                stackedSheetRef?.current.close();
                return true;

            } else if (bottomSheetOpen) {
                // if bottom sheet is open, close it
                bottomSheetRef?.current.close();
                return true;

            } else {
                // if any bottomsheet isnt opened return false
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [bottomSheetOpen, stackedSheetOpen, filterSheetOpen, calendarSheetOpen, popUpSheetOpen]);

    // function to listen for change in navigation, and update currentStack
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setCurrentStack(navigation.getCurrentRoute().name);
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
                bottomSheetOpen,
                calendarSheetOpen,
                popUpSheetOpen,
                setBottomSheetOpen,
                setCalendarSheetOpen,
                setFilterSheetOpen,
                setPopUpSheetOpen,
                setStackedSheetOpen
            }}
        >
           {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;