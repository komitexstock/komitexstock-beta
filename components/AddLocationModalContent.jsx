import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const AddLocationModalContent = ({handleSelectedLocation}) => {

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const locations = [
        {
            id: Math.random(),
            location: "Asaba",
            charge: 4000,
        },
        {
            id: Math.random(),
            location: "Benin City",
            charge: 5000,
        },
        {
            id: Math.random(),
            location: "Sapele",
            charge: 3500,
        },
        {
            id: Math.random(),
            location: "Ughelli",
            charge: 4000,
        },
        {
            id: Math.random(),
            location: "Agbor",
            charge: 3500,
        },
        {
            id: Math.random(),
            location: "Warri",
            charge: 4500,
        },
        {
            id: Math.random(),
            location: "Abraka",
            charge: 4000,
        },
        {
            id: Math.random(),
            location: "Ibusa",
            charge: 3500,
        },
        {
            id: Math.random(),
            location: "Okpanam",
            charge: 3000,
        },
        {
            id: Math.random(),
            location: "Uromi",
            charge: 4000,
        },
        {
            id: Math.random(),
            location: "Ogwashi-Uku",
            charge: 3500,
        },
        {
            id: Math.random(),
            location: "Auchi",
            charge: 4500,
        },
        {
            id: Math.random(),
            location: "Agbor",
            charge: 3500,
        },
        {
            id: Math.random(),
            location: "Eku",
            charge: 4000,
        }
    ]

    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />
            <View>
                <Text style={style.modalHeading}>Available Locations</Text>
            </View>
            <BottomSheetScrollView 
                showsVerticalScrollIndicator={false}
                style={style.listWrapper}
            >
                {locations.map((data) => (
                    <TouchableOpacity
                        style={style.list}
                        key={data.id}
                        onPress={() => handleSelectedLocation(data.name)}
                    >   
                        <Text style={style.listText}>{data.location} (₦{data.charge})</Text>
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
        height: 30,
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
 
export default AddLocationModalContent;