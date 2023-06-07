import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import Status from './Status';

const Orders = ({item, index, orders}) => {
    return (
        <TouchableOpacity style={[style.orderWrapper, index === 0 && style.firstOrderWrapper, index === (orders.length - 1) && style.lastOrderWrapper]}>
            <Image 
                source={require('../assets/images/komitex.jpg')}
                style={style.orderImage}
            />
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>{item.name}, {item.location}</Text>
                <Text style={style.orderSubText}>{
                    item.products.map((product, index) => {
                        return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                    })}
                </Text>
                <Text style={style.orderSubText}>{item.datetime}</Text>
            </View>
            <View style={style.orderPriceContainer}>
                <Text style={style.orderPrice}>
                    ₦{item.price}.<Text style={style.decimal}>00</Text>
                </Text>
                <Status status={item.status} />
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
        height: 70,
        gap: 10,
        backgroundColor: '#ffffff',
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
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: 'rgba(34, 34, 34, 1)',
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
        justifyContent: 'center',
    },
})
 
export default Orders;
