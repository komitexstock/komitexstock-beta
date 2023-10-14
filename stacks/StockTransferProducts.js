import { StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
// import 
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import SearchBar from '../components/SearchBar';
import MerchantProduct from '../components/MerchantProduct';
// globals
import { useGlobals } from '../context/AppContext';
import { background, black, white } from '../style/colors';
import { windowHeight } from '../utils/helpers';
// bottomsheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const StockTransferProducts = ({navigation, route}) => {

    // bottomsheet refs
    const { bottomSheetRef, bottomSheetOpen } = useGlobals();

    // originWarehouse
    // stock transfer details
    const {originWarehouse, destinationWarehouse, additionalDetails} = route.params;
    
    // products list with selected logistics
    const [availableProducts, setAvailableProducts] = useState([
        {
            id: 1,
            product_name: "Clarks Shoe",
            image_url: require("../assets/images/Clarks.jpg"),
            available_quantity: 5,
            merchant: "Style Bazaar",
            quantity: 1,
            selected: false
        },
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            image_url: require("../assets/images/sneakers.png"),
            merchant: "Style Bazaar",
            available_quantity: 5,
            quantity: 1,
            selected: false,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            image_url: require("../assets/images/Timberland.jpg"),
            merchant: "Luxe Living Ltd",
            available_quantity: 10,
            quantity: 1,
            selected: false
        },
        {
            id: 4,
            product_name: "Chaos Watch",
            image_url: require("../assets/images/Chaos-Window-Watch.jpg"),
            merchant: "Ecosavy Ltd",
            available_quantity: 8,
            quantity: 1,
            selected: false
        },
        {
            id: 5,
            product_name: "Maybach Sunglasses",
            merchant: "Ecosavy Ltd",
            available_quantity: 7,
            quantity: 1,
            image_url: require("../assets/images/maybach-sunglasses.png"),
            selected: false,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            merchant: "Tech Haven",
            available_quantity: 9,
            quantity: 1,
            image_url: require("../assets/images/accurate-watch.png"),
            selected: false,
        },
    ]);

    // selected products
    const [selectedProducts, setSelectedProducts] = useState([]);

    // decrease product quantity
    const decreaseQuantity = (id, editBothList) => {
        // set available products
        if (!editBothList) return setQuantity(id, setAvailableProducts)
        
        // if edit both list is true, set selected products
        setQuantity(id, setSelectedProducts);
        
    }

    // increase product quantity
    const increaseQuantity = (id, editBothList) => {
        // set available products
        if (!editBothList) return setQuantity(id, setAvailableProducts, true);

        // if edit both list is true, set selected products
        setQuantity(id, setSelectedProducts, true);
        
    }

    const updateAvailableProducts = () => {
        // get unselected products
        // console.log(unselectedProducts);
        setAvailableProducts(prevProducts => {
            const unselectedProducts = prevProducts.filter(product => product.selected === false);
            return [
                ...selectedProducts,
                ...unselectedProducts
            ]
        })
    }

    const setQuantity = (id, setProducts, increase, textInput) => {
        
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    let change;
                    let reference = increase ? product.available_quantity : 1;
                    if (product.quantity === reference) change = 0;
                    else change = increase ? 1 : -1;

                    // if textInput is provided
                    if (textInput) return {
                        ...product,
                        quantity: textInput > product.available_quantity ? product.available_quantity : textInput,
                    }

                    return {
                        ...product,
                        quantity: product.quantity += change,
                    }
                } else {
                    return product
                }
            })
        });
    }

    const handleQuantityKeyUp = (text, id) => {
        if (!text) return;

        let textInput = parseInt(text);
        // that means we should edit the avaialble list
        if (bottomSheetOpen) return setQuantity(id, setAvailableProducts, true, textInput);
        return setQuantity(id, setSelectedProducts, true, textInput);
    }

    // function to remove product
    const removeProduct = (id) => {
        // const newProduct = products.filter((product) => product.id !== id);
        setSelectedProducts(prevProducts => {
            return prevProducts.filter((product) => product.id !== id);
        });

        // deselect removed product from available list 
        selectProduct(id);
    }

    // function to select products
    const selectProduct = (id) => {
        setAvailableProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        selected: !product.selected,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // add products selected in the bottomsheet
    const addSelectedProducts = () => {
        setSelectedProducts(availableProducts.filter(product => product.selected));
        closeModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState("");

    // open bottomsheet modal function
    const openModal = () => {
        bottomSheetRef.current?.present();
        updateAvailableProducts();
    }
    
    // close bottomsheet modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={style.contentContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={style.mainWrapper}>
                        <Header
                            stackName={"Select product you want to transfer"}
                            navigation={navigation}
                            unpadded={true}
                        />
                        <View style={style.searchBarWrapper}>
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                placeholder={"Search for products"}
                                disableFilter={true}
                                backgroundColor={white}
                                button={true}
                                onPress={openModal}
                            />
                        </View>
                        {selectedProducts.length > 0 && (
                            <Text style={style.headingText}>Selected Products ({selectedProducts?.length})</Text>
                        )}
                        <View style={style.productList}>
                            { selectedProducts.map(product => (
                                <MerchantProduct
                                    key={product.id}
                                    id={product.id}
                                    productName={product.product_name}
                                    merchant={product.merchant}
                                    availableQuantity={product.available_quantity}
                                    imageUrl={product.image_url}
                                    quantity={product.quantity}
                                    selected={product.selected}
                                    handleQuantityKeyUp={handleQuantityKeyUp}
                                    removeProduct={() => removeProduct(product.id)}
                                    increaseQuantity={() => increaseQuantity(product.id, true)}
                                    decreaseQuantity={() => decreaseQuantity(product.id, true)}
                                />
                            ))}
                        </View>
                    </View>
                    <CustomButton
                        name={"Continue"}
                        unpadded={true}
                        backgroundColor={background}
                        inactive={selectedProducts.length === 0}
                        onPress={() => navigation.navigate("Summary", {
                            originWarehouse,
                            destinationWarehouse,
                            additionalDetails,
                            selectedProducts,
                        })}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                sheetTitle={"Select products"}
                bottomSheetModalRef={bottomSheetRef}
                disablePanToClose={true}
                snapPointsArray={["100%"]}
                autoSnapAt={0}
                closeModal={closeModal}
            >
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder={"Search for products"}
                    backgroundColor={background}
                />
                <BottomSheetScrollView
                    showsVerticalScrollIndicator={false}
                >   
                    <Text style={style.headingText}>Available Products ({availableProducts.length})</Text>
                    <View style={style.productList}>
                        { availableProducts.map(product => (
                            <MerchantProduct
                                key={product.id}
                                id={product.id}
                                productName={product.product_name}
                                merchant={product.merchant}
                                availableQuantity={product.available_quantity}
                                imageUrl={product.image_url}
                                quantity={product.quantity}
                                selected={product.selected}
                                handleQuantityKeyUp={handleQuantityKeyUp}
                                selectProduct={() => selectProduct(product.id)}
                                increaseQuantity={() => increaseQuantity(product.id)}
                                decreaseQuantity={() => decreaseQuantity(product.id)}
                            />
                        ))}
                    </View>
                </BottomSheetScrollView>
                <CustomButton
                    name={"Done"}
                    unpadded={true}
                    backgroundColor={background}
                    shrinkWrapper={true}
                    onPress={addSelectedProducts}
                    wrapperStyle={{marginBottom: 10}}
                />
            </CustomBottomSheet>
        </>
    )
}

export default StockTransferProducts

const style = StyleSheet.create({
    contentContainer: {
        backgroundColor: background,
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'column',
        alignItems: 'center',
        height: windowHeight,
        width: "100%",
    },
    mainWrapper: {
        width: "100%",
    },
    searchBarWrapper: {
        marginTop: 30,
        marginBottom: 10,
    },
    headingText: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        marginBottom: 12,
    },
    productList: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        gap: 10,
    }
})