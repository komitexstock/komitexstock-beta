// react native component
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    BackHandler,
    Dimensions
} from "react-native";
// components
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import SelectInput from "../components/SelectInput";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import ModalButton from "../components/ModalButton";
import Product from "../components/Product";
import ProductCheckItem from "../components/ProductCheckItem";
// colors
import { background, black, bodyText, checkBoxBorder, primaryColor} from "../style/colors";
// icons
import ArrowDown from "../assets/icons/ArrowDown";
// react hooks
import { useState, useEffect, useRef } from "react";
// import bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// expo checkbox components
import CheckBox from 'expo-checkbox';


// get windows height
const windowsHeight = Dimensions.get("window").height;

const ImportInventory = ({navigation}) => {

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // logistics
    const [logistics, setLogistics] = useState(null);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);


    // check for empty fields
    // const emptyFields = [
    //     endDate,
    //     format
    //     ].some(
    //         (item) => item === null || item === ''
    // );

    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
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

    }, [showOverlay]);
    
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // modal state
    const [modal, setModal] = useState({
        type: "Logistics",
        snapPointsArray: ["50", "80%"],
        autoSnapAt: 0,
        sheetTitle: "Select Logistics",

    });

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        // set overlay
        setShowOverlay(true);
        bottomSheetModalRef.current?.present();
        if (type === "Logistics") {
            setModal({
                type: "Logistics",
                snapPointsArray: ["50", "80%"],
                autoSnapAt: 1,
                sheetTitle: "Select Logistics",
            })
        } else if (type === "Products") {
            setModal({
                type: "Products",
                snapPointsArray: ["50", "90%"],
                autoSnapAt: 1,
                sheetTitle: "Select Products",
            })
        }
    }

    // function to select logistics
    const handleSelectedLogistics = (data) => {
        // handleDeselectAllProducts();
        closeModal();
        setLogistics(data);
    }

    // should be retrieved from database
    const allProducts = [
        {
            id: 1,
            product_name: "Clarks Shoe",
            imageUrl: require("../assets/images/Clarks.jpg"),
            quantity: 1,
        },
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            imageUrl: require("../assets/images/sneakers.png"),
            quantity: 1,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            imageUrl: require("../assets/images/Timberland.jpg"),
            quantity: 1,
        },
        {
            id: 4,
            product_name: "Chaos Watch",
            imageUrl: require("../assets/images/Chaos-Window-Watch.jpg"),
            quantity: 1,
        },
        {
            id: 5,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: require("../assets/images/maybach-sunglasses.png"),
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 2,
            imageUrl: require("../assets/images/accurate-watch.png"),
        },
    ]

    // products list logistics
    const [products, setProducts] = useState(() => {
        return allProducts.map(product => {
            return {...product, checked: false}
        })
    });

    // select all state
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllProducts = () => {
        const tempProducts = products.map(product => {
            return {...product, checked: true}
        })
        setProducts(tempProducts);
    }

    const handleDeselectAllProducts = () => {
        const tempProducts = products.map(product => {
            return {...product, checked: false}
        })
        setProducts(tempProducts);
    }


    const handleSelectProduct = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        checked: !product.checked,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // Render ImportInventory page
    return (
        <>
            <View
                style={style.container}
            >
                <View style={style.main}>
                    {/* header component */}
                    <Header 
                        navigation={navigation} 
                        stackName={"Import Inventory"} 
                        iconFunction={null} 
                        icon={null} 
                        unpadded={true}
                    />
                    <Text style={style.headingText}>
                        Import an already existing inventory from a different logistics. 
                        Note all products will have zero quantity after its imported
                    </Text>
                    {/* Select Logistics */}
                    <SelectInput 
                        label={"Select Logistics"} 
                        placeholder={"Select logistics"} 
                        value={logistics}
                        onPress={() => openModal("Logistics")}
                        icon={<ArrowDown />}
                        active={selectLogisticsActive}
                        inputFor={"Logistics"}
                    />
                    <View style={style.selectProductsButtonWrapper}>
                        <TouchableOpacity
                            // if logistics is selected enable Products modal
                            onPress={logistics ? () => openModal("Products") : () => {}}
                        >
                            <Text style={style.addProduct}>+Select Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.selectedProductsContainer}>
                        {products.map(product => {
                            // return product if its selected
                            return product.checked && (
                                <Product
                                    key={product.id}
                                    product={product} 
                                    disableQuanity={true}
                                    removeProduct={() => handleSelectProduct(product.id)}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
            {/* Add Product button, disables on empty fields */}
            <CustomButton 
                name={"Import Inventory"}
                onPress={() => {}}
                backgroundColor={background}
                fixed={false}
                inactive={products.filter(product => product.checked === true).length === 0 ? true : false}
            />
                
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt}
                sheetTitle={modal.sheetTitle}
            >
                {/* if modal type is logistics, render logistics modal content */}
                {modal.type === "Logistics" && (
                    <AddLogisticsModalContent 
                        handleSelectedLogistics={handleSelectedLogistics}
                    />
                )}
                {modal.type === "Products" && (<>
                    <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
                        <SearchBar 
                            placeholder={"Search for a Product"} 
                            searchQuery={searchQuery} 
                            setSearchQuery={setSearchQuery} 
                            backgroundColor={background}
                            disableFIlter={true}
                        />
                        <View style={style.modalContent}>
                            {/* if products list has some selected products */}
                            {products.filter(product => product.checked === true).length !== 0 && (
                                <View style={style.productGroupWrapper}>
                                    <View style={style.productGroupHeading}>
                                        <Text style={style.productGroupHeadingText}>
                                            Selected Products
                                        </Text>
                                    </View>
                                    <View>
                                        {products.map((product) => {
                                            return product.checked && (
                                                <ProductCheckItem
                                                    key={product.id}
                                                    data={product}
                                                    onPress={handleSelectProduct}
                                                />
                                            )
                                        })}
                                    </View>
                                </View>
                            )}

                            {/* list of unselected products */}
                            {products.filter(product => product.checked === false).length !== 0 && (
                                <View style={style.productGroupWrapper}>
                                    <View style={style.productGroupHeading}>
                                        <Text style={style.productGroupHeadingText}>
                                            Available Products
                                        </Text>
                                        <TouchableOpacity onPress={handleSelectAllProducts} style={style.selectAllButton}>
                                            <Text style={style.selectAllText}>
                                                Select all
                                            </Text>
                                            <CheckBox      
                                                value={selectAll}
                                                color={selectAll ? primaryColor : undefined}
                                                style={style.checkBox}
                                                onValueChange={handleSelectAllProducts}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {products.map((product) => {
                                            return !product.checked && (
                                                <ProductCheckItem
                                                    key={product.id}
                                                    data={product}
                                                    onPress={handleSelectProduct}
                                                />
                                            )
                                        })}
                                    </View>
                                </View>
                            )}
                        </View>
                    </BottomSheetScrollView>
                    <ModalButton
                        name={"Done"}
                        // activate button if sa product is selected
                        emptyFeilds={products.filter(product => product.checked === true).length === 0 ? true : false}
                        onPress={closeModal}
                    />
                </>)}
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: windowsHeight - 100,
    },
    main: {
        paddingBottom: 90,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        lineHeight: 16,
        color: bodyText,
        width: "100%",
        marginBottom: 24,
        marginTop: 8,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    selectContainer: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    selectButton: {
        height: 35,
        width: '100%',
        paddingVertical: 10,
    },
    selectButtonText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-medium',
    },
    selectProductsButtonWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    addProduct: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },

    selectedProductsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16,
        paddingVertical: 16,
    },

    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: "100%",
        width: "100%",
        paddingBottom: 20,
    },
    modalContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 50,
    },
    productGroupWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 15,
    },
    productGroupHeading: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    productGroupHeadingText: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: black,
    },
    checkBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: checkBoxBorder,
    },
    selectAllButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    selectAllText: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        color: black,
    }
})
 
export default ImportInventory;