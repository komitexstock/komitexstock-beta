
// react native components
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// colors
import { background, bodyText } from "../style/globalStyleSheet";

// button above text input in chat
const ActionButton = ({name, onPress}) => {
    return (
        <TouchableOpacity
            style={style.actionButton}
            onPress={onPress}
        >
            {/* button text */}
            <Text style={style.actionButtonText}>{name}</Text>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    actionButton: {
        width: 70,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: background,
        marginBottom: 15,
        borderRadius: 5,
    },
    actionButtonText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: bodyText,
    }
})
 
export default ActionButton;