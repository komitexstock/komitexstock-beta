import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { primaryColor } from "../style/globalStyleSheet";

const CustomButton = ({name, onPress, backgroundColor, fixed, inactive}) => {

    // const inactive = true;

    // console.log(inactive);

    return (
        <View style={[ fixed ? style.fixed : style.buttonWrapper, {backgroundColor: backgroundColor}]}>
            <TouchableOpacity 
                style={inactive ? style.inactive : style.button}
                onPress={inactive ? () => {} : onPress}
            >
                <Text style={style.buttonText}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
}

// console.log(inactive);

const style = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: primaryColor,
        height: 44,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }, 
    inactive: {
        width: "100%",
        backgroundColor: "rgba(7, 66, 124, 0.3)",
        height: 44,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }, 
    buttonText: {
        fontFamily: "mulish-semibold",
        color: "#ffffff",
        fontSize: 16,
    },
    buttonWrapper: {
        width: "100%",
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1,
    },
    fixed: {
        width: "100%",
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1000,
        position: "absolute",
        bottom: 0,
        left: 0
    }
})
 
export default CustomButton;