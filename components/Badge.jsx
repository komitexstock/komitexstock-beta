// react native components
import { View, Text, StyleSheet } from "react-native";

const Badge = ({number}) => {
    // render Badge component
    return number !== 0 && (
        <View style={style.badge}>
            {/* text showing number of orders/waybill with new messages */}
            <Text style={style.badgeText}>{number}</Text>
        </View>
    );
}

// stylesheets
const style = StyleSheet.create({
    badge: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "rgba(254, 243, 242, 1)",
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "rgba(254, 243, 242, 1)",
    },
    badgeText: {
        color: "rgba(180, 35, 24, 1)",
        fontFamily: 'mulish-regular',
        fontSize: 10,
        lineHeight: 16,
        height: 16,
        textAlign: 'center',
        width: 16,
    },
})
 
export default Badge;