import { View, Text, StyleSheet } from 'react-native';
import PercentageIncreaseIcon from '../assets/icons/PercentageIncreaseIcon';
import PercentageDecreaseIcon from '../assets/icons/PercentageDecreaseIcon';
import { useState } from 'react';

const StatCard = ({title, presentValue, oldValue, decimal, reversedLogic}) => {

    const [percentageDifference, setPercentageDifference] = useState(() => {
        let result = 100 * ((presentValue - oldValue)/oldValue);
        result = result.toFixed(2);

        if (!isFinite(result)) {
            return "N/A";
        } else {
            return result;
        }
    })

    const handleStatIcon = () => {
        if (percentageDifference !== 'N/A') {
            if (percentageDifference < 0) {
                return <PercentageDecreaseIcon />;
            } else {
                return <PercentageIncreaseIcon />;
            }
        } else {
            return <></>;
        }
    }

    return (
        <View style={style.statCard}>
            <View style={style.statHeading}>
                <Text style={style.statTitle}>{title}</Text>
                <View 
                    style={[
                        style.percentageWrapper, 
                        percentageDifference !== "N/A" && percentageDifference > 0 ? style.positivePercentage : style.negativePercentage,
                        percentageDifference === "N/A" && style.neutralPercentage
                    ]}
                >
                    {handleStatIcon()}
                    <Text 
                        style={[
                            style.percentagetext, 
                            percentageDifference !== "N/A" && percentageDifference > 0 ? style.positiveText : style.negativeText,
                            percentageDifference === "N/A" && style.neutralText
                        ]}
                    >
                        {percentageDifference === "N/A" ? "N/A" : Math.abs(percentageDifference) + "%"}
                    </Text>
                </View>
            </View>
            <View style={style.statValueWrapper}>
                <Text style={style.statValue}>
                    {presentValue.toLocaleString()}{decimal && <Text style={style.statValueDecimal}>
                        .00
                    </Text>}
                </Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    statCard: {
        flex: 1,
        height: 62,
        minWidth: "40%",
        backgroundColor: "#ffffff",
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
        backgroundColor: "#f8f8f8",
    },
    percentagetext: {
        fontFamily: "mulish-regular",
        color:  "#222222",
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
        color: "#222222",
    },
    statValueWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    statValue: {
        fontFamily: "mulish-bold",
        fontSize: 16,
        color: "rgba(34, 34, 34, 1)"
    },
    statValueDecimal: {
        color: "rgba(34, 34, 34, 0.6)",
    }

})
 
export default StatCard;