import Header from "../components/Header";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import SelectInput from "../components/SelectInput";
import ArrowDown from "../assets/icons/ArrowDown";
import CustomButton from "../components/CustomButton";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import { useState, useRef } from "react";

const AddLogistics = ({navigation}) => {

    // state to store the selected logistics
    const [logistics, setLogistics] = useState(null);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal ref
    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
        setSelectLogisticsActive(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        setSelectLogisticsActive(true);
    }

    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    const locations = [
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
    ]

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    <View style={style.mainContent}>
                        <Header 
                            navigation={navigation} 
                            stackName={"Add Logistics"} 
                            iconFunction={null} 
                            icon={null} 
                        />
                        <Text style={style.headingText}>
                            Select a preferred logistics partner for efficient inventory management and timely order fulfillment.
                        </Text>
                        <SelectInput
                            label={"Select Logistics"}
                            labelIcon={false}
                            placeholder={"Select a preferred logistics partner"}
                            onPress={openModal}
                            icon={<ArrowDown />}
                            value={logistics}
                            active={selectLogisticsActive}
                            inputFor={"Logistics"}
                        />
                        { logistics && (
                            <View style={style.locationsContainer}>
                                <Text style={style.locationsHeading}>Available Locations</Text>
                                <Text style={style.locationsParagraph}>
                                    Find all available locations and the associated fees Komitex offers
                                </Text>
                                <View style={style.locationsList}>
                                    {locations.map((location) => (
                                        <View key={location.id} style={style.locationsItems}>
                                            <Text style={style.locationsText}>{location.location}</Text>
                                            <Text style={style.locationsPrice}>
                                                ₦{location.charge.toLocaleString()}
                                                <Text style={style.decimal}>.00</Text>    
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                    <CustomButton
                        name={logistics ? "Add Komitex" : "continue"}
                        onPress={() => {}}
                        backgroundColor={"#f8f8f8"}
                        fixed={false}
                        inactive={logistics ? false : true}
                    />
                </View>
            </ScrollView>
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "80%"]}
                autoSnapAt={0}
                sheetTitle={"Select Logistics"}
                sheetSubtitle={""}
            >   
                <AddLogisticsModalContent 
                    handleSelectedLogistics={handleSelectedLogistics}
                />
            </CustomBottomSheet>
            
        </>
    );
}

const screenHeight = Dimensions.get('window').height;
const desiredHeight = screenHeight - 100; 

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        // padding: 20,
        display: "flex",
        minHeight: "100%",
    },
    main: {
        display: 'flex',
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    mainContent: {
        padding: 20,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: desiredHeight,
    },
    headingText: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
        width: "100%",
        marginBottom: 24
    },
    locationsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 12,
        gap: 8,
        marginTop: 20,
    },
    locationsHeading: {
        fontFamily: 'mulish-bold',
        color: 'rgba(34, 34, 34, 1)',
        fontSize: 14,
        width: "100%",
    },
    locationsParagraph: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
        width: "100%",
    },
    locationsList: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        width: "100%",
    },
    locationsItems: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
    },
    locationsText: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
    },
    locationsPrice: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 1)',
        fontSize: 12,
    },
    decimal: {
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
    }
})
 
export default AddLogistics;