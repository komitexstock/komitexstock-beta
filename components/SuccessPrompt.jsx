// react components
import { View, StyleSheet } from "react-native";
// icon
import MarkIcon from "../assets/icons/MarkIcon";
// color
import { secondaryColor } from "../style/globalStyleSheet";

const SuccessPrompt = () => {
    // render SuccessPrompt component
    return (
        <View style={style.markBackground}>
            <MarkIcon />
        </View>
    );
}
 
// stylesheet
const style = StyleSheet.create({
    markBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: secondaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SuccessPrompt;