// react native components
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
// components
import ActionButton from "./ActionButton";
// colors
import { background, black, bodyText, primaryColor, secondaryColor } from "../style/colors";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";



const FilterButtonGroup = ({buttons, title}) => {
    // buttons => array of objects
    // title => string

    // render FilterButtonGroup component
    return (
        <View style={style.filterButtonGroup}>
            {/* filter button group title */}
            <Text style={style.filterHeading}>{title}</Text>
            <BottomSheetScrollView 
                contentContainerStyle={style.buttonWrapper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {/* filter button list */}
                {buttons.map(button => (
                    // filter button
                    <ActionButton
                        key={button.text}
                        name={button.text}
                        removeBottomMargin={true}
                        selected={button.selected}
                        onPress={button.onPress}
                    />
                ))}
            </BottomSheetScrollView>
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
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingRight: 20,
        paddingBottom: 24,
        paddingTop: 12,
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