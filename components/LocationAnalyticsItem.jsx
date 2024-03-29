// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// colors
import { black, bodyText, white } from '../style/colors';
// components
import PercentageChange from './PercentageChange';
// helpers
import { windowWidth } from '../utils/helpers';

// product list item that shows up in search results
const LocationAnalyticsItem = ({location, numberOfDeliveries, totalPrice, oldTotalPrice, onPress, disableClick}) => {
    // product_name => string
    // quantity => int
    // price => float
    // imageUrl => string | pathToImage
    // onPress => function

    return (
        <TouchableOpacity 
            style={style.orderWrapper}
            onPress={disableClick ? () => {} : onPress}
            activeOpacity={disableClick ? 1 : 0.3}
        >
            {/* product information */}
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>
                    {location}
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
    orderInfo: {
        width: windowWidth - 194,
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
 
export default LocationAnalyticsItem;
