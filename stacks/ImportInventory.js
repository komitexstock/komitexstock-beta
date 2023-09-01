// react native component
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    BackHandler,
    Dimensions
} from "react-native";
// components
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
// colors
import { background, black, bodyText, primaryColor} from "../style/colors";
// icons
import ArrowDown from "../assets/icons/ArrowDown";
// react hooks
import { useState, useEffect, useRef } from "react";
// import icons


// get windows height
const windowsHeight = Dimensions.get("window").height;

const ImportInventory = ({navigation}) => {

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // logistics
    const [logistics, setLogistics] = useState(null);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);


    // check for empty fields
    // const emptyFields = [
    //     endDate,
    //     format
    //     ].some(
    //         (item) => item === null || item === ''
    // );

    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay]);
    
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        bottomSheetModalRef.current?.present();
        // set overlay
        setShowOverlay(true);
    }
    
    // render GenerateBusinessReport page
    return (
        <>
            <View
                style={style.container}
            >
                <View style={style.main}>
                    {/* header component */}
                    <Header 
                        navigation={navigation} 
                        stackName={"Import Inventory"} 
                        iconFunction={null} 
                        icon={null} 
                        unpadded={true}
                    />
                    <Text style={style.headingText}>
                        Import an already existing inventory from a different logistics. 
                        Note all products will have zero quantity after its imported
                    </Text>
                    {/* Select Logistics */}
                    <SelectInput 
                        label={"Select Logistics"} 
                        placeholder={"Select logistics"} 
                        value={logistics}
                        onPress={() => {}}
                        icon={<ArrowDown />}
                        active={selectLogisticsActive}
                        inputFor={"Logistics"}
                    />
                    <View style={style.selectProductsButtonWrapper}>
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <Text style={style.addProduct}>+Select Products</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Add Product button, disables on empty fields */}
            <CustomButton 
                name={"Import Inventory"}
                onPress={() => {}}
                backgroundColor={background}
                fixed={false}
                inactive={true}
            />
            
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["25%"]}
                autoSnapAt={0}
                sheetTitle={"Select Format"}
            >
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: windowsHeight - 100,
    },
    main: {
        paddingBottom: 90,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        lineHeight: 16,
        color: bodyText,
        width: "100%",
        marginBottom: 24,
        marginTop: 8,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    selectContainer: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    selectButton: {
        height: 35,
        width: '100%',
        paddingVertical: 10,
    },
    selectButtonText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-medium',
    },
    selectProductsButtonWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    addProduct: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
})
 
export default ImportInventory;