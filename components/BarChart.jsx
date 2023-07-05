// react native components
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation
} from "react-native";
// react hooks
import { useRef, useState, useLayoutEffect, useEffect } from "react";
// colors
import { black, bodyText, primaryColor, secondaryColor, toolTipBackground, white } from "../style/globalStyleSheet";

const BarChart = ({chartTitle, chartWidth, chartHeight, backgroundColor, data, labels, unit, fullbar, rotateXAxisLabel}) => {

    const barChartRef = useRef(null);

    const maxValue = Math.max(...data);

    const total = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const maxYAxisScale = parseFloat(maxValue.toPrecision(1));

    const numberOfValuesInYAxis = 5;

    const [mainChartWidth, setMainChartWidth] = useState(0);

    const generateYAxisScale = (maxValue, increment, length) => {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(i * increment);
        }
        array.push(maxValue);
        return array.reverse();
    }

    const yAxis = generateYAxisScale(maxYAxisScale, maxYAxisScale / numberOfValuesInYAxis, numberOfValuesInYAxis);

    // console.log(yAxis);

    const [bars, setBars] = useState(
        data.map((dataValue, index) => {

            const maxIndex = data.indexOf(maxValue);

            return {
                value: dataValue,
                barHeight: (dataValue / maxYAxisScale) * ((chartHeight - 20) * 0.65),
                selected: index === maxIndex ? true : false,
                label: labels[index],
            }
        })
    );

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

    useEffect(() => {
        setBars(() => {
            return data.map((dataValue, index) => {
                const maxIndex = data.indexOf(maxValue);

                return {
                    value: dataValue,
                    barHeight: (dataValue / maxYAxisScale) * ((chartHeight - 20) * 0.65),
                    selected: index === maxIndex ? true : false,
                    label: labels[index],
                }
            })
        })
    }, [data])

    const onLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setMainChartWidth(width);
    };

    useLayoutEffect(() => {
    
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return () => {
          // Clean up the event listener
        };
    }, []);

    // console.log(mainChartWidth)

    return (
        <View 
            ref={barChartRef} 
            style={[
                style.chartContainer, 
                {
                    width: chartWidth, 
                    height: chartHeight,
                    backgroundColor: backgroundColor
                }
            ]} 
        >
            <View style={style.chartTitleWrapper}>
                <View style={style.chartTitle}>
                    <Text style={style.chartTitleText}>{chartTitle}</Text>
                </View>
                <Text style={style.total}>
                    ₦{total.toLocaleString()}
                    <Text style={style.decimal}>.00</Text>
                </Text>
            </View>
            <View style={style.mainChartWrapper}>
                <View style={style.yAxisLabelWrapper}>
                    {yAxis.map((value, index) => (
                        <Text key={index} style={style.yAxisLabel}>₦{value.toLocaleString()}</Text>
                    ))}
                </View>
                <View  style={style.mainChart} onLayout={onLayout}>
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
                            <TouchableOpacity
                                style={[
                                    style.bar,
                                    { width: !fullbar ? "60%" : "100%" },
                                    { backgroundColor: bar.selected ? primaryColor : secondaryColor },
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
                    { bars.map((bar, index) => (
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

const style = StyleSheet.create({
    chartContainer: {
        backgroundColor: white,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 12,
    },
    chartTitleWrapper: {
        height: "25%",
        width: '100%',
    },
    chartTitleText: {
        fontFamily: 'mulish-medium',
        fontSize: 10,
        color: bodyText,
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
        height: "65%",
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
        borderLeftWidth: 1,
        borderLeftColor: secondaryColor,
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
        width: "167%",
        textAlign: 'center',
    }
})
 
export default BarChart;