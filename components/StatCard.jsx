// react native components
import { View, Text, StyleSheet } from 'react-native';

// colors
import { background, black, bodyText, white } from '../style/colors';

// components
import PercentageChange from './PercentageChange';

// skeleton imports
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const StatCard = ({title, presentValue, oldValue, decimal, unit, unitPosition, backgroundColor, isLoading}) => {
    // colour array for skeleton loader
    const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

    // skeleton component
    const Skeleton = createShimmerPlaceholder(LinearGradient);

    // return StatCard component
    return (
        // if backgroud color is provide, use that
        <View style={[style.statCard, backgroundColor && {backgroundColor: backgroundColor}]}>
            <View style={style.statHeading}>
                <Text style={style.statTitle}>{title}</Text>
                {/* indicate percentage change */}
                <PercentageChange 
                    presentValue={presentValue}
                    oldValue={oldValue}
                />
            </View>
            <View style={style.statValueWrapper}>
                {!isLoading ? (
                    <Text style={style.statValue}>
                        {/* if unit is provided and unit location is set at start, render at the beginning */}
                        { unitPosition === "start" && <>{unit}</> }
                        {/* render value as string */}
                        {presentValue?.toLocaleString()}
                        {/* if value requires decimal, render decimal, with a different fontColor */}
                        {decimal && <Text style={style.statValueDecimal}>
                            .00
                        </Text>}
                        {/* if unit is provided and unit location is set at end, render at the end */}
                        { unitPosition === "end" && <>{unit}</> }
                    </Text>
                ) : (
                    <Skeleton 
                        width={25}
                        height={20}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                )}
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
        fontSize: 10,
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
        lineHeight: 20,
    },
    statValueDecimal: {
        color: bodyText,
    }

})
 
export default StatCard;