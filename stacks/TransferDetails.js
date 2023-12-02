import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// components
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { windowHeight } from '../utils/helpers';
import { background, black, bodyText, white, primaryColor } from '../style/colors';
import MerchantProduct from '../components/MerchantProduct';
// icons
import WarehouseDirectionArrowIcon from '../assets/icons/WarehouseDirectionArrowIcon';
import EditIcon from "../assets/icons/EditIcon";

const TransferDetails = ({navigation, route}) => {

    // origin warehouse
    const originWarehouse = {
        id: 1,
        warehouse_name: "Warri"
    };

    // destination warehouse
    const destinationWarehouse = {
        id: 2,
        warehouse_name: "Benin"
    };

    const selectedProducts = [
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648",
            merchant: "Style Bazaar",
            available_quantity: 5,
            quantity: 1,
            selected: false,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722",
            merchant: "Luxe Living Ltd",
            available_quantity: 10,
            quantity: 1,
            selected: false
        },
        {
            id: 4,
            product_name: "Ricochet Watch",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fricochet-watch.png?alt=media&token=fbf05657-e511-4d1f-a0db-3b9419d4ba5a",
            merchant: "Ecosavy Ltd",
            available_quantity: 8,
            quantity: 1,
            selected: false
        },
    ]

    const additionalDetails = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, incidunt.";

    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <Header
                    stackName={"Transfer Details"}
                    navigation={navigation}
                    unpadded={true}
                />
                <TouchableOpacity
                    style={style.editOrderButton}
                >
                    <EditIcon />
                    <Text style={style.editButtonText}>Edit Transfer</Text>
                </TouchableOpacity>
                <View style={style.contentWrapper}>
                    <View style={style.warehouseWrapper}>
                        <Text style={style.infoHeading}>Move inventory from</Text>
                        <View style={style.warehouseNamesWrapper}>
                            <View style={style.warehouseContainer}>
                                <Text style={style.warehouseDesignation}>Origin</Text>
                                <Text style={style.warehouseNames}>{originWarehouse.warehouse_name}</Text>
                            </View>
                            <View style={style.transferArrowWrapper}>
                                <WarehouseDirectionArrowIcon />
                            </View>
                            <View style={style.warehouseContainer}>
                                <Text style={style.warehouseDesignation}>Destination</Text>
                            <Text style={style.warehouseNames}>{destinationWarehouse.warehouse_name}</Text>
                            </View>
                        </View>
                        <View style={style.additionalDetailsWrapper}>
                            <Text style={style.infoHeading}>Additional details</Text>
                            <Text style={style.additionalDetails}>
                                {additionalDetails ? additionalDetails : "N/A"}
                            </Text>
                        </View>
                        <View style={style.productsWrapper}>
                            <Text style={style.headingText}>Selected Products ({selectedProducts?.length})</Text>
                            { selectedProducts.map(product => (
                                <MerchantProduct
                                    key={product.id}
                                    productName={product.product_name}
                                    merchant={product.merchant}
                                    imageUrl={product.image_url}
                                    quantity={product.quantity}
                                    summary={true}
                                    containerStyle={{height: 56}}
                                />
                            ))}
                        </View>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

export default TransferDetails

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        backgroundColor: background,
        paddingHorizontal: 20,
        width: "100%"
    },
    editOrderButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 12,
        position: 'absolute',
        top: 57.5,
        right: 0,
    },
    editButtonText: {
        color: primaryColor,
        fontFamily: 'mulish-medium',
        fontSize: 12
    },
    contentWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 30,
        paddingTop: 30,
        paddingBottom: 20,
    },
    paragraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
    },
    warehouseWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
        backgroundColor: white,
        borderRadius: 12,
    },
    infoHeading: {
        color: black,
        fontSize: 10,
        fontFamily: 'mulish-semibold',
        lineHeight: 15,
    },
    warehouseNamesWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
        gap: 10,
        position: 'relative',
    },
    warehouseContainer: {
        width: "100%",
        backgroundColor: background,
        borderRadius: 8,
        paddingVertical: 9,
        paddingHorizontal: 12,
        gap: 9,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    warehouseDesignation: {
        color: bodyText,
        fontFamily: 'mulish-medium',
        fontSize: 10,
    },
    warehouseNames: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-bold',
    },
    transferArrowWrapper: {
        width: 24,
        height: 24,
        backgroundColor: white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: background,
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    additionalDetailsWrapper: {
        paddingTop: 20,
        borderColor: background,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        paddingBottom: 20,
        marginBottom: 20,
    },
    additionalDetails: {
        marginTop: 8,
        fontSize: 10,
        lineHeight: 15,
        color: black,
        fontFamily: 'mulish-medium',
        maxWidth: 240,
    },
    productsWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        paddingTop: 12,
        backgroundColor: white,
        borderRadius: 12,
    },
    headingText: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        marginBottom: 12,
        marginBottom: 5,
    },
})