import Header from "../components/Header";
import { FlatList, StyleSheet } from "react-native";
import LogisticsCard from "../components/LogisticsCard";
import { useState, useRef } from "react";
import CustomBottomSheet from "../components/CustomBottomSheet";
import LogisticsInfo from "../components/LogisticsInfo";
import ModalButton from "../components/ModalButton";

const Logistics = ({navigation}) => {

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal ref
    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

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
    
    return (
        <>
            <FlatList 
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                    <Header 
                        navigation={navigation} 
                        stackName={"Logistics"} 
                        iconFunction={null} 
                        icon={null} 
                    />
                }
                columnWrapperStyle={style.listContainer}
                style={style.listWrapper}
                keyExtractor={item => item.id}
                data={logisticsList}
                numColumns={2}
                renderItem={({ item }) => (
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
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "90%", "100%"]}
                autoSnapAt={3}
                sheetTitle={""}
                sheetSubtitle={""}
            >   
                <LogisticsInfo 
                    stats={stats}
                    locationsList={locationsList}
                    backgroundColor={"#f8f8f8"}
                />
                <ModalButton
                    name={"Deactivate Logistics"}
                    onPress={() => {}}
                    emptyFeilds={false}
                    secondaryButton={true}
                />
            </CustomBottomSheet>
        </>
    );
}

const style = StyleSheet.create({
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
        backgroundColor: "#ffffff",
        borderRadius: 12,
        flex: 1,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    }
})
 
export default Logistics;