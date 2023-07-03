// react native component
import { View, StyleSheet } from "react-native";
// icons
import ExclamationIcon from "../assets/icons/ExclamationIcon";

const CautionPrompt = () => {
    // render CautionPropmt component
    return (
        <View style={style.markBackground}>
            {/* icon */}
            <ExclamationIcon />
        </View>
    );
}
 
// stylesheet
const style = StyleSheet.create({
    markBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FEF0C7",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CautionPrompt;