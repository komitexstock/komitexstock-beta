import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
// components
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { windowHeight } from '../utils/helpers';
import { background, black, bodyText, white } from '../style/colors';
import MerchantProduct from '../components/MerchantProduct';
// icons
import WarehouseDirectionArrowIcon from '../assets/icons/WarehouseDirectionArrowIcon';


const StockTransferSummary = ({navigation, route}) => {

    const { originWarehouse, destinationWarehouse, additionalDetails, selectedProducts } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    const handleTransferStock = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Warehouse", {
                tab: "stock transfer",
            });
        }, 2000);
    }

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
                contentContainerStyle={style.contentContainer}
            >
                <Header
                    stackName={"Summary"}
                    navigation={navigation}
                    unpadded={true}
                />
                <View style={style.contentWrapper}>
                    <Text style={style.paragraph}>
                        Review your stock transfer details
                    </Text>
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
                                <Text style={style.warehouseDesignation}>Origin</Text>
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
                                    availableQuantity={product.available_quantity}
                                    imageUrl={product.image_url}
                                    quantity={product.quantity}
                                    selected={product.selected}
                                    summary={true}
                                />
                            ))}
                        </View>
                    </View>
                </View>

            </ScrollView>
            <CustomButton
                name={"Transfer Stock"}
                onPress={handleTransferStock}
                backgroundColor={white}
                isLoading={isLoading}
            />
        </>
    )
}

export default StockTransferSummary

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        backgroundColor: background,
        paddingHorizontal: 20,
        width: "100%"
    },
    contentWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 30,
        paddingTop: 8,
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