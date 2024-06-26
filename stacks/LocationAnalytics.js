// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
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
import BusinessAnalyticsItem from "../components/BusinessAnalyticsItem";
import Calendar from "../components/Calendar";
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
// react hooks
import { useState, useEffect } from "react";
// skeleton screeen
import LocationAnalyticsSkeleton from "../skeletons/LocationAnalyticsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";

const LocationAnalytics = ({navigation}) => {

    // calendar sheet
    // const {  } = useGlobals();

    // bar chart data
    const data = [
        46800,
        24500,
        35800,
        67200,
        15400,
        81500,
        52900
    ];

    // prev duration data
    const prevData = [0, 0, 0, 0, 0, 0, 0];

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })
    
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

    // logistic analytics list
    const logisticsAnalyticsList = [
        {
            id: 1,
            logistics: 'Komitex Logistics',
            numberOfDeliveries: 10,
            totalPrice: 72500,
            oldTotalPrice: 67000,
            imageUrl: '../assets/images/komitex.png',
        },
        {
            id: 2,
            logistics: 'DHL',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            imageUrl: '../assets/images/dhl.png',
        },
        {
            id: 3,
            logistics: 'Fedex',
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            imageUrl: '../assets/images/fedex.png',
        },
    ];

    // calendar visible state
    const [calendarVisible, setCalendarVisible] = useState(false);

    // open calendar function
    const openCalendar = () => {
        // show calendar
        setCalendarVisible(true);
    }
    
    // close calendar function
    const closeCalendar = () => {
        // hide calendar
        setCalendarVisible(false)
    }

    const [date, setDate] = useState(null);

    // render LocationAnalytics page
    return (
        <>
            {!pageLoading ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.main}>
                        {/* header component */}
                        <Header 
                            navigation={navigation} 
                            stackName={"Warri"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                        <View style={style.chartContainer}>
                            {/* range wrapper */}
                            <View style={style.rangeWrapper}>
                                <TouchableOpacity 
                                    style={style.rangeButton}
                                    onPress={openCalendar}
                                >
                                    <Text style={style.rangeButtonText}>Lat 7 Days</Text>
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
                                prevData={prevData}
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
                            <Text style={style.topStatHeading}>Top Logistics</Text>
                            <View style={style.tabsContainer}>
                                <View style={style.tabContentList}>
                                    {/* Logistics list */}
                                    {logisticsAnalyticsList.map(item => (
                                        <BusinessAnalyticsItem
                                            key={item.id}
                                            logistics={item.logistics}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            imageUrl={item.imageUrl}
                                            disableClick={true}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : <LocationAnalyticsSkeleton />}
            {/* calendar */}
            <Calendar 
                setDate={setDate}
                maxDate={new Date()}
                visible={calendarVisible} 
                disableActionButtons={false}
                closeCalendar={closeCalendar}
            />
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        width: "100%",
        minHeight: "100%",
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
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
    rangeWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 12,
        marginTop: 4,
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
        paddingTop: 0,
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
 
export default LocationAnalytics;