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
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
// colors
import { background, bodyText, secondaryColor, white } from "../style/globalStyleSheet";

const Analytics = ({navigation}) => {
    const data = [57000, 45500, 58000, 81500, 95000, 67000, 39000, 74000, 62500, 48000, 33000, 78000];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 

    // Generate labels for a 31-day month
    const monthLabels = ["Jan 01-02", "Jan 03-04", "Jan 05-06", "Jan 07-08", "Jan 09-10", "Jan 11-12", "Jan 13-14", "Jan 15-16", "Jan 17-18", "Jan 19-20", "Jan 21-22", "Jan 23-24", "Jan 25-26", "Jan 27-28", "Jan 29-30", "Jan 31"];

    // Generate random data for the 31-day month
    const monthData = [];
    for (let i = 0; i < 16; i++) {
        const randomPrice = Math.floor(Math.random() * 100000);
        monthData.push(randomPrice);
    }

    // Generate random data for A WEEK
    const weekData = [];
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        weekData.push(data[randomIndex]);
    }

    const weekLabels = ["Sun 30", "Mon 01", "Tue 02", "Wed 03", "Thu 04", "Fri 05", "Sat 06"];

    // console.log(monthData);
    // console.log(monthLabels);

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
                    {/* range wrapper */}
                    <View style={style.rangeWrapper}>
                        <TouchableOpacity style={style.rangeButton}>
                            <Text style={style.rangeButtonText}>Weekly</Text>
                            <ArrowDownSmall />
                        </TouchableOpacity>
                    </View>

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
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
    },
    main: {
        display: 'flex',
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rangeWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 12,
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