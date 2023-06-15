import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native";
import ClearSearch from "../assets/icons/ClearSearch";

const Product = ({product, removeProduct, increaseQuantity, decreaseQuantity}) => {
    return (
        <View style={style.productItem}>
            <View style={style.productDetailsWrapper}>
                <Image
                    style={style.productImage}
                    source={product.imageUrl}
                />
                <Text style={style.productName}>
                    {product.product_name}
                </Text>
            </View>

            <View style={style.productQuantityWrapper}>
                <View style={style.productQuantityContainer}>
                    {/* reduce quantity button */}
                    <TouchableOpacity 
                        style={style.quantityButton}
                        onPress={() => {
                            decreaseQuantity(product.id);
                        }}
                    >
                        <Text style={style.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput 
                        keyboardType="numeric"
                        defaultValue={String(product.quantity)}
                        style={style.quantityInput}
                    />
                    {/* increase quantity button */}
                    <TouchableOpacity 
                        style={style.quantityButton}
                        onPress={() => {
                            increaseQuantity(product.id);
                        }}
                    >
                        <Text style={style.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => removeProduct(product.id)}
                >
                    <ClearSearch />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    productItem: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        gap: 10,
    },
    productDetailsWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "55%",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: 10,
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    productName: {
        fontFamily: "mulish-semibold",
        color: "#222222",
        flexWrap: "wrap",
    },
    productQuantityWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "35%",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 7.5,
    },
    productQuantityContainer: {
        display: "flex",
        flexDirection: "row",  
        height: 30,
        backgroundColor: "#f8f8f8",
        width: 70,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,

    },
    quantityButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
    },
    quantityButtonText: {
        fontFamily: "mulish-bold",
        color: "#222222",
    },
    quantityInput: {
        fontFamily: "mulish-regular",
        textAlign: "center",
    },
})
 
export default Product;