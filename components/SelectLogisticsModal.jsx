// recat native component
import { View, Text, StyleSheet } from "react-native";
// searchbar
import SearchBar from "./SearchBar";
// react hooks
import { useState } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// icon
// color
import { background, black, listSeparator, bodyText } from "../style/colors";
// components
import BusinessListItem from "./BusinessListItem";


const SelectLogisticsModal = ({logistics, searchQuery, setSearchQuery, onPress}) => {
    // onPress => function

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
                    {logistics.map((data) => (
                        <BusinessListItem
                            key={data?.business_id}
                            banner_image={data?.banner_image}
                            verified={data?.verified}
                            business_name={data?.business_name}
                            onPress={() => onPress(data?.business_id)}
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
 
export default SelectLogisticsModal;