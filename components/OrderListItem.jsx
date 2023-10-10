// react native component
import { 
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
// component
import Indicator from './Indicator';
import Mark from './Mark';
// icons
import SelectedOrderIcon from '../assets/icons/SelectedOrderIcon';
// colors
import { background, black, bodyText, white } from '../style/colors';
// import helper functions
import { windowWidth } from '../utils/helpers';

const OrderListItem = ({item, index, firstOrder, lastOrder, selectable, selected, selectFunction, extraVerticalPadding, sideFunctions, searchQuery}) => {
    // lenght, index => int
    // item => object

    const handleOnPress = () => {
        if (selectable) {
            return selectFunction(item.id);
        } else {
            if (sideFunctions) sideFunctions();
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

    // render OrderListItem
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper,
                selectable && {backgroundColor: 'transparent'},
                selectable && selected && style.selected,
                // unique style for first order in order list array
                // add borderRadius to top of first order
                index === firstOrder && style.firstOrderWrapper, 
                // unique style for last order in order list array
                // add borderRadius to bottom of last order
                index === lastOrder && style.lastOrderWrapper,

                extraVerticalPadding && style.extraVerticalPadding
            ]}
            // navigate to chat on press order
            onPress={handleOnPress}
            activeOpacity={selectable ? 0.8 : 0.5}
        >
            {/* logistics image */}
            <View style={style.orderImageContainer}>
                <Image 
                    source={item.imageUrl}
                    style={style.orderImage}
                />
                { selectable && selected && (
                    <View style={style.selectedIconWrapper}> 
                        <SelectedOrderIcon />
                    </View>
                )}
            </View>
            {/* order info */}
            <View style={style.orderInfo}>
                <Text 
                    style={[
                        style.orderMainText,
                        // if order has a new message make text have a color with higher opacity
                        {color: item.newMessage ? black : bodyText},
                        // if order has a new message make font have a higher weight
                        {fontFamily: item.newMessage ? 'mulish-bold' : 'mulish-regular'},
                        searchQuery && {color: bodyText, fontFamily: 'mulish-regular'},
                    ]}
                    >
                    {highlightSearchtext(item.name)}, {highlightSearchtext(item.location)}
                    </Text>
                <Text 
                    style={[
                        style.orderSubText,
                        {color: item.newMessage ? black : bodyText},
                        searchQuery && {color: bodyText, fontFamily: 'mulish-regular'}
                    ]}
                >
                    {item.products.map((product, index) => {
                        // seperate list of products by commas ','
                        if (index !== 0) {
                            return highlightSearchtext(", "+ product.product_name + " x " + product.quantity);
                        } else {
                            return highlightSearchtext(product.product_name + " x " + product.quantity);
                        }
                    })}
                </Text>
                <Text style={style.orderDatetime}>
                    {item.datetime}
                </Text>
            </View>
            <View style={style.orderPriceContainer}>
                  <Text style={style.orderPrice}>
                    {/* display price as a string with comma seperator using .toLocaleString function */}
                    ₦{item.price.toLocaleString()}.<Text style={style.decimal}>00</Text>
                </Text>
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
        gap: 12,
        backgroundColor: white,
    },
    extraVerticalPadding: {
        paddingVertical: 15,
    },
    selected: {
        backgroundColor: background,
        borderRadius: 12,
    },
    firstOrderWrapper: {
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        paddintTop: 5,
    },  
    lastOrderWrapper: {
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        paddintBottom: 5,
    },
    orderImageContainer: {
        position: 'relative',
    },
    orderImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    selectedIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,  
    },
    orderInfo: {
        width: windowWidth - 194,
    },
    orderMainText: {
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
    },
    orderDatetime: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: 'rgba(134, 134, 134, 1)',    
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
 
export default OrderListItem;
