// recat native components
import { View, StyleSheet } from "react-native";

const StatWrapper = ({children}) => {
    return (
        // render StatWrapper component
        <View style={style.statsWrapper}>
            {/* render children */}
            {children}
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    statsWrapper: {
        minHeight: 62,
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