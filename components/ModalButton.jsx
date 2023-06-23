import { primaryColor } from "../style/globalStyleSheet";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const ModalButton = ({onPress, name, emptyFeilds}) => {
    return (
        <View style={style.wrapper}>
            <TouchableOpacity 
                style={[style.button, {backgroundColor: !emptyFeilds ? primaryColor : "rgba(7, 66, 124, 0.30)"}]}
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