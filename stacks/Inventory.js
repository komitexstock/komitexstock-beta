// react native components
import { 
    View, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
// colors
import { white, background, black, subText, verticalRule, primaryColor, neutral } from "../style/colors";
// react hooks
import { useEffect, useState, useRef } from "react";
// components
import BusinessCard from "../components/BusinessCard";
import ProductCard from "../components/ProductCard";
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

    // tabs, default as Outgoing for Merchants
    const [tab, setTab] = useState("Logistics");

    // stats array
    const logisticsStats = [
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

    // merchant stats, stats that would be viewed by a merchnat account
    const merchantStats = [
        {
            id: 1,
            title: "Total Logistics",
            presentValue: 8,
            oldValue: null,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Products",
            presentValue: 9,
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Flasership.png?alt=media&token=803e763b-63e7-4c57-ab6e-beb2a9c35e54',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ftranex.png?alt=media&token=b7d75e7b-26f2-4d71-83b8-48a24a3167e2',
            totalLocations: 30,
            totalStock: 72,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products");
            }
        },
        {
            id: 9,
            onPress: () => navigation.navigate("AddLogistics"),
            addNew: true,
        }
    ];

    // logistics list array
    const merchantList = [
        {
            id: 1,
            merchant: "Style Bazaar",
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fluxe_living_finds.png?alt=media&token=91aa3e09-658b-4900-8558-d10a12590513',
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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a',
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

    // list of products
    const productsList = [
        {
            id: 1,
            product_name: "Maybach Sunglasses",
            quantity: 7,
            price: 20000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            onPress: () => handleEditProduct(1),
        },
        {
            id: 2,
            product_name: "Accurate Watch",
            quantity: 3,
            price: 33000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Faccurate-watch.png?alt=media&token=4330bcd1-e843-434c-97cb-bf84c49b82b0',
            onPress: () => handleEditProduct(2),
        },
        {
            id: 3,
            product_name: "Black Sketchers",
            quantity: 0,
            price: 35000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fblack-sketchers.png?alt=media&token=a07e02ac-610d-4da0-9527-2b6e9e85d56d',
            onPress: () => handleEditProduct(3),
        },
        {
            id: 4,
            product_name: "Brown Clarks",
            quantity: 11,
            price: 40000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FClarks.jpg?alt=media&token=70431e2c-fbcd-4e1c-9cf3-3d35861f98d3',
            onPress: () => handleEditProduct(4),
        },
        {
            id: 5,
            product_name: "Pheonix Sneakers",
            quantity: 2,
            price: 25000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648',
            onPress: () => handleEditProduct(5),
        },
        {
            id: 6,
            product_name: "Perfectly Useless Morning Watch",
            quantity: 9,
            price: 32000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fperfectly-useless-mornig-watch.png?alt=media&token=edb35f3a-deb6-498b-9c94-d9392745442c',
            onPress: () => handleEditProduct(6),
        },
        {
            id: 7,
            product_name: "Ricochet Watch",
            quantity: 15,
            price: 30000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fricochet-watch.png?alt=media&token=fbf05657-e511-4d1f-a0db-3b9419d4ba5a',
            onPress: () => handleEditProduct(7),
        },
        {
            id: 9,
            product_name: "Timberland",
            quantity: 10,
            price: 35000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722',
            onPress: () => handleEditProduct(9),
        },
        {
            id: 10,
            product_name: "Useless Afternoon Watch",
            quantity: 19,
            price: 32000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fuseless-afternoon-watch.png?alt=media&token=42f68679-4627-4846-a37e-87a1ff4a2a66',
            onPress: () => handleEditProduct(10),
        },
    ];

    const handleEditProduct = (id) => {
        // console.log("right here");
        console.log(inventories);

        const selectedProduct = productsList.find(product => product.id === id);


        // product Scope, variable to control whether a product is being viewed
        // accross multiple logistics or across a single logistics with multiple warehouses
        const productScope = "Logistics";

        navigation.navigate("EditProduct", {
            id: selectedProduct.id,
            product_name: selectedProduct.product_name,
            initial_price: selectedProduct.price,
            quantity: selectedProduct.quantity,
            image_uri: selectedProduct.imageUrl,
            product_scope: productScope,
        });

    }

    const [inventories, setInventories] = useState([]);

    useEffect(() => {

        setInventories(() => {
            if (tab === "Products") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...productsList
                ];
            }

            if (authData?.account_type === "Logistics") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...merchantList
                ];
            } 
            
            if (authData?.account_type === "Merchant") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...logisticsList
                ];
            }
        });
        
    }, [tab])

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
                {authData?.account_type === "Logistics" && (
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
                        stickyHeaderIndices={[1]}
                        ListHeaderComponent={
                            <View 
                                style={style.headerWrapper}
                                onLayout={e => {
                                    stickyHeaderOffset.current = e.nativeEvent.layout.height;
                                }}
                            >
                                { authData?.account_type === "Merchant" ? (<>
                                    {/* stats */}
                                    <StatWrapper containerStyle={{marginBottom: 30}}>
                                        {merchantStats.map(stat => (
                                            <StatCard
                                                key={stat.id}
                                                title={stat.title}
                                                presentValue={stat.presentValue}
                                                oldValue={stat.oldValue}
                                                decimal={stat.decimal}
                                            />
                                        ))}
                                    </StatWrapper>
                                    {/* navigate to AddLogistics page/stack */}
                                    <CustomButton
                                        secondaryButton={true}
                                        name={"Add Products"}
                                        shrinkWrapper={true}
                                        onPress={() => navigation.navigate("AddProduct")}
                                        unpadded={true}
                                        wrapperStyle={{marginBottom: 22}}
                                    />
                                </>) : (<>
                                    {/* stats */}
                                    <StatWrapper containerStyle={{marginBottom: 30}}>
                                        {logisticsStats.map(stat => (
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
                        columnWrapperStyle={tab === "Logistics" ? style.logisticsContainer : style.productContainer}
                        style={style.listWrapper}
                        key={tab}
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
                                            scrollOffset > stickyHeaderOffset.current && {elevation: 3},
                                            // if account is logistics remove some margin at the bottom
                                            // this margin is introduced because of the columnWrapperStyle
                                            authData?.account_type === "Logistics" && {marginBottom: -16}
                                        ]}
                                    >
                                        {/* search bar */}
                                        <SearchBar
                                            placeholder={"Search " + tab}
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                            backgroundColor={white}
                                            disableFilter={true}
                                        />
                                        {/* show tabs for merchnat account */}
                                        {/* page tabs */}
                                        {authData?.account_type === "Merchant" && (
                                            <View style={style.tabContainer}>
                                                <TouchableOpacity 
                                                    style={tab === "Logistics" ? style.tabButtonSelected : style.tabButton}
                                                    onPress={() => setTab("Logistics")}
                                                >
                                                    <Text style={tab === "Logistics" ? style.tabButtonTextSelected : style.tabButtonText}>Logistics</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity 
                                                    style={tab === "Products" ? style.tabButtonSelected : style.tabButton}
                                                    onPress={() => setTab("Products")}
                                                >
                                                    <Text style={tab === "Products" ? style.tabButtonTextSelected : style.tabButtonText}>Products</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                )
                            } else if (item.id === "stickyRight") {
                                return <></>
                            } else {
                                if (tab === "Logistics") {
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
                                                addNew={item?.addNew}
                                            />
                                        </View>
                                    )   
                                }
                                return (
                                    <View 
                                        style={[
                                            index % 2 === 0 && style.productCardWrapperLeft,
                                            index % 2 === 1 && style.productCardWrapperRight,
                                        ]}
                                    >
                                        <ProductCard
                                            product_name={item?.product_name}
                                            quantity={item?.quantity}
                                            price={item?.price}
                                            imageUrl={item?.imageUrl}
                                            onPress={item?.onPress}
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
    logisticsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    productContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
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
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        height: 32,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabButton: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        flexDirection: "row",
        gap: 10,
    },
    tabButtonSelected: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        borderBottomWidth: 2,
        borderBottomColor: primaryColor,
        flexDirection: "row",
        gap: 10,
    },
    tabButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: neutral,
    },
    tabButtonTextSelected: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
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
    productCardWrapperLeft: {
        width: "50%",
        paddingRight: 8,
        paddingLeft: 20,
    },
    productCardWrapperRight: {
        width: "50%",
        paddingRight: 20,
        paddingLeft: 8,
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