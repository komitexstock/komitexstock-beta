import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CloseWhiteIcon from "../assets/icons/CloseWhiteIcon";
import SuccessIcon from "../assets/icons/SuccessIcon";
import ErrorIcon from "../assets/icons/ErrorIcon";

const AlertNotice = ({type, text, closeAlert}) => {
    return (
        <View style={style.container}>
            <View
                style={[
                    style.noticeWrapper, 
                    type === "success" ? style.success : style.error
                ]}
            >   
                <View>
                    { type === "success" ? <SuccessIcon /> : <ErrorIcon />}
                </View> 
                <View style={style.textWrapper}>
                    <Text style={style.noticeType}>{type === "success" ? "Success!" : "Error!"}</Text>
                    <Text style={style.noticeInfo}>{text}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => closeAlert(false)}
                    style={style.closeButton}
                >
                    <CloseWhiteIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 50,
        left: 0,
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
        displaay: "flex",
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
        color: "#ffffff",
        fontFamily: "mulish-bold",
        fontSize: 14,
    },
    noticeInfo: {
        color: "#ffffff",
        fontFamily: "mulish-regular",
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
 
export default AlertNotice;