import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import Indicator from './Indicator';

const WaybillCard = ({waybill, index, length}) => {
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
                index === 0 && style.firstOrderWrapper, 
                index === (length - 1) && style.lastOrderWrapper
            ]}
            onPress={waybill.navigateToChat}
        >
            <Image 
                source={waybill.imageUrl}
                style={style.orderImage}
            />
            <View style={style.orderInfo}>
                <Text 
                    style={[
                        style.orderMainText,
                        {color: waybill.newMessage ? 'rgba(34, 34, 34, 1)' : 'rgba(34, 34, 34, 0.8)'},
                        {fontFamily: waybill.newMessage ? 'mulish-bold' : 'mulish-semibold'},
                    ]}
                >
                    { waybill.products.map((product, index) => {
                        return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                    })}
                </Text>
                <Text style={style.orderDatetime}>{waybill.datetime}</Text>
            </View>
            <View style={style.orderPriceContainer}>
                <Indicator type={waybill.status} text={waybill.status} />
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
        maxHeight: 75,
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
    orderDatetime: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: 'rgba(134, 134, 134, 1)',    
        lineHeight: 30,
    },
    orderPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 70,
        height: '100%',
    },
})
 
export default WaybillCard;
