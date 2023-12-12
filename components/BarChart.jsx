// react native components
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
// react hooks
import { useState, useEffect } from "react";
// colors
import { barChart, black, bodyText, primaryColor, secondaryColor, toolTipBackground, white } from "../style/colors";
// components
import PercentageChange from "./PercentageChange";

const BarChart = ({chartTitle, chartWidth, chartHeight, backgroundColor, prevData, data, labels, unit, fullbar, enableGrid, rotateXAxisLabel}) => {
    // chartTitle, backgroundColor, unit => string
    // chartWidth, chartHeight => number or string with % e.g "100%"
    // data, labels => array
    // fullbar, enableGrid, rotateXAxisLabel => boolean
    
    
    // fall back data if data array is empty
    const fallBackData = [100000, 200000, 300000, 416666 ];

    // maximun value in data array, if data array is all zero, get maximun from fall back data
    const maxValue = !data.every(item => item === 0) ? Math.max(...data) :  Math.max(...fallBackData);

    // calculate total amount from data array
    const total = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    // calculate total amount from prev data array
    const prevTotal = prevData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    // console.log("Prev Total", prevTotal)
    // console.log("Total", total)

    // calculate maximum value in y-axis scale
    // const maxYAxisScale = parseFloat(maxValue.toPrecision(1));

    // number of values in y-axis label
    const numberOfValuesInYAxis = 5;

    // function to calculate 
    const calculateMaxY = (data) => {
        const max = Math.max(...data);
        const buffer = max * (1 + 0.2); // buffer the maximum value by 20%
        const power = Math.pow(10, Math.ceil(Math.log10(buffer)) - 2);
        const roundedMax = Math.ceil(buffer / power) * power;
        return roundedMax;
    }

    // generate array for y-axis label function
    const generateYAxisScale = (maxValue, increment, length) => {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(i * increment);
        }
        array.push(maxValue);
        return array.reverse();
    }

    // calculate maximum value in y-axis scale
    const maxYAxisScale = calculateMaxY(!data.every(item => item === 0) ? data : fallBackData);

    // console.log(maxYAxisScale)


    // generate y-axis scale
    const yAxis = generateYAxisScale(maxYAxisScale, maxYAxisScale / numberOfValuesInYAxis, numberOfValuesInYAxis);

    // generate parameters for the chart bars
    const [bars, setBars] = useState(
        data.map((dataValue, index) => {

            const maxIndex = data.indexOf(maxValue);

            const barHeight = (dataValue / maxYAxisScale) * ((chartHeight - 20) * 0.65);

            return {
                value: dataValue,
                barHeight: dataValue === 0 ? 0 : barHeight,
                selected: index === maxIndex ? true : false,
                label: labels[index],
            }
        })
    );

    // console.log(bars)

    // function to show tooltip for selected bar
    const handleSelectedBar = (index) => {
        setBars(prevBars => {
            return prevBars.map((bar, i) => {
                return {
                    ...bar,
                    selected: index === i ? true : false
                }
            })
        })
    }

    // update chart if bar array changes
    useEffect(() => {
        setBars(() => {
            return data.map((dataValue, index) => {
                const maxIndex = data.indexOf(maxValue);

                const barHeight = (dataValue / maxYAxisScale) * ((chartHeight - 20) * 0.65);

                return {
                    value: dataValue,
                    barHeight: dataValue === 0 ? 0 : barHeight,
                    selected: index === maxIndex ? true : false,
                    label: labels[index],
                }
            })
        })
    }, [data])

    // console.log(yAxis)

    // render BarChart component
    return (
        // BArChart container
        <View 
            style={[
                style.chartContainer, 
                {
                    width: chartWidth, 
                    height: chartHeight,
                    backgroundColor: backgroundColor
                }
            ]} 
        >
            {/* Chart Title and Total */}
            <View style={style.chartTitleWrapper}>
                <View style={style.chartTitle}>
                    <Text style={style.chartTitleText}>{chartTitle}</Text>
                    <PercentageChange
                        presentValue={total}
                        oldValue={prevTotal}
                    />
                </View>
                <Text style={style.total}>
                    ₦{total.toLocaleString()}
                    <Text style={style.decimal}>.00</Text>
                </Text>
            </View>
            {/* Main Chart */}
            <View style={style.mainChartWrapper}>
                {/* y axis labels */}
                <View style={style.yAxisLabelWrapper}>
                    {yAxis.map((value, index) => (
                        <Text key={index} style={style.yAxisLabel}>
                            {value === 0 ? 0 : "₦"+value.toLocaleString()}
                        </Text>
                    ))}
                </View>
                <View  style={style.mainChart}>
                    { bars.map((bar, index) => (
                        <View
                            key={index}
                            style={[
                                style.barContainer,
                                {
                                    height: bar.barHeight,
                                }
                            ]}
                        >
                            {/* bars */}
                            <TouchableOpacity
                                style={[
                                    style.bar,
                                    { width: !fullbar ? "60%" : "100%" },
                                    { backgroundColor: bar.selected ? primaryColor : barChart },
                                ]}
                                onPress = {() => handleSelectedBar(index)}
                            >     
                                { bar.selected && (
                                    <View style={style.toolTipWrapper}>
                                        <View style={style.toolTip}>
                                            <Text style={style.toolTipText}>{unit}{bar.value.toLocaleString()}</Text>
                                            <View style={style.toolTipArrow}></View>
                                        </View>
                                    </View>
                                )}
                                <Text 
                                    style={[
                                        style.xAxisLabel,
                                        rotateXAxisLabel && {transform: [{ rotate: "-90deg" }]}
                                    ]}
                                >
                                    {bar.label}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    { enableGrid && bars.map((bar, index) => (
                        // grid
                        <View 
                            key={index} 
                            style={{
                                height: bar.barHeight + 2,
                                width: "100%",
                                position: 'absolute',
                                borderTopColor: secondaryColor,
                                borderTopWidth: 0.87,
                                borderStyle: 'dashed',
                                zIndex: 1,
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    chartContainer: {
        backgroundColor: white,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 12,
    },
    chartTitleWrapper: {
        height: "25%",
        width: '100%',
    },
    chartTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    chartTitleText: {
        fontFamily: 'mulish-medium',
        fontSize: 10,
        color: bodyText,
        marginRight: 15,
    },
    total: {
        fontFamily: 'mulish-extrabold',
        fontSize: 20,
        color: black,
    },
    decimal: {
        color: bodyText
    },
    mainChartWrapper: {
        height: "60%",
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yAxisLabelWrapper: {
        height: "100%",
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    yAxisLabel: {
        width: "100%",
        textAlign: 'right',
        paddingRight: 15,
        color: bodyText,
        fontSize: 8,
        fontFamily: 'mulish-regular',
    },
    mainChart: {
        height: "100%",
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: secondaryColor,
        position: 'relative',
    },
    barContainer: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 2,
    },
    bar: {
        backgroundColor: secondaryColor,
        height: "100%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'visible',
        // borderWidth: 1,
        // borderBottomColor: 0,
        // borderColor: background,
    },
    toolTipWrapper: {
        position: 'absolute',
        bottom: "100%",
        marginBottom: 10,
    },
    toolTip: {
        backgroundColor: toolTipBackground,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        minWidth: 50,
        paddingHoxrizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        position: 'relative',
    },
    toolTipText: {
        color: white,
        fontFamily: 'mulish-regular',
        fontSize: 8,
    },
    toolTipArrow: {
        width: 0,
        height: 0,
        borderWidth: 5,
        position: 'absolute',
        top: 30,
        borderTopColor: toolTipBackground,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    xAxisLabel: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        position: 'absolute',
        top: "100%",
        marginTop: 6,
        color: bodyText,
        minWidth: "167%",
        textAlign: 'center',
        // maxWidth: "200%",

    }
})
 
export default BarChart;