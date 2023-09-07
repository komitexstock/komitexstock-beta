// import react native components
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import colors
import { black } from "../style/colors";
// icons
import CloseSmallIcon from "../assets/icons/CloseSmallIcon";


const FilterPill = ({text, background, onPress}) => {
    return (
        <View style={[style.filterPill, {backgroundColor: background}]}>
            <Text style={style.pillText}>{text}</Text>
            <TouchableOpacity onPress={onPress}>
                <CloseSmallIcon />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    filterPill: {
        borderRadius: 24,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        // height: 26,
    },
    pillText: {
        color: black,
        fontSize: 10,
        lineHeight: 13,
        fontFamily: "mulish-regular",
    }
})
 
export default FilterPill;