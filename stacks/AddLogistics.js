import { 
    View, 
    Text, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Header from "../components/Header";
import { useState, useRef } from "react";
import SelectLogisticsCard from "../components/SelectLogisticsCard";
import SearchBar from "../components/SearchBar";
import CustomBottomSheet from "../components/CustomBottomSheet";
import LogisticsLocation from "../components/LogisticsLocations";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import StatCard from "../components/StatCard";
import StatWrapper from "../components/StatWrapper";
import ModalButton from "../components/ModalButton";

const Products = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

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
                <BottomSheetScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={style.bottomSheetContainer}
                    >
                        <View style={style.logisticsMainInfo}>
                            <Image 
                                source={require('../assets/images/komitex.png')}
                                style={style.logisticsImage}
                            />
                            <Text style={style.logisticsName}>
                                Komitex Logistics
                            </Text>
                            <Text style={style.logisticsLocations}>17 Locations</Text>
                        </View>
                        <StatWrapper>
                            {stats.map(stat => (
                                <StatCard
                                    key={stat.id}
                                    title={stat.title}
                                    presentValue={stat.presentValue}
                                    oldValue={stat.oldValue}
                                    decimal={stat.decimal}
                                    unit={stat.unit}
                                    unitPosition={stat.unitPosition}
                                    backgroundColor={"#f8f8f8"}
                                />
                            ))}
                        </StatWrapper>
                        <LogisticsLocation
                            locations={locationsList}
                            backgroundColor={"#f8f8f8"}
                        />
                    </View>
                </BottomSheetScrollView>
                <ModalButton
                    name={"Add Komitex"}
                    onPress={() => {}}
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
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: "rgba(34, 34, 34, 0.6)",
        marginBottom: 24
    },
    bottomSheetContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logisticsMainInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 20,
        width: "100%",
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginBottom: 12
    },
    logisticsName: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        color: "rgba(34, 34, 34, 1)",
        marginBottom: 4,
    },
    logisticsLocations: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: "rgba(34, 34, 34, 0.6)",
    },
})
 
export default Products;