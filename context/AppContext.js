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

    // REFACTORED SHEETS REF
    const [bottomSheet, setBottomsheet] = useState({
        opened: false,
        close: () => {},
    })

    // regular bottom sheet ref
    const bottomSheetScreenRef = useRef(null);
    
    // stacked bottomsheet ref
    const stackedBottomSheetScreenRef = useRef(null);

    // bottoms sheet paramaters
    const [bottomSheetParameters, setBottomSheetParameters] = useState({
        index: 0,
        snapPointsArray: ['50%'],
        enablePanDownToClose: true,
        sheetTitle: '',
        sheetSubtitleText: '',
        sheetOpened: false,
        contentContainerStyle: undefined,
        content: <></>,
        closeModal: (callback) => {
            if (typeof callback === "function") callback();
            bottomSheetScreenRef.current?.close();
        },
        openModal: (callback) => {
            if (typeof callback === "function") callback();
            bottomSheetScreenRef.current?.present();
        },
    });

    // stacked bottom sheet paramaters
    const [stackedBottomSheetParameters, setStackedBottomSheetParameters] = useState({
        index: 0,
        snapPointsArray: ['50%'],
        enablePanDownToClose: true,
        sheetTitle: '',
        sheetSubtitleText: '',
        sheetOpened: false,
        contentContainerStyle: undefined,
        content: <></>,
        closeModal: (callback) => {
            if (typeof callback === "function") callback();
            stackedBottomSheetScreenRef.current?.close();
        },
        openModal: (callback) => {
            if (typeof callback === "function") callback();
            stackedBottomSheetScreenRef.current?.present();
        },
    });


    // block of code to listen for onPress back button
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {

            // if bottoms sheet is opened
            if (bottomSheet.opened) {
                bottomSheet.close();
                setBottomsheet(prevState => {
                    return {
                        ...prevState,
                        opened: false,
                    }
                })
                return true;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [bottomSheet]);

    // function to listen for change in navigation, and update currentStack
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            // update currentStack
            setCurrentStack(navigation.getCurrentRoute().name);

            if (bottomSheetParameters.sheetOpened) {
                // reste sheet state
                setBottomSheetParameters(prevParamaters => {
                    return {
                        ...prevParamaters,
                        sheetTitle: '',
                        sheetSubtitleText: '',
                        sheetOpened: false,
                        content: <></>,
                    }
                })

                // close bottomsheet
                bottomSheetParameters.closeModal();
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
                bottomSheetScreenRef,
                bottomSheetParameters,
                setBottomSheetParameters,
                stackedBottomSheetScreenRef,
                stackedBottomSheetParameters, 
                setStackedBottomSheetParameters,
                setBottomsheet,
            }}
        >
           {children}
        </AppContext.Provider>
    );
}
 
export default AppProvider;