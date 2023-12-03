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
import Avatar from './Avatar';
// colors
import { background, black, bodyText, neutral, orderDate, secondaryColor, white } from '../style/colors';
// import helper functions
import { windowWidth } from '../utils/helpers';
// use auth
import { useAuth } from '../context/AuthContext';

const OrderListItem = ({item, index, firstOrder, lastOrder, selectable, selected, selectFunction, extraVerticalPadding, sideFunctions, searchQuery, navigation, showListType}) => {
    // lenght, index => int
    // item => object

    const { authData } = useAuth();

    // get the desired business name
    const handleChatHeaderBusinessName = () => {
        if (authData?.account_type !== "Merchant") return item?.merchant?.business_name;
        if (authData?.account_type !== "Logistics") return item?.logistics?.business_name;
        return null;
    }
    
    // get the desired banner image
    const handleChatHeaderBanner = () => {
        if (authData?.account_type !== "Merchant") return item?.merchant?.banner_image;
        if (authData?.account_type !== "Logistics") return item?.logistics?.banner_image;
        return null;
    }

    const handleOnPress = () => {
        if (selectable) {
            return selectFunction(item.id);
        } else {
            if (sideFunctions) sideFunctions();
            // return onPress;
            setTimeout(() => {
                navigation.navigate("Chat", {
                    chatId: item.id, 
                    chatType: "Order",
                    business_name: handleChatHeaderBusinessName(),
                    banner_image: handleChatHeaderBanner(),
                });
            }, 750);
        }
    }

    // function to highlight search text
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

    // cont process banner image
    const handleBannerImage = () => {
        // if
    };

    // console.log(authData);

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

                extraVerticalPadding && style.extraVerticalPadding,
            ]}
            // navigate to chat on press order
            onPress={handleOnPress}
            activeOpacity={selectable ? 0.8 : 0.5}
        >
            <View style={style.orderDetailsContainer}>
                {showListType && <Text style={style.listTypeText}>Order</Text>}
                <View style={style.orderDetailsWrapper}>
                    {/* logistics/merchnat image */}
                    <View style={style.orderImageContainer}>
                        {/* merchant avatar */}
                        {authData.account_type === "Logistics" && (
                            <Avatar 
                                imageUrl={item?.merchant?.banner_image}
                                squared={true}
                                selected={selectable && selected}
                                fullname={item?.merchant?.business_name}
                            />
                        )}
                        {/* logistics avatar */}
                        {authData.account_type === "Merchant" && (
                            <Avatar 
                            imageUrl={item?.logistics?.banner_image}
                            squared={true}
                            selected={selectable && selected}
                            fullname={item?.logistics?.business_name}
                            />
                        )}
                    </View>
                    {/* order info */}
                    <View style={style.orderInfo}>
                        {/* customer name and location */}
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
                        {/* products */}
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
                        {/* date time */}
                        {/* if showLIstType is true hide datetime */}
                        {!showListType && (
                            <Text style={style.orderDatetime}>
                                {item.datetime}
                            </Text>
                        )}
                    </View>
                </View>
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
    orderDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
        width: windowWidth - 142,
    },
    listTypeText: {
        fontFamily: 'mulish-bold',
        fontSize: 10,
        color: neutral,
    },
    orderDetailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        width: "100%",
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
        width: 40,
        height: 40,
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
 
export default OrderListItem;
