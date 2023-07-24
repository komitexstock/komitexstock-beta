// react native components
import { View, Text, StyleSheet } from "react-native";
import { black, primaryColor, secondaryColor } from "../style/colors";

const Indicator = ({type, text}) => {
    // type => string of "Pending", "Delivered", "Cancelled", "Rescheduled", "Dispatched"
    // text => string of text

    if (type === "Delivered") return (
        // render green indicator
        <View style={style.deliveredContainer}>
            <Text style={style.deliveredStatus}>{text}</Text>
        </View>
    );
    else if (type === "Cancelled") return (
        // render red indicator
        <View style={style.canceledContainer}>
            <Text style={style.canceledStatus}>{text}</Text>
        </View>
    );
    else if (type === "Pending") return (
        // render yellowish orange indicator
        <View style={style.pendingContainer}>
            <Text style={style.pendingStatus}>{text}</Text>
        </View>
    );
    else if (type === "Dispatched") return (
        // render blue indicator
        <View style={style.dispatchedContainer}>
            <Text style={style.dispatchedStatus}>{text}</Text>
        </View>
    );
    else return (
        // render grey indicator
        <View style={style.rescheduledContainer}>
            <Text style={style.rescheduledStatus}>{text}</Text>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    deliveredContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        minWidth: 60,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: "#D1FADF",
    },  
    deliveredStatus: {
        fontSize: 8,
        color: "#039855",
        fontFamily: 'mulish-regular',
    },
    rescheduledContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        minWidth: 60,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: "rgba(34, 34, 34, 0.05)",
    },  
    rescheduledStatus: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: black,
    },
    canceledContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        borderRadius: 20,
        paddingHorizontal: 5,
        backgroundColor: "rgba(254, 243, 242, 1)",
    },  
    canceledStatus: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: "rgba(180, 35, 24, 1)"
    },
    dispatchedContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: secondaryColor,
    },  
    dispatchedStatus: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: primaryColor, 
    },
    pendingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        borderRadius: 20,
        paddingHorizontal: 5,
        backgroundColor: "rgba(254, 240, 199, 1)",
    },  
    pendingStatus: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: "rgba(220, 104, 3, 1)"
    },
})

export default Indicator;