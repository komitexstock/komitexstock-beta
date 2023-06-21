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
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import { useState, useRef, useEffect } from "react";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import ArrowLeft from "../assets/icons/ArrowLeft";
import CustomBottomSheet from "../components/CustomBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ProductCard from "../components/ProductCard";
import AlertNotice from "../components/AlertNotice";
import EditProductContent from "../components/EditProductContent";
// import { BackHandler } from 'react-native';


const Products = ({navigation, route}) => {

    const stats = [
        {
            id: 1,
            title: "Total Products",
            presentValue: 6,
            oldValue: 4,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Items",
            presentValue: 26,
            oldValue: 15,
            decimal: false,
        },
        {
            id: 3,
            title: "Items out of Stock",
            presentValue: 1,
            oldValue: 1,
            decimal: false,
        },
        {
            id: 4,
            title: "Items with Low Stock",
            presentValue: 3,
            oldValue: 4,
            decimal: false,
        },
    ];

    const [successAlert, setSuccessAlert] = useState(null);
    console.table(successAlert);

    const [editProduct, setEditProduct] = useState(false);

    useEffect(() => {
        // if success is true, set success as false after 3 seconds
        if (route.params.success && route.params) {
            setSuccessAlert(route.params.success);
        }
        setTimeout(() => {
            setSuccessAlert(false);
        }, 3000);

    }, [route.params]);

    // useEffect(() => {
    //     const backAction = () => {
    //       // Run your function here
    //       console.log('Back button pressed!');
    //       return true;
    //     };
    
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction
    //     );
    
    //     return () => backHandler.remove();
    // }, []);

    const filterButtons = [
        {
            id: 1,
            title: "Status",
            buttons: [
                {
                id: 1,
                text: "All",
                selected: true,
                },
                {
                id: 2,
                text: "Pending",
                selected: false,
                },
                {
                id: 3,
                text: "Delivered",
                selected: false,
                },
                {
                id: 4,
                text: "Cancelled",
                selected: false,
                },
            ]
        },
        {
            id: 2,
            title: "Logistics",
            buttons: [
                {
                id: 1,
                text: "All",
                selected: true,
                },
                {
                id: 2,
                text: "Komitex",
                selected: false,
                },
                {
                id: 3,
                text: "Fedex",
                selected: false,
                },
                {
                id: 4,
                text: "DHL",
                selected: false,
                },
            ]
        },
        {
            id: 3,
            title: "Date",
            buttons: [
                {
                id: 1,
                text: "Today",
                selected: true,
                },
                {
                id: 2,
                text: "Yesterday",
                selected: false,
                },
                {
                id: 3,
                text: "Manual Selection",
                selected: false,
                },
            ]
        }
    ]

    const [searchQuery, setSearchQuery] = useState("");

    // filter modal reference
    const filterModalRef = useRef(null);

    // search modal refernce
    const searchModalRef = useRef(null);

    // filter modal state
    const [filterModal, setFilterModal] = useState({
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "Filter by",
        overlay: false,
        modalContent: <>
            <View style={style.modalContent}>
                {filterButtons.map(item => (
                    <FilterButtonGroup
                    buttons={item.buttons}
                    title={item.title}
                    key={item.id}
                    />
                ))}
                <View style={style.footerButtonWrapper}>
                    <TouchableOpacity style={style.footerButton}>
                        <Text style={style.footerButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    })

    // search modal state
    const [searchModal, setSearchModal] = useState({
        snapPointsArray: ["50%", "90%"],
        autoSnapAt: 1,
        sheetTitle: "",
        overlay: false,
        modalContent: <>
            <SearchBar 
                placeholder={"Search orders"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={"#f8f8f8"}
            />
            <BottomSheetScrollView style={style.orderSearchResults}>
                
            </BottomSheetScrollView>
        </>
    })

    const closeModal = (type) => {
        if (type === "filter") {
            setFilterModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: false,
                }
            });
            filterModalRef.current?.close();
        } else {
            setSearchModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: false,
                }
            });
            searchModalRef.current?.close();
        }
    };


    const openModal = (type, editProduct) => {
        if (type === "filter") {
            setFilterModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: true,
                }
            });
            filterModalRef.current?.present();
            // if product is selected, set it
        } else {
            setSearchModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: true,
                }
            });
            searchModalRef.current?.present();
        }
        setEditProduct(editProduct);
    }

    const products = [
        {
            id: 1,
            product_name: "Maybach Sunglasses",
            quantity: 7,
            price: 20000,
            imageUrl: require('../assets/images/maybach-sunglasses.png'),
            lowStock: false,
            onPress: () => openModal("search", true),
        },
        {
            id: 2,
            product_name: "Accurate Watch",
            quantity: 3,
            price: 33000,
            imageUrl: require('../assets/images/accurate-watch.png'),
            lowStock: false,
            onPress: () => openModal("search", true),
        },
        {
            id: 3,
            product_name: "Black Sketchers",
            quantity: 0,
            price: 35000,
            imageUrl: require('../assets/images/black-sketchers.png'),
            lowStock: true,
            onPress: () => openModal("search", true),
        },
        {
            id: 4,
            product_name: "Brown Clarks",
            quantity: 11,
            price: 40000,
            imageUrl: require('../assets/images/brown-clarks.png'),
            lowStock: false,
            onPress: () => openModal("search", true),
        },
        {
            id: 5,
            product_name: "Pheonix Sneakers",
            quantity: 2,
            price: 25000,
            imageUrl: require('../assets/images/sneakers.png'),
            lowStock: true,
            onPress: () => openModal("search", true),
        },
        {
            id: 6,
            product_name: "Perfectly Useless Morning Watch",
            quantity: 9,
            price: 32000,
            imageUrl: require('../assets/images/perfectly-useless-mornig-watch.png'),
            lowStock: false,
            onPress: () => openModal("search", true),
        },
    ];

    return (
        <>
            <TouchableWithoutFeedback style={{flex: 1, width: "100%", height: "100%"}}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <View style={style.header}>
                                <View style={style.navWrapper}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.goBack();
                                        }}
                                    >
                                        <ArrowLeft />
                                    </TouchableOpacity>
                                    <Text style={style.headerText}>Komitex</Text>
                                </View>
                                <TouchableOpacity style={style.menuIcon}>
                                    <MenuIcon />
                                </TouchableOpacity>
                            </View>
                            <StatWrapper>
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
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("AddProduct")}
                            >
                                <Text style={style.orderButtonText}>Add Product</Text>
                            </TouchableOpacity>
                            <View style={style.recentOrderHeading}>
                                <Text style={style.recentOrderHeadingText}>Products</Text>
                                <View style={style.actionWrapper}>
                                    <TouchableOpacity 
                                        style={style.menuIcon}
                                        onPress={() => openModal("search", false)}
                                    >
                                        <SearchIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={style.menuIcon}
                                        onPress={() => openModal("filter", false)}
                                    >
                                        <FilterIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={products}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <ProductCard 
                            product_name={item.product_name}
                            quantity={item.quantity}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            lowStock={item.lowStock}
                            index={index}
                            onPress={item.onPress}
                        />
                    )}
                />
            </TouchableWithoutFeedback>
            <CustomBottomSheet 
                bottomSheetModalRef={filterModalRef}
                showOverlay={filterModal.overlay}
                closeModal={() => closeModal("filter")}
                snapPointsArray={filterModal.snapPointsArray}
                autoSnapAt={filterModal.autoSnapAt}
                sheetTitle={ filterModal.sheetTitle }
            >
                { filterModal.modalContent }
            </CustomBottomSheet>

            <CustomBottomSheet 
                bottomSheetModalRef={searchModalRef}
                showOverlay={searchModal.overlay}
                closeModal={() => closeModal("search")}
                snapPointsArray={searchModal.snapPointsArray}
                autoSnapAt={searchModal.autoSnapAt}
                sheetTitle={ !editProduct ? searchModal.sheetTitle: "Edit Product"}
            >
                { !editProduct ? searchModal.modalContent : (
                    <EditProductContent
                        // product={product}
                    />
                )}
            </CustomBottomSheet>

            { successAlert && (
                <AlertNotice 
                    type={"success"}
                    text={"Product successfully created and saved!"}
                    closeAlert={setSuccessAlert}
                />
            )}
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
        marginVertical: 22,
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
        marginTop: 8,
        marginBottom: 20,
    },
    recentOrderHeadingText: {
        fontFamily: "mulish-bold",
        color: "rgba(34, 34, 34, 0.6)",
        fontSize: 10,
    },
    actionWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    modalContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        // backgroundColor: "pink",
        flex: 1,
    },
    footerButtonWrapper: {
      width: "100%",
      position: "absolute",
      bottom: 0,
    },
    footerButton: {
      width: "100%",
      height: 44,
      backgroundColor: primaryColor,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
    },
    footerButtonText: {
      color: "white",
      fontSize: 16,
      fontFamily: 'mulish-semibold',
    }
})
 
export default Products;