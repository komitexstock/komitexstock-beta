import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { linkText, primaryColor } from "../style/colors";
// expo clipboard
import * as Clipboard from 'expo-clipboard';
// use auth
import { useAuth } from "../context/AuthContext";

const NumberLink = ({number, account_type, onPress, copyNumberAlert}) => {

    const { authData } = useAuth()

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        copyNumberAlert(true);
    };

    return (
        <TouchableOpacity
            style={style.linkButton}
            onPress={() => {onPress(number)}}
            onLongPress={() => {copyToClipboard(number)}}
        >
            <Text style={authData?.account_type === account_type ? style.sentLinkText : style.receivedLinkText}>
                {number}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    linkButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: "100%",
        alignSelf: 'baseline',
        paddingLeft: 3,
    },
    sentLinkText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        marginBottom: -3,
        color: linkText,
    },
    receivedLinkText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        marginBottom: -3,
        color: primaryColor,
    },
})
 
export default NumberLink;