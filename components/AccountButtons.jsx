import { Text, View, TouchableOpacity, StyleSheet, Switch } from "react-native";
import RightArrowIcon from "../assets/icons/RightArrowIcon";

const AccountButtons = ({title, subtitle, icon, length, index, onPress, toggle, isEnabled, handleToggle, unpadded}) => {
    
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                style.accountButtonWrapper, 
                index === 0 && style.topBorderRadius,
                length === index && style.bottomBorderRadius,
                unpadded ? style.unpadded : style.padded,
            ]}
        >
            {icon}
            <View style={style.accountButtonContent}>
                <Text style={style.accountButtonPrimaryText}>{title}</Text>
                {subtitle && <Text style={style.accountButtonSecondaryText}>{subtitle}</Text>}
            </View>
            { !toggle ? <RightArrowIcon /> : (
                <Switch 
                    trackColor={{ false: "#E6E6E6", true: "#07427C0D" }}
                    thumbColor={isEnabled ? "#07427C" : "#AFAFAF"}
                    ios_backgroundColor="#07427C0D"
                    onValueChange={handleToggle}
                    value={isEnabled}     
                />
            )}
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
        paddingVertical: 10,
        gap: 10,
    },
    padded: {
        paddingHorizontal: 10,
    },
    unpadded: {
        paddingHorizontal: 0,
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