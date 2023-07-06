// react native component
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// component
import SearchBar from "./SearchBar";
// react hooks
import { useState } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { background, black, inputBorder } from "../style/colors";

const AddLocationModalContent = ({handleSelectedLocation}) => {
    // handleSelectedLocation => function

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    // list of locations
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
    ];

    // handle selected location
    const getLocation = (id) => {
        const selectedLocation = locations.find((location) => location.id === id);

        return handleSelectedLocation(selectedLocation);
    }

    // render AddLocationModalContent component
    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                backgroundColor={background}
            />
            <View>
                <Text style={style.modalHeading}>Available Locations</Text>
            </View>
            <BottomSheetScrollView 
                showsVerticalScrollIndicator={false}
                style={style.listWrapper}
            >
                {locations.map((data, index) => (
                    // list of location
                    <TouchableOpacity
                        style={[style.list, locations.length - 1 === index ? { borderBottomWidth: 0 } : null]}
                        key={data.id}
                        onPress={() => getLocation(data.id)}
                    >   
                        <Text style={style.listText}>{data.location}</Text>
                        <Text style={style.listText}>₦{data.charge}</Text>
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
        justifyContent: 'space-between',
        gap: 10,
        borderBottomColor: inputBorder,
        borderBottomWidth: 1
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
    },
})
 
export default AddLocationModalContent;