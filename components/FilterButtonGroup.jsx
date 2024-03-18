// react native components
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
// components
import ActionButton from "./ActionButton";
// colors
import { background, black, bodyText, primaryColor, secondaryColor } from "../style/colors";
// scroll view from gesture handler
import { ScrollView } from "react-native-gesture-handler";

const FilterButtonGroup = ({children, buttons, title}) => {
    // buttons => array of objects
    // title => string

    // render FilterButtonGroup component
    return (
        <View style={style.filterButtonGroup}>
            {/* filter button group title */}
            <Text style={style.filterHeading}>{title}</Text>
            <ScrollView
                style={style.buttonContainer}
                contentContainerStyle={style.buttonWrapper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {/* render children */}
                {children}
            </ScrollView>
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
    },
    filterHeading: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    buttonContainer: {
        height: 68,
    },
    buttonWrapper: {
        paddingRight: 20,
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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