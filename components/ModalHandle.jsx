import { View, StyleSheet } from "react-native";

const ModalHandle = () => {
    return (
        <View style={styles.modalHandleWrapper}>
            <View style={styles.modalHandle}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalHandleWrapper: {
        height: 15,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center' ,       
    },
    modalHandle: {
        width: 100,
        height: 4,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',

    },
})
 
export default ModalHandle;