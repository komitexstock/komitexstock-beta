// react native components
import { 
    View, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    Text
} from "react-native";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
// colors
import { primaryColor, secondaryColor, white, background, black, subText, verticalRule } from "../style/colors";
// react hooks
import { useEffect, useState, useRef } from "react";
// components
import BusinessCard from "../components/BusinessCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import StatCard from "../components/StatCard";
import Avatar from "../components/Avatar";
import StatWrapper from "../components/StatWrapper";
// skeleton screen
import InventorySkeleton from "../skeletons/InventorySkeleton";
// auth
import { useAuth } from "../context/AuthContext"
import { windowWidth } from "../utils/helpers";

const Products = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Inventories",
            presentValue: 10,
            oldValue: null,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Products",
            presentValue: 215,
            oldValue: null,
            decimal: false,
        },
    ];

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
            imageUrl: '../assets/images/komitex.png',
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
            imageUrl: '../assets/images/dhl.png',
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
            imageUrl: '../assets/images/fedex.png',
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
            imageUrl: '../assets/images/ups.png',
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 5,
            logistics: "Amazon Logistics",
            imageUrl: '../assets/images/amazon.png',
            totalLocations: 20,
            totalStock: 68,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 6,
            logistics: "On Trac",
            imageUrl: '../assets/images/ontrac.png',
            totalLocations: 17,
            totalStock: 43,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 7,
            logistics: "Laser Ship",
            imageUrl: '../assets/images/lasership.png',
            totalLocations: 18,
            totalStock: 425,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 8,
            logistics: "Tranex",
            imageUrl: '../assets/images/tranex.png',
            totalLocations: 30,
            totalStock: 72,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
    ];

    // logistics list array
    const merchantList = [
        {
            id: 1,
            merchant: "Style Bazaar",
            imageUrl: '../assets/images/style_bazaar.png',
            totalProducts: 17,
            totalStock: 25,
            lowStock: true,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 2,
            merchant: "Luxe Living Ltd",
            imageUrl: '../assets/images/luxe_living_finds.png',
            totalProducts: 15,
            totalStock: 17,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 3,
            merchant: "Eco Savvy Emporium",
            imageUrl: '../assets/images/eco_savvy_emporium.png',
            totalProducts: 11,
            totalStock: 9,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 4,
            merchant: "Tech Treasure Haven",
            imageUrl: null,
            totalProducts: 5,
            totalStock: 7,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
    ];

    const [inventories, setInventories] = useState(() => {
        if (authData?.account_type === "Logistics") {
            return [
                {id: "stickyLeft"},
                {id: "stickyRight"},
                ...merchantList
            ];
        } else {
            return logisticsList;
        }
    });

    // sticky header offset
    const stickyHeaderOffset = useRef(0);
    const [scrollOffset, setScrollOffset] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        setScrollOffset(yOffset);
    }

    // render Inventory page
    return (
        <>
            {!pageLoading ? (<>
                <Header
                    navigation={navigation}
                    stackName={authData?.account_type === "Merchant" ? "Inventory" : ""}
                    removeBackArrow={true}
                    inlineArrow={authData?.account_type !== "Merchant"}
                    backgroundColor={background}
                />
                {authData?.account_type !== "Merchant" && (
                    <View style={style.warehouseBannerWrapper}>
                        <View style={style.warehouseBanner}>
                            <View style={style.warehoseInfo}>
                                <Text style={style.warehouseName}>Warri</Text>
                                <Text style={style.warehouseAddress}>
                                    16 Ekpan junction, delta state, Nigeria
                                </Text>
                            </View>
                            <View style={style.verticalRule} />
                            <View style={style.warehoseManagerInfo}>
                                <Avatar 
                                    fullname={"Abiodun Johnson"}
                                />
                                <View style={style.managerText}>
                                    <Text style={style.managerTitle}>
                                        Warehouse Manager
                                    </Text>
                                    <Text style={style.managerName}>
                                        Abiodun Johnson
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                <TouchableWithoutFeedback 
                    style={{
                        flex: 1, 
                    }}
                >
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        onScroll={animateHeaderOnScroll}
                        stickyHeaderIndices={authData?.account_type === "Logistics" ? [1] : [0]}
                        ListHeaderComponent={
                            <View 
                                style={[
                                    style.headerWrapper,
                                    // if account is merchant and scroll height is greater than offset activate shadow
                                    authData?.account_type === "Merchant" && scrollOffset > stickyHeaderOffset.current && {elevation: 3}
                                ]}
                                onLayout={e => {

                                    stickyHeaderOffset.current = authData.account_type === "Logistics" ? e.nativeEvent.layout.height : 0;
                                }}
                            >
                                { authData?.account_type === "Merchant" ? (<>
                                    {/* search bar */}
                                    <SearchBar
                                        placeholder={"Search inventory"}
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
                                </>) : (<>
                                    {/* stats */}
                                    <StatWrapper containerStyle={{marginBottom: 30}}>
                                        {stats.map(stat => (
                                            <StatCard
                                                key={stat.id}
                                                title={stat.title}
                                                presentValue={stat.presentValue}
                                                oldValue={stat.oldValue}
                                                decimal={stat.decimal}
                                            />
                                        ))}
                                    </StatWrapper>
                                </>)}
                            </View>
                        }
                        columnWrapperStyle={style.listContainer}
                        style={style.listWrapper}
                        keyExtractor={item => item.id}
                        data={inventories}
                        // allows flatlist to render list in two columns
                        numColumns={2}
                        // render logistics card
                        renderItem={({ item, index }) => {
                            if (item.id === "stickyLeft") {
                                return (
                                    <View 
                                        style={[
                                            style.stickyHeader,
                                            // if account is logistics and scroll height is greater than offset activate shadow
                                            authData?.account_type !== "Merchant" && scrollOffset > stickyHeaderOffset.current && {elevation: 3}
                                        ]}
                                    >
                                        {/* search bar */}
                                        <SearchBar
                                            placeholder={"Search inventory"}
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                            backgroundColor={white}
                                            disableFilter={true}
                                        />
                                    </View>
                                )
                            } else if (item.id === "stickyRight") {
                                return <></>
                            } else {
                                return (
                                    <View style={index % 2 === 0 ? style.leftCard : style.rightCard}>
                                        <BusinessCard
                                            logistics={item?.logistics}
                                            merchant={item?.merchant}
                                            imageUrl={item.imageUrl}
                                            totalLocations={item?.totalLocations}
                                            totalProducts={item?.totalProducts}
                                            totalStock={item.totalStock}
                                            lowStock={item.lowStock}
                                            verified={item.verified}
                                            onPress={item.onPress}
                                        />
                                    </View>
                                )   
                            }
                        }}
                    />
                </TouchableWithoutFeedback>
            </>) : <InventorySkeleton />}
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        // paddingHorizontal: 20,
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
        backgroundColor: background,
        paddingHorizontal: 20,
    },
    stickyHeader: {
        paddingHorizontal: 20,
        width: "100%",
        backgroundColor: background,
    },
    leftCard: {
        width: (windowWidth - 16)/2,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightCard: {
        width: (windowWidth - 16)/2,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    warehouseBannerWrapper: {
        backgroundColor: background,
        paddingBottom: 16,
    },
    warehouseBanner: {
        height: 63,
        width: "100%",
        backgroundColor: white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
    },
    warehoseInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
    },
    warehouseName: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-bold'
    },
    warehouseAddress: {
        color: subText,
        fontSize: 10,
        fontFamily: "mulish-regular",
        maxWidth: 120,
    },
    verticalRule: {
        width: 1,
        height: 43,
        backgroundColor: verticalRule,
    },
    warehoseManagerInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    managerTitle: {
        color: subText,
        fontSize: 10,
        fontFamily: 'mulish-medium',
        marginBottom: 4,
    },
    managerName: {
        color: black,
        fontSize: 10,
        fontFamily: 'mulish-semibold'
    },
})
 
export default Products;