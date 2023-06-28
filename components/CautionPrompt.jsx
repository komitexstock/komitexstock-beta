import { View, StyleSheet } from "react-native";
import ExclamationIcon from "../assets/icons/ExclamationIcon";

const CautionPrompt = () => {
    return (
        <View style={style.markBackground}>
            <ExclamationIcon />
        </View>
    );
}
 
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