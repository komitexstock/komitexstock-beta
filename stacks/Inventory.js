// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
// colors
import { primaryColor, secondaryColor, white } from "../style/colors";
// react hooks
import { useState } from "react";
// components
import LogisticsCard from "../components/LogisticsCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

const Products = ({navigation}) => {

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // logistics list array
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
    ];

    // render Inventory page
    return (
        <>
            <TouchableWithoutFeedback 
                style={{
                    flex: 1, 
                }}
            >
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <Header
                                navigation={navigation}
                                stackName={"Inventory"}
                                iconFunction={() => {}}
                                icon={<MenuIcon />}
                                removeBackArrow={true}
                                inlineArrow={false}
                                unpadded={true}
                            />

                            {/* search bar */}
                            <SearchBar
                                placeholder={"Search Inventory"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={white}
                            />
                            {/* navigate to AddLogistics page/stack */}
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
                    // allows flatlist to render list in two columns
                    numColumns={2}
                    // render logistics card
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

// stylesheet
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
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    sendOrderButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: secondaryColor,
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