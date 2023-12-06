// react native component
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated
} from "react-native";
// icons
import SuccessGreenIcon from "../assets/icons/SuccessGreenIcon";
// color
import { bodyText, deliveredText, neutral, subText, white } from "../style/colors";
// react hooks
import { useEffect, useRef } from "react";

const AlertNotice = ({show, text, copyNumberAlert}) => {

    const bottom = useRef(new Animated.Value(127)).current;

    useEffect(() => {
        Animated.spring(bottom, {
            toValue: 147,
            useNativeDriver: false,
            speed: 1,
            bounciness: 10,
            duration: 750,
        }).start();
    }, [show]);

    return (
        <Animated.View 
            style={[
                style.container,
                {bottom: bottom},
            ]}
        >
            <View
                style={[
                    style.noticeWrapper,
                ]}
            >   
                {copyNumberAlert ? (
                    <>
                        <Image source={require("../assets/splash/komitexsplash.png")} style={style.noticeImage} />
                        <Text style={style.text}>Number copied</Text>
                    </>
                ) : (
                    <>
                        <SuccessGreenIcon />
                        <Text style={style.noticeText}>{text}</Text>
                    </>
                ) }
            </View>
        </Animated.View>
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
        shadowColor: neutral,
        elevation: 10,
    },
    noticeText: {
        color: deliveredText,
        fontFamily: "mulish-semibold",
        fontSize: 12,
    },
    noticeImage: {
        width: 20,
        height: 20,
        borderRadius: 4,
    },
    text: {
        color: bodyText,
        fontFamily: "mulish-semibold",
        fontSize: 12,
    },
})
 
export default AlertNotice;