// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// colors
import { black, bodyText, white } from '../style/colors';
// components
import PercentageChange from './PercentageChange';

// product list item that shows up in search results
const LogisticsAnalyticsItem = ({logistics, numberOfDeliveries, totalPrice, oldTotalPrice, imageUrl, onPress, disableClick}) => {
    // product_name => string
    // quantity => int
    // price => float
    // imageUrl => string | pathToImage
    // onPress => function

    // render LogisticsAnalyticsItem component
    // render unclickable componer
    if (disableClick) return (
        <View style={style.orderWrapper}>
            {/* product image */}
            <Image 
                source={imageUrl}
                style={style.orderImage}
            />
            {/* product information */}
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>
                    {logistics}
                </Text>
                <Text style={style.orderSubText}>
                    {numberOfDeliveries} deliveries
                </Text>
            </View>
            <View style={style.orderPriceContainer}>
                <Text style={style.orderPrice}>
                    ₦{totalPrice.toLocaleString()}.<Text style={style.decimal}>00</Text>
                </Text>
                <PercentageChange
                    presentValue={totalPrice}
                    oldValue={oldTotalPrice}
                />
            </View>
        </View>
    );
    // render Clickable component
    return (
        <TouchableOpacity 
            style={style.orderWrapper}
            onPress={onPress}
        >
            {/* product image */}
            <Image 
                source={imageUrl}
                style={style.orderImage}
            />
            {/* product information */}
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>
                    {logistics}
                </Text>
                <Text style={style.orderSubText}>
                    {numberOfDeliveries} deliveries
                </Text>
            </View>
            <View style={style.orderPriceContainer}>
                <Text style={style.orderPrice}>
                    ₦{totalPrice.toLocaleString()}.<Text style={style.decimal}>00</Text>
                </Text>
                <PercentageChange
                    presentValue={totalPrice}
                    oldValue={oldTotalPrice}
                />
            </View>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    orderWrapper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        minHeight: 60,
        gap: 10,
        backgroundColor: white,
        paddingVertical: 15,
    },
    orderImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    orderInfo: {
        flexGrow: 1,
    },
    orderMainText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: black,
        marginBottom: 4,
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: bodyText,
    },
    orderPrice: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    decimal: {
        color: bodyText,
    },
    orderPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 70,
    },
})
 
export default LogisticsAnalyticsItem;
