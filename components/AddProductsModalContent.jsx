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
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FClarks.jpg?alt=media&token=70431e2c-fbcd-4e1c-9cf3-3d35861f98d3',
            quantity: 1,
            checked: false
        },
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648',
            quantity: 1,
            checked: false,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722',
            quantity: 1,
            checked: false
        },
        {
            id: 4,
            product_name: "Perfectly Useless Morning Watch",
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fperfectly-useless-mornig-watch.png?alt=media&token=edb35f3a-deb6-498b-9c94-d9392745442c',
            quantity: 1,
            checked: false
        },
        {
            id: 5,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            checked: false,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 2,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Faccurate-watch.png?alt=media&token=4330bcd1-e843-434c-97cb-bf84c49b82b0',
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
                disableFilter={true}
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