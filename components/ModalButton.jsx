import { primaryColor } from "../style/globalStyleSheet";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const ModalButton = ({onPress, name}) => {
    return (
        <View style={style.wrapper}>
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
    wrapper: {
        width: "100%",
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#ffffff',
    },
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
})
 
export default ModalButton;