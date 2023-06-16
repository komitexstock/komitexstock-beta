
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ActionButton = ({name, onPress}) => {
    return (
        <TouchableOpacity
            style={style.actionButton}
            onPress={onPress}
        >
            <Text style={style.actionButtonText}>{name}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    actionButton: {
        width: 70,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#f8f8f8",
        marginBottom: 15,
        borderRadius: 5,
    },
    actionButtonText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: "rgba(34, 34, 34, 0.6)",
    }
})
 
export default ActionButton;