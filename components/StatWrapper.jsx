import { View, StyleSheet } from "react-native";

const StatWrapper = ({children}) => {
    return (
        <View style={style.statsWrapper}>
            {children}
        </View>
    );
}

const style = StyleSheet.create({
    statsWrapper: {
        height: 156,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
    },
})
 
export default StatWrapper;