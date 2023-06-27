import { View, StyleSheet } from "react-native";
import MarkIcon from "../assets/icons/MarkIcon";
import { secondaryColor } from "../style/globalStyleSheet";

const SuccessPrompt = () => {
    return (
        <View style={style.markBackground}>
            <MarkIcon />
        </View>
    );
}
 
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