// react native component
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
// icon
import ClearSearch from "../assets/icons/ClearSearch";
import { background, black, subText, white } from "../style/colors";
// components
import Avatar from "./Avatar";
import CheckBox from "./CheckBox";
// import react native components
import { useRef, useState } from "react";

const MerchantProduct = ({id, productName, merchant, availableQuantity, imageUrl, quantity, selected, selectProduct, removeProduct, increaseQuantity, decreaseQuantity, handleQuantityKeyUp, avatarDiameter, summary, containerStyle}) => {
    // product => object
    // removeProduct, increaseQuantity, decreaseQuantity => function

    const handleOnChangeText = (text) => {
        handleQuantityKeyUp(text, id);
    }

    // render MerchantProduct component, 
    // used as product input in sending order of sending waybill
    return (
        <View 
            style={[
                style.productItem,
                summary && {paddingVertical: 6, paddingHorizontal: 0},
                containerStyle && containerStyle
            ]}
        >
            {/* <View style={style.productInfoWrapper}>

            </View> */}
            {/* check box */}
            {!summary && selectProduct && (
                <CheckBox 
                    value={selected}
                    onPress={selectProduct}
                />
            )}

            {/* Product details */}
            {/* product main detail */}
            <TouchableOpacity 
                style={style.productDetailsWrapper}
                onPress={selectProduct}
                activeOpacity={summary && 1}
            >
                <Avatar
                    imageUrl={imageUrl}
                    diameter={avatarDiameter ? avatarDiameter : 40}
                    squared={true}
                />
                <View style={style.textWrapper}>
                    <Text style={style.productName}>
                        {productName}
                    </Text>
                    {/* merchant name */}
                    {merchant && (
                        <Text style={style.merchantName}>
                            {merchant} {!summary && '\u2022' + availableQuantity + "available"}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>


            {/* Product quantity wrapper */}
            <View style={style.productQuantityWrapper}>
                {!summary && (
                    <View style={style.productQuantityContainer}>
                        {/* reduce quantity button */}
                        <TouchableOpacity 
                            style={style.quantityButton}
                            onPress={decreaseQuantity}
                        >
                            <Text style={style.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        {/* input quantity */}
                        <TextInput 
                            keyboardType="numeric"
                            value={String(quantity)}
                            style={style.quantityInput}
                            onChangeText={handleOnChangeText}
                        />
                        {/* increase quantity button */}
                        <TouchableOpacity 
                            style={style.quantityButton}
                            onPress={increaseQuantity}
                        >
                            <Text style={style.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {/* remove product */}
                {!summary && removeProduct && (
                    <TouchableOpacity
                        onPress={removeProduct}
                    >
                        <ClearSearch />
                    </TouchableOpacity>
                )}
                {summary && (
                    <Text style={style.summaryText}>
                        Qty {quantity}
                    </Text>
                )}
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
        gap: 15,
        height: 68,
        backgroundColor: white,
    },
    productInfoWrapper: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "stretch",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        flex: 1,
    },
    productDetailsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 12,
        flex: 1,
        alignSelf: 'stretch',
    },
    textWrapper: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxWidth: 230,
        gap: 4,
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
        lineHeight: 14.4,
    },
    merchantName: {
        fontFamily: "mulish-regular",
        color: subText,
        fontSize: 10,
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
        maxWidth: 30,
    },
    summaryText: {
        fontSize: 12,
        color: black,
        fontFamily: "mulish-medium",
    }
})
 
export default MerchantProduct;