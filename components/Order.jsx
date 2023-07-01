import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import Indicator from './Indicator';

const Order = ({item, index, length}) => {
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
                index === 0 && style.firstOrderWrapper, 
                index === (length - 1) && style.lastOrderWrapper
            ]}
            onPress={item.navigateToChat}
        >
            <Image 
                source={item.imageUrl}
                style={style.orderImage}
            />
            <View style={style.orderInfo}>
                <Text 
                    style={[
                        style.orderMainText,
                        {color: item.newMessage ? 'rgba(34, 34, 34, 1)' : 'rgba(34, 34, 34, 0.8)'},
                    ]}
                >
                    {item.name}, {item.location}
                    </Text>
                <Text style={style.orderSubText}>{
                    item.products.map((product, index) => {
                        return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                    })}
                </Text>
                <Text style={style.orderSubText}>{item.datetime}</Text>
            </View>
            <View style={style.orderPriceContainer}>
                {item.newMessage && <View style={style.newMessageIndicator} />}
                <Text style={style.orderPrice}>
                    ₦{item.price}.<Text style={style.decimal}>00</Text>
                </Text>
                <Indicator type={item.status} text={item.status} />
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    orderWrapper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        minHeight: 70,
        gap: 10,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
    },
    firstOrderWrapper: {
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
    },  
    lastOrderWrapper: {
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    orderInfo: {
        flexGrow: 1,
    },
    orderMainText: {
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: 'rgba(34, 34, 34, 0.6)',
    },
    orderPrice: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    decimal: {
        color: 'rgba(34, 34, 34, 0.6)',
    },
    orderPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 70,
        position: 'relative',
    },
    newMessageIndicator: {
        width: 6,
        height: 6,
        borderRadius: 6,
        top: -6,
        right: 2,
        margin: 0,
        position: 'absolute',
        backgroundColor: "#D92D20",
    },
})
 
export default Order;
