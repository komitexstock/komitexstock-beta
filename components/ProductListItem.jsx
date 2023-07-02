import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';

const ProductListItem = ({product_name, quantity, price, imageUrl, onPress}) => {
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
            ]}
            onPress={onPress}
        >
            <Image 
                source={imageUrl}
                style={style.orderImage}
            />
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>
                    {product_name}
                </Text>
                <Text style={style.orderSubText}>
                    {quantity} &nbsp;
                    <Text style={style.decimal}>
                        in stock
                    </Text>
                </Text>
            </View>
            <View style={style.orderPriceContainer}>
                  <Text style={style.orderPrice}>
                    ₦{price.toLocaleString()}.<Text style={style.decimal}>00</Text>
                </Text>
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
        color: 'rgba(34, 34, 34, 1)',
        marginBottom: 8,
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: 'rgba(34, 34, 34, 1)',
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
    },
})
 
export default ProductListItem;
