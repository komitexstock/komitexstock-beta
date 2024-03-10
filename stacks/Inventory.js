// react native components
import { 
    View, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Keyboard,
} from "react-native";

// colors
import {
    white,
    background,
    black,
    subText,
    verticalRule,
    primaryColor,
    neutral,
    bodyText
} from "../style/colors";

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

// icons
import SendOrderIcon from "../assets/icons/SendOrderIcon";

// skeleton screen
import InventorySkeleton from "../skeletons/InventorySkeleton";

// utils
import { windowHeight, windowWidth } from "../utils/helpers";

// globals
import { useGlobals } from "../context/AppContext";

// auth
import { useAuth } from "../context/AuthContext"

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    collection,
    getDoc,
    getDocs,
    onSnapshot,
    where,
    query,
    orderBy,
    doc,
} from "firebase/firestore";

const Products = ({navigation, route}) => {

    // toast parameters
    const { setToast } = useGlobals();

    // auth data
    const { authData } = useAuth();

    // tabs, default as Outgoing for Merchants
    const [tab, setTab] = useState("Logistics");

    // listen for tab route parameter
    useEffect(() => {
        if (route?.params?.tab) {
            setTab(route?.params?.tab);
        }

        // show toast if toast parameters are passed
        if (route?.params?.toastType) {
            setToast({
                visible: true,
                type: route?.params?.toastType,
                text: route?.params?.toastText,
            });   
        }

    }, [route])

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

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // logistics list array
    const merchantList = [
        {
            id: 1,
            business_name: "Style Bazaar",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1',
            totalProducts: 17,
            totalStock: 25,
            lowStock: true,
            verified: true,
            onPress: () => {
                navigation.navigate("Products", {
                    business_id: 1,
                    business_name: "Style Bazaar",
                    verified: true,
                });
            }
        },
        {
            id: 2,
            business_name: "Luxe Living Ltd",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fluxe_living_finds.png?alt=media&token=91aa3e09-658b-4900-8558-d10a12590513',
            totalProducts: 15,
            totalStock: 17,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products", {
                    business_id: 1,
                    business_name: "Luxe Living Ltd",
                    verified: true,
                });
            }
        },
        {
            id: 3,
            business_name: "Eco Savvy Emporium",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a',
            totalProducts: 11,
            totalStock: 9,
            lowStock: false,
            verified: true,
            onPress: () => {
                navigation.navigate("Products", {
                    business_id: 1,
                    business_name: "Eco Savvy Emporium",
                    verified: true,
                });
            }
        },
        {
            id: 4,
            business_name: "Tech Treasure Haven",
            banner_image: null,
            totalProducts: 5,
            totalStock: 7,
            lowStock: false,
            verified: false,
            onPress: () => {
                navigation.navigate("Products", {
                    business_id: 1,
                    business_name: "Tech Treasure Haven",
                    verified: false,
                });
            }
        },
    ];

    // products
    const [products, setProducts] = useState([]);

    // logistics
    const [logistics, setLogistics] = useState([]);

    // console.log(logistics)

    // get products, logistics and merchants
    useEffect(() => {

        // fetch total product stock
        const fetchTotalProductStock = async (businessId, productId) => {
            try {
                // const docRef = doc(database, "users", id);
                // const docSnap = await getDoc(docRef);
                // return object of {id: id, manager_name: full_name}
                // return docSnap.data().full_name;
                return 0;

            } catch (error) {
                console.log("Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch low stock and total stock
        const fetchStock = async (merchantBusinessId, logisticsBusinessId) => {
            try {
                // const docRef = doc(database, "users", id);
                // const docSnap = await getDoc(docRef);
                // return object of {id: id, manager_name: full_name}
                // return docSnap.data().full_name;
                return {
                    low_stock: true,
                    total_stock: 0
                };

            } catch (error) {
                console.log("Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch logistics/merchant business details
        const fetchBusiness = async (businessId) => {
            try {
                const docRef = doc(database, "businesses", businessId);
                const docSnap = await getDoc(docRef);
                return {
                    banner_image: docSnap.data().banner_image,
                    business_name: docSnap.data().business_name,
                    verified: docSnap.data().verified,
                };
            } catch (error) {
                console.log("fetchBusiness Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch total logistics locations
        const fetchTotalLocations = async (businessId) => {
            try {
                const collectionRef = collection(database, "locations");
                const q = query(
                    collectionRef,
                    where("business_id", "==", businessId),
                );

                // get docs
                const querySnapshot = await getDocs(q);

                // return total locations
                return querySnapshot.size;

            } catch (error) {
                console.log("fetchTotalLocations: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch product name
        const fetchProductName = async (productId) => {
            try {
                const docRef = doc(database, "products", productId);
                const docSnap = await getDoc(docRef);
                return docSnap.data().product_name;
            } catch (error) {
                console.log("Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }


        // fetch products
        const fetchProducts = async (businessId) => {
            try {
                const collectionRef = collection(database, "merchant_products");
                let q = query(
                    collectionRef,
                    where("business_id", "==", businessId),
                    orderBy("created_at")
                );
                // variable to stroe raw warehouse array
                
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let productsArray = [];

                    for (const doc of querySnapshot.docs) {
                        // product data
                        const productData = doc.data();

                        // Fetch total stock for the product across all merchants
                        const totalStock = await fetchTotalProductStock(businessId, productData?.product_id);

                        // Fetch product name
                        const productName = await fetchProductName(productData?.product_id);
                        
                        const product = {
                            id: doc?.id,
                            product_name: productName,
                            price: productData.price,
                            quantity: totalStock,
                            product_image: productData.product_image, // produc
                            onPress: () => handleEditProduct(doc?.id),
                        };
                        productsArray.push(product);
                    }

                    // set products
                    setProducts(productsArray);

                    // disable page loading state
                    setPageLoading(false);

                    // reste warehouse list
                    // warehouseList = [];
                    
                }, (error) => { //handle errors
                    console.log("Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });
                    setPageLoading(false);
                });
    
                return unsubscribe;
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable page loading state
                setPageLoading(false);
            }
        };

        // fetch logistics
        const fetchLogistics = async (businessId) => {
            try {
            const collectionRef = collection(database, "business_partners");
            let q = query(
                collectionRef,
                where("merchant_business_id", "==", businessId),
                orderBy("created_at")
            );
        
            const querySnapshot = await getDocs(q);
            const logisticsArray = [];
        
            const logisticsPromises = querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                if (!data.deactivated) {
                    const logisticsId = doc.data().logistics_business_id;
            
                    // Fetch all business information, stock, and total locations in parallel
                    const [business, stock, totalLocations] = await Promise.all([
                        fetchBusiness(logisticsId),
                        fetchStock(businessId, logisticsId),
                        fetchTotalLocations(logisticsId)
                    ]);
            
                    const logisticsItem = {
                        id: doc?.id,
                        business_name: business?.business_name,
                        banner_image: business.banner_image,
                        verified: business?.verified,
                        totalLocations: totalLocations,
                        totalStock: stock?.total_stock,
                        lowStock: stock.low_stock,
                        onPress: () => {
                            navigation.navigate("Products", {
                                business_id: logisticsId,
                                business_name: business?.business_name,
                                verified: business?.verified,
                            });
                        }
                    };
            
                    logisticsArray.push(logisticsItem);
                }
            });
        
            await Promise.all(logisticsPromises);
        
            // Add new logistics card
            const addNew = {
                id: Math.random(),
                onPress: () => navigation.navigate("AddLogistics"),
                addNew: true,
            };
            logisticsArray.push(addNew);
        
            // Set logistics
            setLogistics(logisticsArray);
            } catch (error) {
            console.log("Fetch Logitics Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        
            // Disable page loading state
            setPageLoading(false);
            }
        };

        // fecth products
        const unsubscribeProducts = fetchProducts(authData?.business_id);

        // fetch logistics
        const unsubscribeLogistics = fetchLogistics(authData?.business_id);

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            // Unsubscribe from snapshot listener once unsubscribeLogistics is resolved
            unsubscribeLogistics.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
            // Unsubscribe from snapshot listener once unsubscribeProducts is resolved
            unsubscribeProducts.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });

        };

    }, []);

    // merchant stats, stats that would be viewed by a merchnat account
    const merchantStats = [
        {
            id: 1,
            title: "Total Logistics",
            presentValue: logistics.length - 1,
            oldValue: null,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Products",
            presentValue: products.length,
            oldValue: null,
            decimal: false,
        },
    ];

    // handle edit product
    const handleEditProduct = (id) => {

        // selected products
        const selectedProduct = products.find(product => product.id === id);

        // product Scope, variable to control whether a product is being viewed
        // accross multiple logistics or across a single logistics with multiple warehouses
        const productScope = "Logistics";

        navigation.navigate("EditProduct", {
            id: selectedProduct?.id,
            product_name: selectedProduct?.product_name,
            initial_price: selectedProduct?.price,
            quantity: selectedProduct?.quantity,
            image_uri: selectedProduct?.product_image,
            product_scope: productScope,
        });

    };

    // inventories
    const [inventories, setInventories] = useState([]);

    // fetch inventories
    useEffect(() => {

        setInventories(() => {
            // products tab
            if (tab === "Products") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...products
                ];
            }

            // merchants tab for logistics accounts
            if (authData?.account_type === "Logistics") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...merchantList
                ];
            } 
            
            // logistics tab for merchants accounts
            if (authData?.account_type === "Merchant") {
                return [
                    {id: "stickyLeft"},
                    {id: "stickyRight"},
                    ...logistics
                ];
            }
        });
        
    }, [tab, products, logistics])

    // reset searchQuery if tab is changed
    useEffect(() => {
        setSearchQuery("");
    }, [tab]);

    // sticky header offset
    const stickyHeaderOffset = useRef(0);
    const [scrollOffset, setScrollOffset] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const handleScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        setScrollOffset(yOffset);
    }

    // flat list ref
    const flatListRef = useRef();

    // function to scrool to target offset
    const handleScrollToTarget = (offset) => {
        console.log("Offset: ", offset);
        // scroll to target offset
        flatListRef.current.scrollToOffset({ offset, animated: true });
    };


    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                // just scroll to the point of the sticky header
                handleScrollToTarget(stickyHeaderOffset.current);
                setScrollOffset(stickyHeaderOffset.current);

                console.log("Keyboard Open");
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
            console.log("Keyboard Closed");
        });
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [scrollOffset]);

    // render Inventory page
    return (<>
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
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    stickyHeaderIndices={[1]}
                    
                    columnWrapperStyle={tab === "Logistics" ? style.logisticsContainer : style.productContainer}
                    style={style.listWrapper}
                    contentContainerStyle={style.contentContainer}
                    key={tab}
                    keyExtractor={item => item.id}
                    data={(() => {
                        // if there is no search key word, return inventories
                        if (!searchQuery) return inventories;
                        
                        // filtered inventory variable
                        let filteredInventories;

                        if (tab === "Logistics") {
                            // filter logistics by business name in search bar
                            filteredInventories = logistics.filter(inventory => {
                                return inventory?.business_name?.toLowerCase().includes(searchQuery.toLowerCase());
                            });

                            // Add new logistics card
                            const addNew = {
                                id: Math.random(),
                                onPress: () => navigation.navigate("AddLogistics"),
                                addNew: true,
                            };

                            // push add new logistics card
                            filteredInventories.push(addNew);
                        } else if (tab === "Products") {
                            // filter products by product name in search bar
                            filteredInventories = products.filter(inventory => {
                                return inventory?.product_name?.toLowerCase().includes(searchQuery.toLowerCase());
                            })
                        }

                        // return filtered inventories
                        return [
                            {id: "stickyLeft"},
                            {id: "stickyRight"},
                            ...filteredInventories,
                        ];
                    })()} // auto call function
                    // allows flatlist to render list in two columns
                    numColumns={2}
                    ListHeaderComponent={<>
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
                                    wrapperStyle={{marginBottom: 30}}
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
                    </>}
                    // render business card and product card
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
                                            businessName={item.business_name}
                                            bannerImage={item.banner_image}
                                            totalLocations={item?.totalLocations}
                                            totalProducts={item?.totalProducts}
                                            totalStock={item.totalStock}
                                            lowStock={item.lowStock}
                                            verified={item.verified}
                                            onPress={item.onPress}
                                            addNew={item?.addNew}
                                            searchQuery={searchQuery}
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
                                        imageUrl={item?.product_image}
                                        onPress={item?.onPress}
                                        searchQuery={searchQuery}
                                    />
                                </View>
                            )
                        }
                    }}
                    ListFooterComponent={<>
                        {tab === "Products" && products.length === 0 && (
                            <View style={style.emptyOrderWrapper}>
                                <SendOrderIcon />
                                <Text style={style.emptyOrderHeading}>Add your first product</Text>
                                <Text style={style.emptyOrderParagraph}>
                                    Add your products to your stores inventory 
                                </Text>
                            </View>
                        )}
                    </>}
                />
            </TouchableWithoutFeedback>
        </>) : <InventorySkeleton accountType={authData?.account_type} />}
    </>);
}

// stylesheet
const style = StyleSheet.create({
    contentContainer: {
        minHeight: windowHeight + 42,
    },
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
    emptyOrderWrapper: {
        height: 150,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
    },
    emptyOrderHeading: {
        color: black,
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        marginTop: 12,
        marginBottom: 8,
    },
    emptyOrderParagraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
        width: 178,
        textAlign: 'center',
    },
})
 
export default Products;