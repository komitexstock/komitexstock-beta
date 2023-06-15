import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import RightArrowIcon from "../assets/icons/RightArrowIcon";

const AccountButtons = ({title, subtitle, icon, length, index}) => {
    return (
        <TouchableOpacity style={[
            style.accountButtonWrapper, 
            index === 0 && style.topBorderRadius,
            length === index && style.bottomBorderRadius,
        ]}>
            {icon}
            <View style={style.accountButtonContent}>
                <Text style={style.accountButtonPrimaryText}>{title}</Text>
                {subtitle && <Text style={style.accountButtonSecondaryText}>{subtitle}</Text>}
            </View>
            <RightArrowIcon />
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    accountButtonWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        height: 60,
        padding: 10,
        gap: 10,
    },
    accountButtonContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    accountButtonPrimaryText: {
        fontFamily: "mulish-semibold",
        fontSize: 14,
    },
    accountButtonSecondaryText: {
        fontFamily: "mulish-regular",
        fontSize: 10,
    },
    topBorderRadius: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    bottomBorderRadius: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
})
 
export default AccountButtons;