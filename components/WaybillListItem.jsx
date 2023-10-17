// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// components
import Indicator from './Indicator';
import Mark from './Mark';
import Avatar from './Avatar';
// colors
import { black, bodyText, white } from '../style/colors';
// import helper functions
import { windowWidth } from '../utils/helpers';

const WaybillListItem = ({item, index, firstWaybill, lastWaybill, sideFunctions, searchQuery}) => {
    // item => object
    // index, length => int

    const handleOnPress = () => {
        if (sideFunctions) {
            sideFunctions();
        } else {
            return item.navigateToChat();
        }
    }

    const highlightSearchtext = (text) => {
        if (!searchQuery) return text;

        const searchIndex = text.toLowerCase().indexOf(searchQuery.toLowerCase());

        if (searchIndex !== -1) {
            let textArray = text.toLowerCase().split(searchQuery.toLowerCase());
            const fullString = textArray.join(`%!#${searchQuery}%!#`)

            textArray = fullString.split('%!#');
            // console.log(textArray);

            return textArray.map((text, index) => {
                if (index % 2 === 0) {
                    return (
                        <Text 
                            key={index} 
                            style={index === 0 && {textTransform: 'capitalize'}}
                            >
                            {text}
                        </Text>
                    ) 
                } else {
                    return (
                        <Text
                            key={index}
                            style={textArray[0] === "" && index === 1 && {textTransform: 'capitalize'}}
                        >
                            <Mark key={index}>{text.toLowerCase()}</Mark>
                        </Text>
                    )
                }
            })
        } else {
            return text
        }
    }

    // render WaybillListItem component
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
                // add top border radius to first waybill in the list
                index === firstWaybill && style.firstOrderWrapper, 
                // add bottom border radius to last waybill in the list
                index === lastWaybill && style.lastOrderWrapper
            ]}
            onPress={handleOnPress}
            activeOpacity={0.8}
        >
            {/* waybill image */}
            <Avatar 
                imageUrl={item.imageUrl}
                squared={true}
            />
            <View style={style.orderInfo}>
                <Text 
                    style={[
                        style.orderMainText,
                        // if theres a newMessage in the waybill chat, make text color darker
                        {color: item.newMessage ? black : bodyText},
                        // if theres a newMessage in the waybill chat, use diffrent font weight
                        {fontFamily: item.newMessage ? 'mulish-bold' : 'mulish-regular'},
                        searchQuery && {color: bodyText, fontFamily: 'mulish-regular'},
                    ]}
                >
                    {/* map through product array */}
                    { item.products.map((product, index) => {
                        // seperate list of products by commas ','
                        if (index !== 0) {
                            return highlightSearchtext(", "+ product.product_name + " x " + product.quantity);
                        } else {
                            return highlightSearchtext(product.product_name + " x " + product.quantity);
                        }
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
        height: 70,
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
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    orderInfo: {
        width: windowWidth - 194,
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
