// react native components
import { View, Text, StyleSheet } from "react-native";
import { black, cancelledContainer, cancelledText, deliveredContainer, deliveredText, pendingContainer, pendingText, primaryColor, rescheduledContainer, secondaryColor } from "../style/colors";

const Indicator = ({type, text}) => {
    // type => string of "Pending", "Delivered", "Cancelled", "Rescheduled", "Dispatched"
    // text => string of text

    if (type === "Delivered") return (
        // render green indicator
        <View style={style.deliveredContainer}>
            <Text style={style.deliveredText}>{text}</Text>
        </View>
    );
    else if (type === "Cancelled") return (
        // render red indicator
        <View style={style.canceledContainer}>
            <Text style={style.canceledText}>{text}</Text>
        </View>
    );
    else if (type === "Pending") return (
        // render yellowish orange indicator
        <View style={style.pendingContainer}>
            <Text style={style.pendingText}>{text}</Text>
        </View>
    );
    else if (type === "Dispatched") return (
        // render blue indicator
        <View style={style.dispatchedContainer}>
            <Text style={style.dispatchedText}>{text}</Text>
        </View>
    );
    else return (
        // render grey indicator
        <View style={style.rescheduledContainer}>
            <Text style={style.rescheduledText}>{text}</Text>
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
        backgroundColor: deliveredContainer,
    },  
    deliveredText: {
        fontSize: 8,
        color: deliveredText,
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
        backgroundColor: rescheduledContainer,
    },  
    rescheduledText: {
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
        backgroundColor: cancelledContainer,
    },  
    canceledText: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: cancelledText
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
    dispatchedText: {
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
        backgroundColor: pendingContainer,
    },  
    pendingText: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: pendingText
    },
})

export default Indicator;