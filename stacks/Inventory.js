import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import MenuIcon from "../assets/icons/MenuIcon";
import { primaryColor } from "../style/globalStyleSheet";
import { useState } from "react";
import LogisticsCard from "../components/LogisticsCard";
import SearchBar from "../components/SearchBar";

const Products = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            totalLocations: 17,
            totalStock: 25,
            lowStock: true,
            onPress: () => {
                navigation.navigate("Products", {
                    success: false
                });
            }
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            totalLocations: 15,
            totalStock: 17,
            lowStock: false,
            onPress: () => {
                navigation.navigate("Products", {
                    success: false
                });
            }
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            totalLocations: 11,
            totalStock: 9,
            lowStock: false,
            onPress: () => {
                navigation.navigate("Products", {
                    success: false
                });
            }
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            onPress: () => {
                navigation.navigate("Products", {
                    success: false
                });
            }
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
                            <View style={style.header}>
                                <View style={style.navWrapper}>
                                    <Text style={style.headerText}>Inventory</Text>
                                </View>
                                <TouchableOpacity style={style.menuIcon}>
                                    <MenuIcon />
                                </TouchableOpacity>
                            </View>
                            <SearchBar
                                placeholder={"Search Inventory"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={"#ffffff"}
                            />
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("AddLogistics")}
                            >
                                <Text style={style.orderButtonText}>Add Logistics</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={logisticsList}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <LogisticsCard
                            logistics={item.logistics}
                            imageUrl={item.imageUrl}
                            totalLocations={item.totalLocations}
                            totalStock={item.totalStock}
                            lowStock={item.lowStock}
                            onPress={item.onPress}
                        />
                    )}
                />
            </TouchableWithoutFeedback>
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
    headerWrapper: {
        width: "100%",
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        marginBottom: 10,
    },
    navWrapper: {
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    headerText: {
        fontFamily: "mulish-bold",
        fontSize: 20,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: "#ffffff",
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sendOrderButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(7, 66, 124, 0.05)",
        borderRadius: 12,
        marginBottom: 22,
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
})
 
export default Products;