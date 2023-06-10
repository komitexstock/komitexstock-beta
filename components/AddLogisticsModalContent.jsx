import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import SearchBar from "./SearchBar";
import { useState } from "react";

const AddLogisticsModalContent = ({handleSelectedLogistics}) => {

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const logisticsData = [
        {
            id: 1,
            name: "Fedex",
            imageUrl: require("../assets/images/fedex.png")
        },
        {
            id: 2,
            name: "UPS",
            imageUrl: require("../assets/images/ups.png")
        },
        {
            id: 3,
            name: "DHL",
            imageUrl: require("../assets/images/dhl.png")
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
                <Text style={style.modalHeading}>Available Logistics</Text>
            </View>
            <View style={style.listWrapper}>
                <TouchableOpacity
                    style={style.list}
                    onPress={() => handleSelectedLogistics("Komitex Logistics")}
                >   
                    <Image
                        style={style.logisticsImage}
                        source={require("../assets/images/komitex.png")}
                    />
                    <Text style={style.listText}>Komitex Logistics</Text>
                </TouchableOpacity>
                {logisticsData.map((data) => (
                    <TouchableOpacity
                        style={style.list}
                        key={data.id}
                        onPress={() => handleSelectedLogistics(data.name)}
                    >   
                        <Image
                            style={style.logisticsImage}
                            source={data.imageUrl}
                        />
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
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
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