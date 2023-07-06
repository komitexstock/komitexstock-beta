// react native components
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
// colors
import { background, black, bodyText, primaryColor, secondaryColor } from "../style/colors";


const FilterButtonGroup = ({buttons, title}) => {
    // buttons => array of objects
    // title => string

    // render FilterButtonGroup component
    return (
        <View style={style.filterButtonGroup}>
            {/* filter button group title */}
            <Text style={style.filterHeading}>{title}</Text>
            <View style={style.buttonWrapper}>
                {/* filter button list */}
                {buttons.map(button => (
                    // filter button
                    <TouchableOpacity 
                        key={button.id} 
                        style={button.selected ? style.selectedButton : style.filterButton}
                    >
                        <Text 
                            style={button.selected ? style.selectedButtonText : style.filterButtonText}
                        >
                            {/* button text */}
                            {button.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

// stylesheet
const style =  StyleSheet.create({
    filterButtonGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: 80,
        gap: 10,
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
        backgroundColor: background,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    filterButtonText: {
        fontFamily: 'mulish-medium',
        fontSize: 10,
        color: bodyText,
    },
    selectedButton: {
        height: 28,
        borderRadius: 5,
        backgroundColor: background,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: primaryColor,
        backgroundColor: secondaryColor,
    },
    selectedButtonText: {
        fontFamily: 'mulish-medium',
        fontSize: 10,
        color: black,
    }
})
 
export default FilterButtonGroup;