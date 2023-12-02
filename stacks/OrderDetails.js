import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
// components
import Header from '../components/Header';
import MerchantProduct from '../components/MerchantProduct';
// icons
import EditIcon from "../assets/icons/EditIcon";
import InfoBlackIcon from '../assets/icons/InfoBlackIcon';
// helpers
import { windowHeight, windowWidth } from '../utils/helpers'
import { background, black, bodyText, primaryColor, white } from '../style/colors';
// auth
import { useAuth } from '../context/AuthContext';

const OrderDetails = ({navigation, route}) => {

    const { authData } = useAuth();

    const products = [
        {
            id: 1,
            product_name: "Clarks Shoe",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FClarks.jpg?alt=media&token=70431e2c-fbcd-4e1c-9cf3-3d35861f98d3",
            quantity: 1,
        },
        {
            id: 2,
            product_name: "Pheonix Sneakers",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648",
            merchant: "Style Bazaar",
            quantity: 1,
        },
        {
            id: 3,
            product_name: "Timberland Shoe",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722",
            merchant: "Luxe Living Ltd",
            quantity: 1,
        },
        {
            id: 4,
            product_name: "Ricochet Watch",
            image_url: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fricochet-watch.png?alt=media&token=fbf05657-e511-4d1f-a0db-3b9419d4ba5a",
            merchant: "Ecosavy Ltd",
            quantity: 2,
        },
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <Header
                stackName={"Order Details"}
                navigation={navigation}
                unpadded={true}
            />
            <TouchableOpacity
                style={styles.editOrderButton}
            >
                <EditIcon />
                <Text style={styles.editButtonText}>Edit Order</Text>
            </TouchableOpacity>
            <View style={styles.detailsWrapper}>
                <View style={styles.detailsContainer}>
                    {/* customer name */}
                    <View style={styles.detailsGroup}>
                        <Text style={styles.detailsHeading}>Customer's Name</Text>
                        <Text style={styles.detailsValue}>Richard Idana</Text>
                    </View>
                    {/* logistics */}
                    <View style={styles.detailsGroup}>
                        <Text style={styles.detailsHeading}>Logistics</Text>
                        <Text style={styles.detailsValue}>Komitex Logisitcs</Text>
                    </View>
                    {/* address */}
                    <View style={styles.detailsGroup}>
                        <Text style={styles.detailsHeading}>Delivery Address</Text>
                        <Text style={styles.detailsValue}>No 3 Izomo Street Udu road Warri</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={[styles.detailsGroup, styles.rightAligned]}>
                        <Text style={styles.detailsHeading}>Date</Text>
                        <Text style={styles.detailsValue}>20 May, 2023 10:30am</Text>
                    </View>
                    <View style={[styles.detailsGroup, styles.rightAligned]}>
                        <Text style={styles.detailsHeading}>Phone Number</Text>
                        <Text style={styles.detailsValue}>08012345678</Text>
                    </View>
                </View>
            </View>
            <View style={styles.productsWrapper}>
                <Text style={styles.productsHeading}>
                    Product details ({products.length})
                </Text>
                <View style={styles.productsList}>
                    { products.map(product => (
                        <MerchantProduct
                            key={product.id}
                            productName={product.product_name}
                            imageUrl={product.image_url}
                            quantity={product.quantity}
                            avatarDiameter={30}
                            summary={true}
                            containerStyle={{height: 42}}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.priceWrapper}>
                <View style={styles.priceGroup}>
                    <Text style={styles.priceText}>Subtotal</Text>
                    <Text style={styles.priceValue}>₦80,000</Text>
                </View>
                <View style={styles.priceGroup}>
                    <View style={styles.priceTextGroup}>
                        <Text style={styles.priceText}>
                            Delivery Fee (Warri)
                        </Text>
                        <TouchableOpacity>
                            <InfoBlackIcon />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.priceValue}>-₦3,000</Text>
                </View>
                <View style={styles.priceGroup}>
                    <Text style={styles.priceText}>Total {authData?.account_type === "Merchant" ? "Receivable" : "Remittance"}</Text>
                    <Text style={styles.priceValue}>₦77,000</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        minHeight: windowHeight,
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
    detailsWrapper: {
        marginTop: 24,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        width: (windowWidth - 60)/2, 
    },
    detailsGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: "100%",
    },
    rightAligned: {
        alignItems: 'flex-end',
    },
    detailsHeading: {
        color: bodyText,
        fontSize: 10,
        fontFamily: 'mulish-regular',
        marginBottom: 4,
    },
    detailsValue: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        lineHeight: 15,
    },
    productsWrapper: {
        marginTop: 20,
        backgroundColor: white,
        borderRadius: 12,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 15,
    },
    productsHeading: {
        color: black,
        fontSize: 10,
        fontFamily: 'mulish-semibold',
    },
    productsList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
    priceWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 12,
        padding: 12,
        backgroundColor: white,
        marginTop: 20,
        gap: 10,
    },
    priceGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    priceText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-medium',
        lineHeight: 15,
    },
    priceTextGroup: {
        height: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        alignItems: 'center',
    },
    priceValue: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-bold',
    }
})