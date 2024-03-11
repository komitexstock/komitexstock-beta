// react native components
import { Text, View, StyleSheet } from "react-native";
// icons
import PercentageIncreaseIcon from '../assets/icons/PercentageIncreaseIcon';
import PercentageDecreaseIcon from '../assets/icons/PercentageDecreaseIcon';
// colors
import { background, bodyText, black } from "../style/colors";

const PercentageChange = ({presentValue, oldValue}) => {
    // presentValue, oldValue => float

    // function calculate percentage difference between old value and new value
    const percentageDifference = () => {
        let result = 100 * ((presentValue - oldValue)/oldValue);
        result = result.toFixed(2);

        if (!isFinite(result)) {
            return "N/A";
        } else {
            return result;
        }
    }

    // function to render the right icon to reflect either increase or decrease from oldValue
    const handleStatIcon = () => {
        if (percentageDifference() !== 'N/A') {
            if (percentageDifference() < 0) {
                return <PercentageDecreaseIcon />;
            } else if (percentageDifference() > 0) {
                return <PercentageIncreaseIcon />;
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }

    // function to render the right icon wrapper to reflect either increase or decrease from oldValue
    const handlePercentageWrapper = () => {
        if (percentageDifference() === "N/A") return style.neutralPercentage;
        if (percentageDifference() > 0) return style.positivePercentage;
        if (percentageDifference() < 0) return style.negativePercentage;
        return style.neutralPercentage;
    }
    
    // function to render the right text color to reflect either increase or decrease from oldValue
    const handlePercentageText = () => {
        if (percentageDifference() === "N/A") return style.neutralText;
        if (percentageDifference() > 0) return style.positiveText;
        if (percentageDifference() < 0) return style.negativeText;
        return style.neutralText;
    }

    // if both values are 0, return nothing
    if (oldValue === 0 && presentValue === 0) {
        return <></>;
    }

    // render PercentageChange component
    return (
        <View 
            style={[
                style.percentageWrapper,
                // assign the appropriate percentageWrapper color
                handlePercentageWrapper(),
            ]}
        >
            {/* assign the appropriate stat icon */}
            {handleStatIcon()}
            <Text 
                style={[
                    style.percentagetext, 
                    // assign the appropriate percentage text color
                    handlePercentageText(),
                ]}
            >
                {/* display calculated percentage */}
                {percentageDifference() === "N/A" ? "N/A" : Math.abs(percentageDifference()) + "%"}
            </Text>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    percentageWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        borderRadius: 18,
        maxWidth: 40,
    },
    noPercentage: {
        backgroundColor: 'transparent',
    },
    neutralPercentage: {
        backgroundColor: background,
        opacity: 0,
    },
    percentagetext: {
        fontFamily: "mulish-regular",
        color:  black,
        fontSize: 8,
    },
    positivePercentage: {
        backgroundColor: "rgba(236, 253, 243, 1)",
    },
    positiveText: {
        color: "rgba(2, 122, 72, 1)",
    },
    negativePercentage: {
        backgroundColor: "rgba(254, 243, 242, 1)",
    },
    negativeText: {
        color: "rgba(180, 35, 24, 1)",
    },
    neutralText: {
        color: bodyText,
    },
})
 
export default PercentageChange;