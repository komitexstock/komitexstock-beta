// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// components
import Indicator from './Indicator';
import HighlightSearchedText from './HighlightSearchedText'
import Avatar from './Avatar';
// colors
import { black, bodyText, neutral, white } from '../style/colors';
// import helper functions
import { windowWidth } from '../utils/helpers';
// use auth
import { useAuth } from '../context/AuthContext';
// moment
import moment from 'moment';
// utils
import { serverTImestampToMilliseconds } from '../utils/serverTImestampToMilliseconds';

const WaybillListItem = ({firstWaybill, lastWaybill, searchQuery, bannerImage, businessName, isIncrement, status, products, onPress, newMessage, createdAt}) => {
    // item => object
    // index, length => int

    // auth data
    const { authData } = useAuth();

    // Assuming createdAt is the timestamp from Firebase
    const formattedTimestamp = moment(serverTImestampToMilliseconds(createdAt)).format('YYYY-MM-DD HH:m');
    // const formattedTimestamp = moment(serverTImestampToMilliseconds(createdAt)).format('ddd h:mma, DD/MM/YYYY');

    // waybill type text
    const waybillTypeText = () => {
        if (isIncrement) {
            return authData?.account_type === "Logistics" ? "Incoming" : "Outgoing";
        }
        return authData?.account_type !== "Logistics" ? "Incoming" : "Outgoing";
    }

    const bullet = '\u2022'

    // render WaybillListItem component
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
                // add top border radius to first waybill in the list
                firstWaybill && style.firstOrderWrapper, 
                // add bottom border radius to last waybill in the list
                lastWaybill && style.lastOrderWrapper
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={style.waybillDetailsContainer}>
                {isIncrement !== undefined && <Text style={style.listTypeText}>
                    Waybill {bullet} {waybillTypeText()}
                </Text>}
                <View style={style.waybillDetailsWrapper}>
                    {/* waybill image */}
                    <Avatar 
                        imageUrl={bannerImage}
                        fullname={businessName}
                        squared={true}
                        diameter={40}
                    />
                    {/* waybuill info */}
                    <View style={style.orderInfo}>
                        {/* products */}
                        {!searchQuery ? (
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={[
                                    style.orderMainText,
                                    // if theres a newMessage in the waybill chat, make text color darker
                                    {color: newMessage ? black : bodyText},
                                    // if theres a newMessage in the waybill chat, use diffrent font weight
                                    {fontFamily: newMessage ? 'mulish-bold' : 'mulish-regular'},
                                ]}
                            >
                                {products}
                            </Text>
                        ) : (
                            <HighlightSearchedText
                                targetText={products}
                                searchQuery={searchQuery}
                            />
                        )}
                        {/* datetime */}
                        {isIncrement === undefined && (
                            <Text style={style.orderDatetime}>{formattedTimestamp}</Text>
                        )}
                    </View>
                </View>
            </View>
            {/* indicate waybill status */}
            <View style={style.orderPriceContainer}>
                <Indicator type={status} text={status} />
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
        fontSize: 12,
        lineHeight: 15,
        maxHeight: 30,
        textTransform: 'capitalize',
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
