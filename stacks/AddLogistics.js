// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    BackHandler,
    Keyboard
} from "react-native";
// react hooks
import { useState, useRef, useEffect } from "react";
// components
import Header from "../components/Header";
import SelectLogisticsCard from "../components/SelectLogisticsCard";
import SearchBar from "../components/SearchBar";
import CustomBottomSheet from "../components/CustomBottomSheet";
import ModalButton from "../components/ModalButton";
import LogisticsInfo from "../components/LogisticsInfo";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessPrompt from "../components/SuccessPrompt";
// colors
import { bodyText, black, white, background } from "../style/globalStyleSheet";

const Products = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeAllModal();
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

    // modal ref
    const bottomSheetModalRef = useRef(null);
    
    // popUp modal ref
    const popUpBottomSheetModalRef = useRef(null);

    // clsoe modal bottomsheet function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    // close popup modal bottomsheet function
    const closePopUpModal = () => {
        popUpBottomSheetModalRef.current?.close();
    };

    // close all bottomsheet modal function
    const closeAllModal = () => {
        closeModal();
        closePopUpModal();
    }

    // function to open bottom sheet modal
    const openPopUpModal = () => {
        popUpBottomSheetModalRef.current?.present();
    }

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            verified: true,
            destinations: 14,
            inventories: 57,
            onPress: openModal
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            verified: true,
            destinations: 28,
            inventories: 65,
            onPress: openModal
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            verified: true,
            destinations: 33,
            inventories: 49,
            onPress: openModal
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            verified: false,
            destinations: 14,
            inventories: 31,
            onPress: openModal
        },
    ];

    // location list
    const locationsList = [
        {
            id: 1,
            location: "Asaba",
            charge: 4000,
        },
        {
            id: 2,
            location: "Benin City",
            charge: 5000,
        },
        {
            id: 3,
            location: "Sapele",
            charge: 3500,
        },
        {
            id: 4,
            location: "Ughelli",
            charge: 4000,
        },
        {
            id: 5,
            location: "Agbor",
            charge: 3500,
        },
        {
            id: 6,
            location: "Warri",
            charge: 4500,
        },
        {
            id: 7,
            location: "Abraka",
            charge: 4000,
        },
        {
            id: 8,
            location: "Ibusa",
            charge: 3500,
        },
        {
            id: 9,
            location: "Okpanam",
            charge: 3000,
        },
        {
            id: 10,
            location: "Uromi",
            charge: 4000,
        },
        {
            id: 11,
            location: "Ogwashi-Uku",
            charge: 3500,
        },
        {
            id: 12,
            location: "Auchi",
            charge: 4500,
        },
        {
            id: 13,
            location: "Agbor",
            charge: 3500,
        },
        {
            id: 14,
            location: "Eku",
            charge: 4000,
        }
    ];

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Deliveries",
            presentValue: 500,
            oldValue: 495,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 2,
            title: "Delivery Success Rate",
            presentValue: 80,
            oldValue: 82,
            decimal: false,
            unit: "%",
            unitPosition: "end",
        },
    ]

    // render AddLogistics page
    return (
        <>
            <TouchableWithoutFeedback 
                style={{
                    flex: 1, 
                }}
                // onclick dismiss keyboard
                onPress={() => Keyboard.dismiss()}
            >
                <FlatList 
                    // remove vertical scroll indicator 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            {/* header component */}
                            <Header
                                navigation={navigation} 
                                stackName={"Add Logistics"} 
                                iconFunction={() => {}} 
                                icon={null}
                                unpadded={true}
                            />
                            <Text style={style.headingText}>
                                Select a preferred logistics partner for efficient 
                                inventory management and timely order fulfillment.
                            </Text>
                            {/* logistics search bar */}
                            <SearchBar
                                placeholder={"Search for a logistics or location"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={white}
                            />
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={logisticsList}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <SelectLogisticsCard
                            logistics={item.logistics}
                            imageUrl={item.imageUrl}
                            destinations={item.destinations}
                            inventories={item.inventories}
                            verified={item.verified}
                            onPress={item.onPress}
                        />
                    )}
                />
            </TouchableWithoutFeedback>
            {/* bottomsheet component */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "90%", "100%"]}
                autoSnapAt={2}
                sheetTitle={""}
                sheetSubtitle={""}
            >   
                {/* logistics info component */}
                <LogisticsInfo 
                    stats={stats}
                    locationsList={locationsList}
                    backgroundColor={background}
                />
                {/* bottomsheet primary button */}
                <ModalButton
                    name={"Add Komitex"}
                    onPress={openPopUpModal}
                    emptyFeilds={false}
                />
            </CustomBottomSheet>
            {/* pop up modal */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpBottomSheetModalRef}
                closeModal={closeAllModal}
                snapPointsArray={["40%"]}
                autoSnapAt={0}
                sheetTitle={false}
                sheetSubtitle={false}
            >   
                <View style={style.popUpContent}>
                    <SuccessPrompt />
                    <Text style={style.popUpHeading}>
                        Komitex Succesfully Added
                    </Text>
                    <Text style={style.popUpParagraph}>
                        Hi Raymond, You have successfully linked your store to Komitex Logistics
                    </Text>
                    <ModalButton
                        name={"Done"}
                        onPress={() => {navigation.navigate("Inventory")}}
                    />
                </View>
            </PopUpBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: background,
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headingText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: bodyText,
        marginBottom: 24
    },
    popUpContent: {
        flex: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popUpHeading: {
        fontSize: 16,
        fontFamily: 'mulish-bold',
        textAlign: 'center',
        color: black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: bodyText,
    },
})
 
export default Products;