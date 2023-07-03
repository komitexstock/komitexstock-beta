// react native components
import { 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Switch 
} from "react-native";
// icon
import RightArrowIcon from "../assets/icons/RightArrowIcon";
// colors
import { white, primaryColor, secondaryColor, black, bodyText } from "../style/globalStyleSheet";

const AccountButtons = ({title, subtitle, mainInfoText, icon, length, index, onPress, toggle, isEnabled, handleToggle, unpadded, disabled}) => {
    // index, length => int
    // title, subtitle, mainInfoText => string
    // onPress, handleToggle => function
    // isEnabled, toggle, disabled, unpadded => boolean     
    // render account button
    return !toggle ? (
        // if toggle is false, make whole component a button
        <TouchableOpacity 
            onPress={disabled ? () => {} : onPress}
            style={[
                style.accountButtonWrapper, 
                // style to make first botton have a border radius on top
                index === 0 && style.topBorderRadius,
                // style to make last botton have a border radius on top
                length === index && style.bottomBorderRadius,
                // style to remove horizntal padding from button
                // useful if button is already in a padded bottomsheet/container   
                unpadded ? style.unpadded : style.padded,
            ]}
        >
            {/* icon */}
            {icon}
            <View 
                style={[
                    style.accountButtonContent, 
                    // if button is disable, apply disabled style
                    // disbled style reduces the opacity
                    disabled && style.disabled
                ]}
            >
                <Text style={style.accountButtonPrimaryText}>{title}</Text>
                {subtitle && <Text style={style.accountButtonSecondaryText}>{subtitle}</Text>}
                {mainInfoText && <Text style={style.accountButtonText}>{mainInfoText}</Text>}
            </View>
            <RightArrowIcon />
        </TouchableOpacity>
    ) : (
        // if toggle is false, make whole component a basic container
        <View 
            style={[
                style.accountButtonWrapper, 
                // style to make first botton have a border radius on top
                index === 0 && style.topBorderRadius,
                // style to make last botton have a border radius on top
                length === index && style.bottomBorderRadius,
                // style to remove horizntal padding from button
                // useful if button is already in a padded bottomsheet/container   
                unpadded ? style.unpadded : style.padded,
            ]}
        >
            {/* icon */}
            {icon}
            <View 
                style={[
                    style.accountButtonContent, 
                    // if button is disable, apply disabled style
                    // disbled style reduces the opacity
                    disabled && style.disabled
                ]}
            >
                <Text style={style.accountButtonPrimaryText}>{title}</Text>
                {subtitle && <Text style={style.accountButtonSecondaryText}>{subtitle}</Text>}
                {mainInfoText && <Text style={style.accountButtonText}>{mainInfoText}</Text>}
            </View>
            <Switch 
                trackColor={{ false: "#E6E6E6", true: {secondaryColor} }}
                thumbColor={isEnabled ? primaryColor : "#AFAFAF"}
                ios_backgroundColor={secondaryColor}
                onValueChange={handleToggle}
                value={isEnabled}     
            />
        </View>
        
    );
}

// stylesheet
const style = StyleSheet.create({
    accountButtonWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: white,
        height: 60,
        paddingVertical: 10,
        gap: 10,
    },
    disabled: {
        opacity: 0.5,
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
        color: black,
    },
    accountButtonText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
    },
    accountButtonSecondaryText: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: bodyText,
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