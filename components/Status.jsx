import { View, Text, StyleSheet } from "react-native";

const Status = ({status}) => {
    if (status === "Delivered") return (
        <View style={style.deliveredContainer}>
            <Text style={style.deliveredStatus}>Delivered</Text>
        </View>
    );
    else if (status === "Canceled") return (
        <View style={style.canceledContainer}>
            <Text style={style.canceledStatus}>Canceled</Text>
        </View>
    );
    else if (status === "Rescheduled") return (
        <View style={style.rescheduledContainer}>
            <Text style={style.rescheduledStatus}>Rescheduled</Text>
        </View>
    );
    else if (status === "Dispatched") return (
        <View style={style.dispatchedContainer}>
            <Text style={style.dispatchedStatus}>Dispatched</Text>
        </View>
    );
    else return (
        <View style={style.pendingContainer}>
            <Text style={style.pendingStatus}>Pending</Text>
        </View>
    );
}

const style = StyleSheet.create({
    deliveredContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
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
        width: 60,
        borderRadius: 20,
        backgroundColor: "rgba(34, 34, 34, 0.05)",
    },  
    rescheduledStatus: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: "rgba(34, 34, 34, 1)"
    },
    canceledContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        borderRadius: 20,
        backgroundColor: "rgba(254, 228, 226, 1)",
    },  
    canceledStatus: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: "rgba(217, 45, 32, 1)"
    },
    dispatchedContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        borderRadius: 20,
        backgroundColor: "rgba(7, 66, 2187, 0.05)",
    },  
    dispatchedStatus: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: "rgba(7, 66, 124, 1)"
    },
    pendingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 60,
        borderRadius: 20,
        backgroundColor: "rgba(254, 240, 199, 1)",
    },  
    pendingStatus: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: "rgba(220, 104, 3, 1)"
    },
})

export default Status;