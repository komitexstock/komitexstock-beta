// react native components
import { View, Text, StyleSheet } from "react-native";
// components
import SearchBar from "./SearchBar";
import ProductCheckItem from "./ProductCheckItem";
import CustomButton from "./CustomButton";
import ProductCheckItemSkeleton from "../skeletons/ProductCheckItemSkeleton";
// react hook
import { useState } from "react";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { background, black, primaryColor, white } from "../style/colors";
// react hooks
import { useEffect } from "react";


const SelectProductsModal = ({products, setProducts, closeModal, alternateFunction, searchQuery, setSearchQuery, fetchingProducts}) => {
    // addProducts, selectedProducts => function

    const [productsSelection, setProductsSelection] = useState([]);

    useEffect(() => {
        setProductsSelection(products);
    }, [products])

    // console.log("Product Selection:", productsSelection)


    // function to handle selected products, this get called on check checkbox
    const handleSelectedProducts = (id) => {
        setProductsSelection(prevProductsSelection => {
            // console.log(prevProductsSelection);
            return prevProductsSelection.map(prevItem => {
                if (prevItem.id === id) {
                    return {...prevItem, checked: !prevItem.checked}
                }
                return prevItem;
            });
        });
    }

    // function to update selected products, this gets called onclick "Done"
    const updateProductSelection = () => {
        setProducts(productsSelection);
        closeModal();
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
                    {!fetchingProducts && productsSelection?.map((product) => (
                        <ProductCheckItem 
                            key={product?.id}
                            productImage={product?.product_image}
                            productName={product?.product_name}
                            checked={product?.checked}
                            onPress={() => handleSelectedProducts(product?.id)}
                        />
                    ))}

                    {/* show fetching products skeleton */}
                    {fetchingProducts && (
                        <ProductCheckItemSkeleton />    
                    )}
                </BottomSheetScrollView>
                <CustomButton
                    name={"Done"}
                    shrinkWrapper={true}
                    onPress={alternateFunction !== undefined ? alternateFunction : updateProductSelection}
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
 
export default SelectProductsModal;