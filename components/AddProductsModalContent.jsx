// react native components
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// components
import SearchBar from "./SearchBar";
import ProductCheckItem from "./ProductCheckItem";
import CustomButton from "./CustomButton";
// react hook
import { useState } from "react";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { background, black, primaryColor, white } from "../style/colors";

const AddProductsModalContent = ({addProducts, selectedProducts, action}) => {
    // addProducts, selectedProducts => function

    // products list with selected logistics
    const allProducts = [
        {
            id: 1,
            product_name: "Clarks Shoe",
            imageUrl: require("../assets/images/Clarks.jpg"),
            quantity: 1,
            checked: false
        },
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            imageUrl: require("../assets/images/sneakers.png"),
            quantity: 1,
            checked: false,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            imageUrl: require("../assets/images/Timberland.jpg"),
            quantity: 1,
            checked: false
        },
        {
            id: 4,
            product_name: "Chaos Watch",
            imageUrl: require("../assets/images/Chaos-Window-Watch.jpg"),
            quantity: 1,
            checked: false
        },
        {
            id: 5,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: require("../assets/images/maybach-sunglasses.png"),
            checked: false,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 2,
            imageUrl: require("../assets/images/accurate-watch.png"),
            checked: false,
        },
    ];

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const [productList, setProductList] = useState(() => {
        const filteredProducts = allProducts.filter(product => {
            return !selectedProducts.some(selectedProduct => selectedProduct.id === product.id)
        });

        return [...filteredProducts, ...selectedProducts];
    });

    // function to handle selected products, this get called on check checkbox
    const handleSelectedProducts = (id) => {
        const newList = productList.map(prevItem => {
            if (prevItem.id === id) {
                return {...prevItem, checked: !prevItem.checked}
            } else {
                return prevItem;
            }
        })
        setProductList(newList);
    }

    // function to update selected products, this gets called onclick "Done"
    const updateProductSelection = () => {
        addProducts(productList.filter(product => product.checked));
    }

    // render AddProductsModalContent component
    return (
        <>
            {/* Search bar component */}
            <SearchBar 
                placeholder={"Search for a Product"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                backgroundColor={background}
                disableFIlter={true}
            />
            <View>
                <Text style={style.modalHeading}>Available Products</Text>
            </View>
            <View style={style.listContainer}>
                <BottomSheetScrollView 
                    style={style.listWrapper}  
                    contentContainerStyle={style.listContainer}
                >
                    {/* list of product with selected logistics */}
                    {productList.map((data) => (
                        <ProductCheckItem 
                            key={data.id}
                            data={data}
                            onPress={handleSelectedProducts}
                        />
                    ))}
                </BottomSheetScrollView>
                <CustomButton
                    // secondaryButton={true}
                    name={"Done"}
                    shrinkWrapper={true}
                    onPress={action ? action : updateProductSelection}
                    unpadded={true}
                />
            </View>
        </>
    );
}

const style = StyleSheet.create({
    modalHeading: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        marginVertical: 10,
        color: black,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },  
    listWrapper: {
        width: '100%',

    },
    button: {
        width: "100%",
        backgroundColor: primaryColor,
        height: 44,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }, 
    buttonText: {
        fontFamily: "mulish-semibold",
        color: white,
        fontSize: 16,
    },
    fixedButton: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    }
})
 
export default AddProductsModalContent;