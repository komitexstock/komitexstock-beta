// recat native component
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// searchbar
import SearchBar from "./SearchBar";
// react hooks
import { useState } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// color
import VerifiedIcon from "../assets/icons/VerifiedIcon";
// color
import { background, inputBorder, black } from "../style/colors";

const AddLogisticsModalContent = ({handleSelectedLogistics}) => {
    // handleSelectedLogistics => function

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    // logistics list
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

    // select logistics by company_id
    const getLogistics = (company_id) => {
        const selectedLogistics = logisticsData.find((logistics) => logistics.company_id === company_id);

        return handleSelectedLogistics(selectedLogistics);
    }

    // render AddLogisticsModalContent component
    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                backgroundColor={background}
            />
            <View>
                <Text style={style.modalHeading}>Available Logistics</Text>
            </View>
            <BottomSheetScrollView style={style.listWrapper}>
                {/* list of available logistics */}
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

// stylesheet
const style = StyleSheet.create({
    modalHeading: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        marginVertical: 10,
        color: black,
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
        gap: 4,
        borderBottomColor: inputBorder,
        borderBottomWidth: 1,
    },
    logisticsImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    listText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: black,
        marginLeft: 6,
    },
})
 
export default AddLogisticsModalContent;