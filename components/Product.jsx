// react native component
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
// components
import Avatar from "./Avatar";
// icon
import ClearSearch from "../assets/icons/ClearSearch";
import { background, black, white } from "../style/colors";

const Product = ({product, removeProduct, increaseQuantity, decreaseQuantity, invertColor, disableQuanity}) => {
    // product => object
    // removeProduct, increaseQuantity, decreaseQuantity => function

    // render Product component, 
    // used as product input in sending order of sending waybill
    return (
        <View style={[style.productItem, invertColor && {backgroundColor: background}]}>
            <View style={style.productDetailsWrapper}>
                {/* product main detail */}
                <Avatar
                    fullname={product?.product_name}
                    imageUrl={product?.product_image}
                    squared={true}
                />
                <Text style={style.productName}>
                    {product.product_name}
                </Text>
            </View>

            <View style={style.productQuantityWrapper}>
                {!disableQuanity && (
                    <View 
                        style={[
                            style.productQuantityContainer,
                            invertColor && {backgroundColor: white}
                        ]}
                    >
                        {/* reduce quantity button */}
                        <TouchableOpacity 
                            style={style.quantityButton}
                            onPress={() => {
                                decreaseQuantity(product.id);
                            }}
                        >
                            <Text style={style.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        {/* input quantity */}
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
                )}
                {/* remove product */}
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
        backgroundColor: white,
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
        fontFamily: "mulish-medium",
        color: black,
        flexWrap: "wrap",
        fontSize: 12,
        textTransform: "capitalize",
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
        backgroundColor: background,
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
        color: black,
    },
    quantityInput: {
        fontFamily: "mulish-regular",
        textAlign: "center",
    },
})
 
export default Product;