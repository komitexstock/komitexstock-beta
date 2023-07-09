// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    BackHandler
} from "react-native";
// react hooks
import { useState, useRef, useEffect, useLayoutEffect } from "react";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import VerifiedIcon from "../assets/icons/VerifiedIcon";
// colors
import { black, bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import AlertNotice from "../components/AlertNotice";
import EditProductContent from "../components/EditProductContent";
import ProductListItem from "../components/ProductListItem";
import Header from "../components/Header";
import ModalButton from "../components/ModalButton";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";


const Products = ({navigation, route}) => {

    // stats array
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

    // list of products
    const products = [
        {
            id: 1,
            product_name: "Maybach Sunglasses",
            quantity: 7,
            price: 20000,
            imageUrl: require('../assets/images/maybach-sunglasses.png'),
            lowStock: false,
            onPress: () => openModal("editProduct"),
        },
        {
            id: 2,
            product_name: "Accurate Watch",
            quantity: 3,
            price: 33000,
            imageUrl: require('../assets/images/accurate-watch.png'),
            lowStock: false,
            onPress: () => openModal("editProduct"),
        },
        {
            id: 3,
            product_name: "Black Sketchers",
            quantity: 0,
            price: 35000,
            imageUrl: require('../assets/images/black-sketchers.png'),
            lowStock: true,
            onPress: () => openModal("editProduct"),
        },
        {
            id: 4,
            product_name: "Brown Clarks",
            quantity: 11,
            price: 40000,
            imageUrl: require('../assets/images/brown-clarks.png'),
            lowStock: false,
            onPress: () => openModal("editProduct"),
        },
        {
            id: 5,
            product_name: "Pheonix Sneakers",
            quantity: 2,
            price: 25000,
            imageUrl: require('../assets/images/sneakers.png'),
            lowStock: true,
            onPress: () => openModal("editProduct"),
        },
        {
            id: 6,
            product_name: "Perfectly Useless Morning Watch",
            quantity: 9,
            price: 32000,
            imageUrl: require('../assets/images/perfectly-useless-mornig-watch.png'),
            lowStock: false,
            onPress: () => openModal("editProduct"),
        },
    ];

    // state to control success alert
    const [successAlert, setSuccessAlert] = useState(null);
    // console.table(successAlert);

    // state to store edited products= parameter
    const [editProduct, setEditProduct] = useState(false);

    // modal state
    const [modal, setModal] = useState({
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "",
        overlay: false,
        clearFilterFunction: false,
        modalContent: <></>
    });

    // use effect to remove add product or edit product success propmt after 3 seconds
    useLayoutEffect(() => {
        // if success is true, set success as false after 3 seconds
        if (route.params.success && route.params) {
            setSuccessAlert(route.params.success);
            
            setTimeout(() => {
                setSuccessAlert(false);
            }, 3000);
        }

    }, [route.params]);
    
    // use effect to close modal on press of back button
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (modal.overlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [modal.overlay]);

    // filter buttons
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
    ];

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // filter modal reference
    const modalRef = useRef(null);

    // filter modal parameter
    const filterModal = {
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "Filter by",
        overlay: true,
        clearFilterFunction: () => {},
        modalContent: <>
            <View style={style.modalContent}>
                {filterButtons.map(item => (
                        <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.id}
                    />
                ))}
                <ModalButton
                    name={"Apply"}
                    onPress={() => {}}
                />
            </View>
        </>
    };

    // search modal parameter
    const searchModal = {
        snapPointsArray: ["50%", "80%", "100%"],
        autoSnapAt: 2,
        sheetTitle: "Products",
        overlay: true,
        clearFilterFunction: false,
        modalContent: <>
            <SearchBar 
                placeholder={"Search orders"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={"#f8f8f8"}
            />
            <BottomSheetScrollView style={style.orderSearchResults}>
                {products.map(item => (
                    <ProductListItem 
                        key={item.id}
                        product_name={item.product_name}
                        quantity={item.quantity}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onPress={item.onPress}
                    />
                ))}
            </BottomSheetScrollView>
        </>
    };

    // search modal state
    const editProductModal = {
        snapPointsArray: ["50%", "85%", "100%"],
        autoSnapAt: 2,
        sheetTitle: "",
        overlay: true,
        clearFilterFunction: false,
        modalContent: <>
            <EditProductContent />        
        </>
    };

    // close modal function
    const closeModal = () => {
        setModal(prevModal => {
            return {
                ...prevModal,
                overlay: false,
            }
        });
        modalRef.current?.close();
    };

    // open modal function
    const openModal = (type) => {
        if (type === "filter") {
            setModal({
                ...filterModal
            });
            // if product is selected, set it
        } else if (type === "search"){
            setModal({
                ...searchModal,
            });
        } else if (type === "editProduct"){
            setModal({
                ...editProductModal,
            });
        }
        modalRef.current?.present();
    }

    // render Products page
    return (
        <>
            <TouchableWithoutFeedback style={{flex: 1}}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    // list header component
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            {/* header */}
                            <Header
                                navigation={navigation}
                                stackName={
                                    <View style={style.header}>
                                        <Text style={style.headerText}>Komitex</Text>
                                        <VerifiedIcon />
                                    </View>
                                }
                                removeBackArrow={true}
                                inlineArrow={true}
                                unpadded={true}
                                icon={<MenuIcon />}
                                iconFunction={() => {}}
                            />
                            {/* stats */}
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
                            {/* Navigate to addproducts page/stack */}
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("AddProduct")}
                            >
                                <Text style={style.orderButtonText}>Add Product</Text>
                            </TouchableOpacity>
                            <View style={style.recentOrderHeading}>
                                <Text style={style.recentOrderHeadingText}>Products</Text>
                                <View style={style.actionWrapper}>
                                    {/* open bottomsheet search modal */}
                                    <TouchableOpacity 
                                        style={style.menuIcon}
                                        onPress={() => openModal("search")}
                                    >
                                        <SearchIcon />
                                    </TouchableOpacity>
                                    {/* open bottomsheet filter modal */}
                                    <TouchableOpacity
                                        style={style.menuIcon}
                                        onPress={() => openModal("filter")}
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
                    // render items in two rows
                    numColumns={2}
                    renderItem={({ item }) => (
                        // product card
                        <ProductCard 
                            product_name={item.product_name}
                            quantity={item.quantity}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            lowStock={item.lowStock}
                            onPress={item.onPress}
                        />
                    )}
                />
            </TouchableWithoutFeedback>
            {/* custom bottomsheet modal */}
            <CustomBottomSheet 
                bottomSheetModalRef={modalRef}
                showOverlay={modal.overlay}
                closeModal={() => closeModal("filter")}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt}
                sheetTitle={ modal.sheetTitle }
                clearFilterFunction={modal.clearFilterFunction}
            >
                { modal.modalContent }
            </CustomBottomSheet>

            {/* success alert to display on addproduct or edit product */}
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
    },
    header: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        gap: 4,
    },
    headerText: {
        fontFamily: "mulish-bold",
        fontSize: 20,
        color: black,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: white,
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
        backgroundColor: secondaryColor,
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
        color: bodyText,
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
        flex: 1,
    },
})
 
export default Products;