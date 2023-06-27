import { 
    View, 
    Text, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
} from "react-native";
import Header from "../components/Header";
import { useState, useRef } from "react";
import SelectLogisticsCard from "../components/SelectLogisticsCard";
import SearchBar from "../components/SearchBar";
import CustomBottomSheet from "../components/CustomBottomSheet";
import ModalButton from "../components/ModalButton";
import LogisticsInfo from "../components/LogisticsInfo";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessPrompt from "../components/SuccessPrompt";

const Products = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal ref
    const bottomSheetModalRef = useRef(null);
    
    // popUp modal ref
    const popUpBottomSheetModalRef = useRef(null);

    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    const closePopUpModal = () => {
        popUpBottomSheetModalRef.current?.close();
    };

    // function to open bottom sheet modal
    const openPopUpModal = () => {
        popUpBottomSheetModalRef.current?.present();
    }

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
            <TouchableWithoutFeedback 
                style={{
                    flex: 1, 
                    width: "100%", 
                    height: "100%"
                }}
            >
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <Header 
                                navigation={navigation} 
                                stackName={"Add Logistics"} 
                                iconFunction={null} 
                                icon={null} 
                            />
                            <Text style={style.headingText}>
                                Select a preferred logistics partner for efficient inventory management and timely order fulfillment.
                            </Text>
                            <SearchBar
                                placeholder={"Search for a logistics or location"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={"#ffffff"}
                            />
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={logisticsList}
                    numColumns={2}
                    renderItem={({ item, index }) => (
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
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "90%", "100%"]}
                autoSnapAt={2}
                sheetTitle={""}
                sheetSubtitle={""}
            >   
                <LogisticsInfo 
                    stats={stats}
                    locationsList={locationsList}
                    backgroundColor={"#f8f8f8"}
                />
                <ModalButton
                    name={"Add Komitex"}
                    onPress={openPopUpModal}
                    emptyFeilds={false}
                />
            </CustomBottomSheet>
            <PopUpBottomSheet
                bottomSheetModalRef={popUpBottomSheetModalRef}
                closeModal={closePopUpModal}
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
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: "rgba(34, 34, 34, 0.6)",
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
        color: 'rgba(34, 34, 34, 1)',
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: 'rgba(34, 34, 34, 0.8)',
    },
})
 
export default Products;