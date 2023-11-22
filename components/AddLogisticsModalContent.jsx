// recat native component
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// searchbar
import SearchBar from "./SearchBar";
// react hooks
import { useState } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// icon
import VerifiedIcon from "../assets/icons/VerifiedIcon";
// color
import { background, black, listSeparator, bodyText } from "../style/colors";
// components
import BusinessListItem from "./BusinessListItem";


const AddLogisticsModalContent = ({handleSelectedLogistics}) => {
    // handleSelectedLogistics => function

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    // select logistics by business_id
    const getLogistics = (business_id) => {
        const selectedLogistics = logisticsData.find((logistics) => logistics.business_id === business_id);

        return handleSelectedLogistics(selectedLogistics);
    }

    // logistics list
    const logisticsData = [
        {
            business_id: "E3F7J1g4X6r9L2Y",
            business_name: "Komitex Logistics",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8",
            verified: true,
            onPress: () => getLogistics("E3F7J1g4X6r9L2Y"),
        },
        {
            business_id: "H9i2L4t6R3d7K1w",
            business_name: "Fedex",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299",
            verified: true,
            onPress: () => getLogistics("H9i2L4t6R3d7K1w"),
        },
        {
            business_id: "X7y2G4z9Q1a3w6J",
            business_name: "UPS",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0",
            verified: false,
            onPress: () => getLogistics("X7y2G4z9Q1a3w6J"),
        },
        {
            business_id: "N5o8V2s6W3D1r4E",
            business_name: "DHL",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d",
            verified: true,
            onPress: () => getLogistics("N5o8V2s6W3D1r4E"),
        },
    ];

    // render AddLogisticsModalContent component
    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                backgroundColor={background}
                disableFilter={true}
            />
            <View>
                <Text style={style.modalHeading}>Available Logistics</Text>
            </View>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                {/* list of available logistics */}
                <View style={style.listWrapper}>
                    {logisticsData.map((data) => (
                        <BusinessListItem
                            key={data.business_id}
                            banner_image={data.imageUrl}
                            verified={data.verified}
                            business_name={data.business_name}
                            onPress={data.onPress}
                        />
                    ))}
                </View>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 10,    
        width: "100%",
    },
    list: {
        height: 42,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: listSeparator,
        borderBottomWidth: 1,
        paddingVertical: 6,
        width: "100%",
    },
    logisticsDetailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
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
        marginLeft: 8,
    },
    stockText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    },
})
 
export default AddLogisticsModalContent;