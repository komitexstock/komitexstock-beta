import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CheckBox from 'expo-checkbox';
import SearchBar from "./SearchBar";
import { useState } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { primaryColor } from "../style/globalStyleSheet";

const AddProductsModalContent = ({addProducts, selectedProducts}) => {

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
    ];

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    const [productList, setProductList] = useState(() => {
        const filteredProducts = allProducts.filter(product => {
            return !selectedProducts.some(selectedProduct => selectedProduct.id === product.id)
        });

        return [...filteredProducts, ...selectedProducts];
    });

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

    const updateProductSelection = () => {
        addProducts(productList.filter(product => product.checked));
    }

    return (
        <>
            <SearchBar 
                placeholder={"Search for a logistics"} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />
            <View>
                <Text style={style.modalHeading}>Available Products</Text>
            </View>
            <View style={style.listContainer}>
                <BottomSheetScrollView 
                    style={style.listWrapper}  
                    contentContainerStyle={style.listContainer}
                >
                    {productList.map((data) => (
                        <View 
                            key={data.id}
                            style={style.listItemWrapper}
                        >

                            <TouchableOpacity
                                style={style.list}
                                key={data.id}
                                onPress={() => handleSelectedProducts(data.id)}
                            >   
                                <Image
                                    style={style.logisticsImage}
                                    source={data.imageUrl}
                                />
                                <Text style={style.listText}>{data.product_name}</Text>
                            </TouchableOpacity>
                            <CheckBox 
                                value={data.checked}
                                color={data.checked ? primaryColor : undefined}
                                style={style.checkBox}
                                onValueChange={() => handleSelectedProducts(data.id)}
                            />
                        </View>
                    ))}
                </BottomSheetScrollView>
                <View style={style.fixedButton}>
                    <TouchableOpacity 
                        style={style.button}
                        onPress={updateProductSelection}
                    >
                        <Text style={style.buttonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    modalHeading: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        marginVertical: 10,
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
    listItemWrapper: {
        display: 'flex',
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        borderBottomColor: "#E7E5E5",
        borderBottomWidth: 1,
    },
    list: {
        height: 50,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    logisticsImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    listText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        flex: 1
    },
    checkBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#828282",
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
        color: "#ffffff",
        fontSize: 16,
    },
    fixedButton: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    }
})
 
export default AddProductsModalContent;