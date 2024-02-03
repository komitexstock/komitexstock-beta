// react native component
import { 
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';
// component
import Indicator from './Indicator';
import Mark from './Mark';
// icons
import StockTransferDirectionIcon from '../assets/icons/StockTransferDirectionIcon';
// colors
import { background, black, bodyText, orderDate, white, neutral } from '../style/colors';
// import helper functions


const StockTransferListItem = ({navigation, item, index, firstOrder, lastOrder, sideFunctions, searchQuery, showListType}) => {
    // lenght, index => int
    // item => object

    const handleOnPress = () => {
        if (sideFunctions) sideFunctions();

        setTimeout(() => {
            navigation.navigate("Chat", {
                chatId: item.id, 
                chatType: "StockTransfer",
            });
            // if sidefunctions exist, slightly delay before navigating
        }, sideFunctions ? 750 : 10);
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
                // unique style for first order in order list array
                // add borderRadius to top of first order
                index === firstOrder && style.firstOrderWrapper, 
                // unique style for last order in order list array
                // add borderRadius to bottom of last order
                index === lastOrder && style.lastOrderWrapper,
            ]}
            // navigate to chat on press order
            onPress={handleOnPress}
        >
            {/* order info */}
            <View style={style.orderInfo}>
                {showListType && <Text style={style.listTypeText}>Stock transfer</Text>}
                <View style={style.warehouseNameWrapper}>
                    <Text 
                        style={[
                            style.orderMainText,
                            // if order has a new message make text have a color with higher opacity
                            { color: item.newMessage ? black : bodyText},
                            // if order has a new message make font have a higher weight
                            { fontFamily: item.newMessage ? 'mulish-bold' : 'mulish-regular' },
                            searchQuery && {color: bodyText, fontFamily: 'mulish-regular' },
                        ]}
                    >
                        {highlightSearchtext(item?.origin_warehouse)}
                    </Text>
                    <View style={style.iconWrapper}>
                        <StockTransferDirectionIcon />
                    </View>
                    <Text 
                        style={[
                            style.orderMainText,
                            // if order has a new message make text have a color with higher opacity
                            { color: item.newMessage ? black : bodyText},
                            // if order has a new message make font have a higher weight
                            { fontFamily: item.newMessage ? 'mulish-bold' : 'mulish-regular' },
                            searchQuery && {color: bodyText, fontFamily: 'mulish-regular' },
                        ]}
                    >
                        {highlightSearchtext(item?.destination_warehouse)}
                    </Text>
                </View>
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
                            return highlightSearchtext(", "+ product.product_name + " (" + product.quantity) + ")";
                        } else {
                            return highlightSearchtext(product.product_name + " (" + product.quantity) + ")";
                        }
                    })}
                </Text>
                {!showListType && (
                    <Text style={style.orderDatetime}>
                        {item.datetime}
                    </Text>
                )}
            </View>
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
        height: 90,
        gap: 12,
        backgroundColor: white,
        paddingBottom: 20,
    },
    firstOrderWrapper: {
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
    },  
    lastOrderWrapper: {
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
    },
    orderInfo: {
        height: "100%",
        // width: windowWidth - 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 4,
        alignSelf: 'stretch',
    },
    listTypeText: {
        fontFamily: 'mulish-bold',
        fontSize: 10,
        color: neutral,
    },
    warehouseNameWrapper: {
        width: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    iconWrapper: {
        backgroundColor: background,
        width: 13,
        height: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: white,
    },
    orderMainText: {
        fontFamily: 'mulish-bold',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
    },
    orderDatetime: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: orderDate,    
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
 
export default StockTransferListItem;
