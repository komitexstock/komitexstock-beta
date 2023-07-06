// react native components
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
// components
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
// colors
import { background, bodyText, secondaryColor, white } from "../style/colors";

const Analytics = ({navigation}) => {
    const data = [57000, 45500, 58000, 81500, 95000, 67000, 39000, 74000, 62500, 48000, 33000, 78000];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 

    // order daily stat array
    const stats = [
        {
            id: 1,
            title: "Total Earnings",
            presentValue: 200000,
            oldValue: 185500,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Orders",
            presentValue: 40,
            oldValue: 36,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 3,
            title: "Total Delivered",
            presentValue: 29,
            oldValue: 33,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Cancelled",
            presentValue: 1,
            oldValue: 3,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];

    // render Analytics page
    return (
        <TouchableWithoutFeedback >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    {/* header component */}
                    <Header 
                        navigation={navigation} 
                        stackName={"Analytics"} 
                        iconFunction={null} 
                        icon={null} 
                        unpadded={true}
                    />
                    <View style={style.chartContainer}>
                        {/* range wrapper */}
                        <View style={style.rangeWrapper}>
                            <TouchableOpacity style={style.rangeButton}>
                                <Text style={style.rangeButtonText}>Weekly</Text>
                                <ArrowDownSmall />
                            </TouchableOpacity>
                        </View>
                        {/* Bar Chart component */}
                        <BarChart
                            chartTitle={"Total Earnings"}
                            chartWidth={"100%"}
                            chartHeight={232}
                            backgroundColor={white}
                            data={data}
                            labels={labels}
                            unit={"₦"}
                            fullbar={false}
                            rotateXAxisLabel={false}
                            enableGrid={false}
                        />
                    </View>
                    <StatWrapper>
                        {stats.map(stat => (
                            <StatCard
                                key={stat.id}
                                title={stat.title}
                                presentValue={stat.presentValue}
                                oldValue={stat.oldValue}
                                decimal={stat.decimal}
                                unit={stat.unit}
                                unitPosition={stat.unitPosition}
                            />
                        ))}
                    </StatWrapper>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
    },
    main: {
        display: 'flex',
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    rangeWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 12,
    },
    rangeButton: {
        hieght: 26,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: secondaryColor,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
    },
    rangeButtonText: {
        color: bodyText,
        fontFamily: 'mulish-medium',
        fontSize: 10,
    }
})
 
export default Analytics;