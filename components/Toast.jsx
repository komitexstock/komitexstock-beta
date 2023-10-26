// react native component
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
// icons
import CloseWhiteIcon from "../assets/icons/CloseWhiteIcon";
import SuccessIcon from "../assets/icons/SuccessIcon";
import ErrorIcon from "../assets/icons/ErrorIcon";
// color
import { white } from "../style/colors";
// react hooks
import { useEffect, useRef } from "react";
// globals
import { useGlobals } from "../context/AppContext";

const Toast = () => {

    // toast controllers
    const { toast, setToast } = useGlobals();

    // animated value
    const top = useRef(new Animated.Value(20)).current;

    // close toast function
    const closeToast = () => {
        setToast(prevToast => {
            return {
                ...prevToast,
                visible: false
            }
        })
    }

    useEffect(() => {
        if (toast.visible) {
            Animated.spring(top, {
                toValue: 0,
                useNativeDriver: false,
                speed: 0.1,
                bounciness: 2,
                duration: 2000,
            }).start();
        } else {
            Animated.spring(top, {
                toValue: 25,
                useNativeDriver: false,
                speed: 0.1,
                bounciness: 2,
                duration: 2000,
            }).start();
        }

        setTimeout(() => {
            closeToast();
        }, 5000);

        
    }, [toast.visible]);


    return (
        <Animated.View 
            style={[
                style.container,
                {
                    top: top,
                    display: toast.visible ? "flex" : "none",
                    // transform: [{ translateY }], // Apply the animated translation
                },
            ]}
        >
            <View
                style={[
                    style.noticeWrapper,
                    // render red backround style if type === "error"
                    // render green backround style if type === "success"
                    toast.type.toLowerCase() === "success" ? style.success : style.error
                ]}
            >   
                <View>
                    {/* render the appropriate icon */}
                    { toast.type.toLowerCase() === "success" ? <SuccessIcon /> : <ErrorIcon />}
                </View> 
                <View style={style.textWrapper}>
                    {/* render the appropriate heading */}
                    <Text style={style.noticeType}>{toast.type.toLowerCase() === "success" ? "Success!" : "Error!"}</Text>
                    {/* render text passed to the component as a prop */}
                    <Text style={style.noticeInfo}>{toast.text}</Text>
                </View>
                {/* close alert notice button */}
                <TouchableOpacity
                    onPress={closeToast}
                    style={style.closeButton}
                >
                    <CloseWhiteIcon />
                </TouchableOpacity>
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
    },
    success: {
        backgroundColor: "rgba(3, 152, 85, 1)",
    },
    error: {
        backgroundColor: "rgba(180, 35, 24, 1)",
    },
    noticeWrapper: {
        width: "100%",
        minHeight: 65,
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 15,
        paddingHorizontal: 12,
        position: "relative",
        gap: 12,
    },
    textWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        flex: 1,
    },
    noticeType: {
        color: white,
        fontFamily: "mulish-bold",
        fontSize: 14,
    },
    noticeInfo: {
        color: white,
        fontFamily: "mulish-medium",
        fontSize: 10,
    },
    closeButton: {
        height: 65,
        width: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: 0,
        position: "absolute",
        right: 0,
        top: 0,
    }
})
 
export default Toast;