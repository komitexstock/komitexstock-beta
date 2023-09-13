// react native component
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
// icons
import SuccessGreenIcon from "../assets/icons/SuccessGreenIcon";
// color
import { background, blackOut, bodyText, deliveredText, subText, white } from "../style/colors";
// react hooks

const AlertNotice = ({text}) => {

    return (
        <View 
            style={[
                style.container,
            ]}
        >
            <View
                style={[
                    style.noticeWrapper,
                ]}
            >   
                <SuccessGreenIcon />
                <Text style={style.noticeText}>{text}</Text>
            </View>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        zIndex: 3,
        bottom: 147,
    },
    noticeWrapper: {
        height: 38,
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
        backgroundColor: white,
        shadowColor: bodyText,
        elevation: 8,
    },
    noticeText: {
        color: deliveredText,
        fontFamily: "mulish-semibold",
        fontSize: 12,
    },
})
 
export default AlertNotice;