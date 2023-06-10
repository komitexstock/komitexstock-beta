import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { primaryColor } from "../style/globalStyleSheet";

const CustomButton = ({name, onPress, backgroundColor}) => {
    return (
        <View style={[style.fixedButton, {backgroundColor: backgroundColor}]}>
            <TouchableOpacity 
                style={style.button}
                onPress={onPress}
            >
                <Text style={style.buttonText}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    buttonText: {
        fontFamily: "mulish-semibold",
        color: "#ffffff",
        fontSize: 16,
    },
    fixedButton: {
        width: "100%",
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        position: 'absolute',
        left: 0,
        paddingHorizontal: 20
    }
})
 
export default CustomButton;