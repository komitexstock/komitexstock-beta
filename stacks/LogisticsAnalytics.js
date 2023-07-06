// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
// colors
import {
    background,
    black,
    bodyText,
    neutral,
    secondaryColor,
    white
} from "../style/colors";
// components
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import LocationAnalyticsItem from "../components/LocationAnalyticsItem";
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
import VerifiedIcon from '../assets/icons/VerifiedIcon';
// react hooks


const LogisticsAnalytics = ({navigation}) => {
    // bar chart data
    const data = [57000, 45500, 58000, 81500, 95000, 67000, 39000];
    
    // bar chart x axis labels
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

    // order daily stat array
    const stats = [
        {
            id: 1,
            title: "Total POD",
            presentValue: 463000,
            oldValue: 430500,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total POD",
            presentValue: 20000,
            oldValue: 185500,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 3,
            title: "Total Order",
            presentValue: 40,
            oldValue: 33,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Delivered",
            presentValue: 32,
            oldValue: 29,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 5,
            title: "Total Cancelled",
            presentValue: 5,
            oldValue: 3,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 6,
            title: "Delivery Success Rate",
            presentValue: 80,
            oldValue: 85,
            decimal: false,
            unit: "%",
            unitPosition: "end",
        },
    ];

    // location analytics list
    const locationAnalyticsList = [
        {
            id: 1,
            location: 'Warri',
            numberOfDeliveries: 17,
            totalPrice: 88500,
            oldTotalPrice: 68000,
            onPress: () => {}
        },
        {
            id: 2,
            location: 'Sapele',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 48000,
            onPress: () => {}
        },
        {
            id: 3,
            location: 'Ughelli',
            numberOfDeliveries: 5,
            totalPrice: 35000,
            oldTotalPrice: 40000,
            onPress: () => {}
        },
    ];

    // render LogisticsAnalytics page
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.container}
        >
            <View style={style.main}>
                {/* header component */}
                <Header 
                    navigation={navigation} 
                    stackName={
                        <View style={style.headerWrapper}>
                            <Image 
                                source={require('../assets/images/komitex.png')}
                                style={style.logisticsImage}
                            />
                            <Text style={style.headerText} >Komitex Logistics</Text>
                            <VerifiedIcon />
                        </View>
                    } 
                    iconFunction={null} 
                    icon={null} 
                    unpadded={true}
                />
                <View style={style.chartContainer}>
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
                <View style={style.topStatsWrapper}>
                    <Text style={style.topStatHeading}>Top Locations</Text>
                    <View style={style.tabsContainer}>
                        <View style={style.tabContentList}>
                            {/* Location list */}
                            {locationAnalyticsList.map(item => (
                                <LocationAnalyticsItem
                                    key={item.id}
                                    location={item.location}
                                    numberOfDeliveries={item.numberOfDeliveries}
                                    totalPrice={item.totalPrice}
                                    oldTotalPrice={item.oldTotalPrice}
                                    onPress={item.onPress}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    main: {
        display: 'flex',
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 4,
    },
    headerText: {
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 12,
    },
    chartContainer: {
        marginTop: 24,
    },
    topStatsWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 12,
        alignItems: 'flex-start',
    },
    topStatHeading: {
        fontFamily: 'mulish-bold',
        fontSize: 10,
        color: bodyText,
    },
    tabsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: white,
        minHeight: 200,
        borderRadius: 12,
        padding: 10,
    },
    tabButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        backgroundColor: background,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    tabButtonSelected: {
        flex: 1,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 5,
    },
    tabButton: {
        flex: 1,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        fontFamily: 'mulish-semibold',
        color: neutral,
    },
    tabButtonTextSelected: {
        fontFamily: 'mulish-bold',
        color: black,
    },
    tabContentList: {
        paddingTop: 10,
    }
})
 
export default LogisticsAnalytics;