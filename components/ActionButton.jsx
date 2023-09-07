
// react native components
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// colors
import { background, black, bodyText, primaryColor } from "../style/colors";

// button above text input in chat
const ActionButton = ({name, onPress, removeBottomMargin, selected}) => {
    return (
        <TouchableOpacity
            style={[
                style.actionButton, 
                removeBottomMargin && { marginBottom: 0},
                selected && { borderColor: primaryColor, borderWidth:1 }
            ]}
            onPress={onPress}
            activeOpacity={0.5}
        >
            {/* button text */}
            <Text 
                style={[
                    style.actionButtonText,
                    selected && { color: black }
                ]}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    actionButton: {
        // width: 70,
        paddingHorizontal: 16,
        // paddingVertical: 12,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: background,
        marginBottom: 15,
        borderRadius: 8,
    },
    actionButtonText: {
        fontFamily: 'mulish-medium',
        fontSize: 12,
        color: bodyText,
    }
})
 
export default ActionButton;