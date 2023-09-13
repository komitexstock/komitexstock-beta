import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { linkText, primaryColor } from "../style/colors";
// expo clipboard
import * as Clipboard from 'expo-clipboard';

const NumberLink = ({number, account_type, onPress}) => {

    const accountType = "Merchant";


    // console.log(number);

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };

    return (
        <TouchableOpacity
            style={style.linkButton}
            onPress={() => {onPress(number)}}
            onLongPress={() => {copyToClipboard(number)}}
        >
            <Text style={accountType === account_type ? style.sentLinkText : style.receivedLinkText}>
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