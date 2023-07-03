// react native
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    BackHandler
} from "react-native";
// component
import Header from "../components/Header";
import LogisticsCard from "../components/LogisticsCard";
import LogisticsInfo from "../components/LogisticsInfo";
import ModalButton from "../components/ModalButton";
import CustomBottomSheet from "../components/CustomBottomSheet";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessPrompt from "../components/SuccessPrompt";
import CautionPrompt from "../components/CautionPrompt";
// react hooks
import { useState, useRef, useEffect } from "react";
// color
import { black, bodyText, white } from "../style/globalStyleSheet";

const Logistics = ({navigation}) => {

    // state to confimr deactivation of logistics
    const [confirmDeactivation, setConfirmDeactivation] = useState(false);

    // state to store if pop up is visible
    const [popUpVisible, setPopUpVisible] = useState(false);

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // use effect to close modal if back button is pressed
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // if pop up is visible
            if(popUpVisible) {
                // close pop up
                closePopUpModal();
                return true;
            } else {
                if (showOverlay) {
                    // if modal is open, close modal
                    closeModal();
                    return true;
                } else {
                    // if modal isnt open simply navigate back
                    return false;
                }
            }

        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay, popUpVisible]);

    // modal ref
    const bottomSheetModalRef = useRef(null);

    // popUp modal ref
    const popUpBottomSheetModalRef = useRef(null);

    // state to control popupModal snap points array
    const [snapPointsArray, setSnapPointsArray] = useState(["45%"])

    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    // function to open bottom sheet popup
    const closePopUpModal = () => {
        popUpBottomSheetModalRef.current?.close();
        setConfirmDeactivation(false);
        setSnapPointsArray(["45%"])
        setPopUpVisible(false);
    };
    
    // function to close bottom sheet popup
    const openPopUpModal = () => {
        popUpBottomSheetModalRef.current?.present();
        setPopUpVisible(true);
    }

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            totalLocations: 17,
            totalStock: 25,
            lowStock: true,
            onPress: openModal,
            addNew: false 
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            totalLocations: 15,
            totalStock: 17,
            lowStock: false,
            onPress: openModal,
            addNew: false,
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            totalLocations: 11,
            totalStock: 9,
            lowStock: false,
            onPress: openModal,
            addNew: false,
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            onPress: openModal,
            addNew: false,
        },
        {
            id: 5,
            logistics: null,
            imageUrl: null,
            totalLocations: null,
            totalStock: null,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AddLogistics");
            },
            addNew: true
        }
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

    // function to confirm deactivation of logistics
    const handleDeactivation = () => {
        setSnapPointsArray(["38%"])
        setConfirmDeactivation(true);
    }
    
    return (
        <>
            <FlatList 
                // disable vertical scroll indicator
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={style.headerWrapper}>
                        <Header 
                            navigation={navigation} 
                            stackName={"Logistics"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                    </View>
                }
                columnWrapperStyle={style.listContainer}
                style={style.listWrapper}
                keyExtractor={item => item.id}
                data={logisticsList}
                // render list items in two columns
                numColumns={2}
                renderItem={({ item }) => (
                    // logistics card
                    <LogisticsCard
                        logistics={item.logistics}
                        imageUrl={item.imageUrl}
                        totalLocations={item.totalLocations}
                        totalStock={item.totalStock}
                        lowStock={item.lowStock}
                        onPress={item.onPress}
                        addNew={item.addNew}
                    />
                )}
            />
            {/* custome bottom sheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "90%", "100%"]}
                autoSnapAt={3}
                sheetTitle={""}
                sheetSubtitle={""}
            >   
                {/* logistics info */}
                <LogisticsInfo 
                    stats={stats}
                    locationsList={locationsList}
                    backgroundColor={"#f8f8f8"}
                />
                {/* modal button */}
                <ModalButton
                    name={"Deactivate Logistics"}
                    onPress={openPopUpModal}
                    emptyFeilds={false}
                    secondaryButton={true}
                />
            </CustomBottomSheet>
            {/* popup bottomsheet modal */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpBottomSheetModalRef}
                closeModal={closePopUpModal}
                snapPointsArray={snapPointsArray}
                autoSnapAt={0}
                sheetTitle={false}
                sheetSubtitle={false}
            >   
                {/* modal content to confirm deactivation */}
                { !confirmDeactivation ? (
                    <View style={style.popUpContent}>
                        <CautionPrompt />
                        <Text style={style.popUpHeading}>
                            Deactivate Logistics
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Are you sure you want to deactivate Komitex Logistics
                        </Text>
                        <View style={style.popUpButtonWrapper}>
                            <ModalButton
                                name={"Yes, deactivate"}
                                onPress={handleDeactivation}
                            />
                            <ModalButton
                                name={"No, cancel"}
                                onPress={closePopUpModal}
                                secondaryButton={true}
                            />
                        </View>
                    </View>
                ) : (
                    // modal content to acknowledge deactivation
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Komitex Succesfully Deactivated
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully deactivated Komitex Logistics
                        </Text>
                        <ModalButton
                            name={"Done"}
                            onPress={() => {
                                closeModal();
                                closePopUpModal();
                            }}
                        />
                    </View>
                )}
            </PopUpBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    headerWrapper: {
        paddingVertical: 20,
    },
    listWrapper: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        marginBottom: 70,
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    addNewLogistics: {
        minWidth: "40%",
        maxWidth: "50%",
        height: 180,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
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
        color:  black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        textAlign: 'center',
        color: bodyText,
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    }
})
 
export default Logistics;