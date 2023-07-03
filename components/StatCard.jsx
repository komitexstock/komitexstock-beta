// react native components
import { View, Text, StyleSheet } from 'react-native';
// icons
import PercentageIncreaseIcon from '../assets/icons/PercentageIncreaseIcon';
import PercentageDecreaseIcon from '../assets/icons/PercentageDecreaseIcon';
import { background, black, bodyText, white } from '../style/globalStyleSheet';


const StatCard = ({title, presentValue, oldValue, decimal, unit, unitPosition, backgroundColor}) => {

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

    // return StatCard component
    return (
        // if backgroud color is provide, use that
        <View style={[style.statCard, backgroundColor && {backgroundColor: backgroundColor}]}>
            <View style={style.statHeading}>
                <Text style={style.statTitle}>{title}</Text>
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
            </View>
            <View style={style.statValueWrapper}>
                <Text style={style.statValue}>
                    {/* if unit is provided and unit location is set at start, render at the beginning */}
                    { unitPosition === "start" && <>{unit}</> }
                    {/* render value as string */}
                    {presentValue.toLocaleString()}
                    {/* if value requires decimal, render decimal, with a different fontColor */}
                    {decimal && <Text style={style.statValueDecimal}>
                        .00
                    </Text>}
                    {/* if unit is provided and unit location is set at end, render at the end */}
                    { unitPosition === "end" && <>{unit}</> }
                </Text>
            </View>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    statCard: {
        flex: 1,
        height: 62,
        minWidth: "40%",
        backgroundColor: white,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 10,
    },
    statHeading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    statTitle: {
        fontFamily: "mulish-regular",
        fontSize: 8,
    },
    percentageWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        borderRadius: 18,
    },
    neutralPercentage: {
        backgroundColor: background,
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
    statValueWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    statValue: {
        fontFamily: "mulish-extrabold",
        fontSize: 16,
        color: black,
    },
    statValueDecimal: {
        color: bodyText,
    }

})
 
export default StatCard;