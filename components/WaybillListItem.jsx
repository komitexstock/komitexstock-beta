// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// components
import Indicator from './Indicator';
import Mark from './Mark';
import Avatar from './Avatar';
// colors
import { black, bodyText, neutral, white } from '../style/colors';
// import helper functions
import { windowWidth } from '../utils/helpers';
// use auth
import { useAuth } from '../context/AuthContext';

const WaybillListItem = ({navigation, item, index, firstWaybill, lastWaybill, sideFunctions, searchQuery, waybillType}) => {
    // item => object
    // index, length => int

    // auth data
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
        if (sideFunctions) sideFunctions();

        setTimeout(() => {
            navigation.navigate("Chat", {
                chatId: item.id, 
                chatType: "Waybill",
                business_name: handleChatHeaderBusinessName(),
                banner_image: handleChatHeaderBanner(),
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

    const bullet = '\u2022'

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
            <View style={style.waybillDetailsContainer}>
                {waybillType && <Text style={style.listTypeText}>
                    Waybill {bullet} {waybillType}</Text>}
                <View style={style.waybillDetailsWrapper}>
                    {/* waybill image */}
                    <Avatar 
                        imageUrl={
                            authData?.account_type === "Logistics" ? 
                            item?.merchant?.banner_image : 
                            item?.logistics?.banner_image
                        }
                        squared={true}
                        fullname={
                            authData?.account_type === "Logistics" ? 
                            item?.merchant?.business_name : 
                            item?.logistics?.business_name
                        }
                    />
                    {/* waybuill info */}
                    <View style={style.orderInfo}>
                        {/* products */}
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
                        {/* datetime */}
                        {!waybillType && (
                            <Text style={style.orderDatetime}>{item.datetime}</Text>
                        )}
                    </View>
                </View>
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
    waybillDetailsContainer: {
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
    waybillDetailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        width: "100%",
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
