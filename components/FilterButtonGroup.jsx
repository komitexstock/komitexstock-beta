import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { primaryColor } from "../style/globalStyleSheet";

const FilterButtonGroup = ({buttons, title}) => {
    return (
        <View style={style.filterButtonGroup}>
            <Text style={style.filterHeading}>{title}</Text>
            <View style={style.buttonWrapper}>
                {buttons.map(button => (
                    <TouchableOpacity 
                        key={button.id} 
                        style={button.selected ? style.selectedButton : style.filterButton}
                    >
                        <Text 
                            style={button.selected ? style.selectedButtonText : style.filterButtonText}
                        >
                            {button.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const style =  StyleSheet.create({
    filterButtonGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: 80,
        gap: 10,
        // backgroundColor: "teal",
    },
    filterHeading: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    filterButton: {
        height: 28,
        borderRadius: 5,
        backgroundColor: "#F8F8F8",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    filterButtonText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: "rgba(34, 34, 34, 0.6)"
    },
    selectedButton: {
        height: 28,
        borderRadius: 5,
        backgroundColor: "#F8F8F8",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: primaryColor,
        backgroundColor: "rgba(7, 66, 124, 0.05)",
    },
    selectedButtonText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: "#222222",
    }
})
 
export default FilterButtonGroup;