// react native components
import { 
    View, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
// colors
import { primaryColor, secondaryColor, white, background } from "../style/colors";
// react hooks
import { useEffect, useState } from "react";
// components
import LogisticsCard from "../components/LogisticsCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
// skeleton screen
import InventorySkeleton from "../skeletons/InventorySkeleton";

const Products = ({navigation}) => {

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);   
    })

    // logistics list array
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            totalLocations: 17,
            totalStock: 25,
            lowStock: true,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            totalLocations: 15,
            totalStock: 17,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            totalLocations: 11,
            totalStock: 9,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
    ];

    // render Inventory page
    return (
        <>
            {!pageLoading ? (
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
                                    disableFilter={true}
                                />
                                {/* navigate to AddLogistics page/stack */}
                                <CustomButton
                                    secondaryButton={true}
                                    name={"Add Logistics"}
                                    shrinkWrapper={true}
                                    onPress={() => navigation.navigate("AddLogistics")}
                                    unpadded={true}
                                    wrapperStyle={{marginBottom: 22}}
                                />
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
                                verified={item.verified}
                                onPress={item.onPress}
                            />
                        )}
                    />
                </TouchableWithoutFeedback>
            ) : <InventorySkeleton />}
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
        backgroundColor: background,
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