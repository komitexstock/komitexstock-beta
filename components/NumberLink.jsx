import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { linkText, primaryColor } from "../style/colors";

const NumberLink = ({number, account_type, handleOnPressPhoneNumber}) => {

    const accountType = "Merchant"

    return (
        <TouchableOpacity
            style={style.linkButton}
            onPress={() => {handleOnPressPhoneNumber(number)}}
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