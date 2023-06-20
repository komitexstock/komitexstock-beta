import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import VerifiedIcon from "../assets/icons/VerifiedIcon";

const AddLogisticsModalContent = ({handleSelectedLogistics}) => {

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const logisticsData = [
        {
            company_id: "E3F7J1g4X6r9L2Y",
            business_name: "Komitex Logistics",
            imageUrl: require("../assets/images/komitex.png"),
            verified: true,
        },
        {
            company_id: "H9i2L4t6R3d7K1w",
            business_name: "Fedex",
            imageUrl: require("../assets/images/fedex.png"),
            verified: true,
        },
        {
            company_id: "X7y2G4z9Q1a3w6J",
            business_name: "UPS",
            imageUrl: require("../assets/images/ups.png"),
            verified: false,
        },
        {
            company_id: "N5o8V2s6W3D1r4E",
            business_name: "DHL",
            imageUrl: require("../assets/images/dhl.png"),
            verified: true,
        },
    ];

    const getLogistics = (company_id) => {
        const selectedLogistics = logisticsData.find((logistics) => logistics.company_id === company_id);

        return handleSelectedLogistics(selectedLogistics);
    }

    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                backgroundColor={"#f8f8f8"}
            />
            <View>
                <Text style={style.modalHeading}>Available Logistics</Text>
            </View>
            <BottomSheetScrollView style={style.listWrapper}>
                {logisticsData.map((data) => (
                    <TouchableOpacity
                        style={style.list}
                        key={data.company_id}
                        onPress={() => getLogistics(data.company_id)}
                    >   
                        <Image
                            style={style.logisticsImage}
                            source={data.imageUrl}
                        />
                        <Text style={style.listText}>{data.business_name}</Text>
                        { data.verified && <VerifiedIcon />}
                    </TouchableOpacity>
                ))}
            </BottomSheetScrollView>
        </>
    );
}

const style = StyleSheet.create({
    modalHeading: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        marginVertical: 10
    },
    listWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,    
    },
    list: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        borderBottomColor: "#E7E5E5",
        borderBottomWidth: 1
    },
    logisticsImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    listText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
    },
})
 
export default AddLogisticsModalContent;