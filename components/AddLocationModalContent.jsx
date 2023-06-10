import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "./SearchBar";
import { useState } from "react";

const AddLocationModalContent = ({handleSelectedLocation}) => {

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const logisticsData = [
        {
            id: 1,
            name: "Warri (₦3,500)",
        },
        {
            id: 2,
            name: "Benin (₦4,500)",
        },
        {
            id: 3,
            name: "Asaba (₦4,500)",
        },
    ];

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
            <View style={style.listWrapper}>
                {logisticsData.map((data) => (
                    <TouchableOpacity
                        style={style.list}
                        key={data.id}
                        onPress={() => handleSelectedLocation(data.name)}
                    >   
                        <Text style={style.listText}>{data.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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