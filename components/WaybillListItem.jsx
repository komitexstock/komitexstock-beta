// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// components
import Indicator from './Indicator';
// colors
import { black, bodyText, white } from '../style/colors';

const WaybillListItem = ({item, index, length}) => {
    // item => object
    // index, length => int

    // render WaybillListItem component
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
                // add top border radius to first waybill in the list
                index === 0 && style.firstOrderWrapper, 
                // add bottom border radius to last waybill in the list
                index === (length - 1) && style.lastOrderWrapper
            ]}
            onPress={item.navigateToChat}
        >
            {/* waybill image */}
            <Image 
                source={item.imageUrl}
                style={style.orderImage}
            />
            <View style={style.orderInfo}>
                <Text 
                    style={[
                        style.orderMainText,
                        // if theres a newMessage in the waybill chat, make text color darker
                        {color: item.newMessage ? black : bodyText},
                        // if theres a newMessage in the waybill chat, use diffrent font weight
                        {fontFamily: item.newMessage ? 'mulish-bold' : 'mulish-regular'},
                    ]}
                >
                    {/* map through product array */}
                    { item.products.map((product, index) => {
                        return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                    })}
                </Text>
                <Text style={style.orderDatetime}>{item.datetime}</Text>
            </View>
            {/* indicate waybill status */}
            <View style={style.orderPriceContainer}>
                <Indicator type={item.status} text={item.status} />
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
        minHeight: 70,
        maxHeight: 75,
        gap: 10,
        backgroundColor: white,
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
        // color set in component
    },
    orderDatetime: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: "#868686",    
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
 
export default WaybillListItem;
