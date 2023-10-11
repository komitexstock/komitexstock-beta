// react native component
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    ScrollView
} from "react-native";
// components
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import ProductCheckItem from "../components/ProductCheckItem";
import CheckBox from "../components/CheckBox";
// colors
import { background, black, bodyText, checkBoxBorder, primaryColor, white} from "../style/colors";
// react hooks
import { useState } from "react";
// helpers
import { windowHeight } from "../utils/helpers";


// get windows height

const ImportInventory = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

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
    const selectAll = false;

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

    const handleImportInventory = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            handleDeselectAllProducts();
            navigation.navigate("Products", {
                show: true,
                type: "Success",
                text: "Product successfully imported!"
            });
        }, 3000);
    }

    // Render ImportInventory page
    return (
        <>
            <ScrollView
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
                    <SearchBar 
                        placeholder={"Search for a Product"} 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                        backgroundColor={white}
                        disableFilter={true}
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
                                                unpadded={true}
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
                                            onPress={handleSelectAllProducts}
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
                                                unpadded={true}
                                            />
                                        )
                                    })}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            {/* Add Product button, disables on empty fields */}
            <CustomButton 
                name={"Import Inventory"}
                onPress={handleImportInventory}
                backgroundColor={background}
                fixed={false}
                inactive={products.filter(product => product.checked === true).length === 0 ? true : false}
                isLoading={isLoading}
            />
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
        minHeight: windowHeight - 100,
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