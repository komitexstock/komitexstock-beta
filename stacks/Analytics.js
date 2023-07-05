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
import ArrowDown from '../assets/icons/ArrowDown';
// colors
import { background, bodyText, secondaryColor, white } from "../style/globalStyleSheet";

const Analytics = ({navigation}) => {
    const data = [57000, 45500, 58000, 81500, 95000, 67000, 39000, 74000, 62500, 48000, 33000, 78000];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 

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
                            <ArrowDown />
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
                        rotateXAxisLabel={true}
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
    }
})
 
export default Analytics;