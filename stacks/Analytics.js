// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    BackHandler
} from "react-native";
// colors
import {
    background,
    black,
    bodyText,
    neutral,
    secondaryColor,
    white,
} from "../style/colors";
// components
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import LogisticsAnalyticsItem from "../components/LogisticsAnalyticsItem";
import LocationAnalyticsItem from "../components/LocationAnalyticsItem";
import ProductAnalyticsItem from "../components/ProductAnalyticsItem";
import CalendarSheet from "../components/CalendarSheet";
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
// react hooks
import {useState, useRef, useEffect} from "react";
// skeleton screen
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";


const Analytics = ({navigation}) => {
    // bar chart data
    const data = [57000, 99000, 58000, 81500, 0, 67000, 39000];
    
    // bar chart x axis labels
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    setTimeout(() => {
        setPageLoading(false);
    }, 500);

    // order daily stat array
    const stats = [
        {
            id: 1,
            title: "Total POD",
            presentValue: 463000,
            oldValue: 500000,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Charges",
            presentValue: 20000,
            oldValue: 18000,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 3,
            title: "Total Order",
            presentValue: 50,
            oldValue: 49,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Delivered",
            presentValue: 41,
            oldValue: 37,
            decimal: false,
            unit: "",
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
            imageUrl: require('../assets/images/komitex.png'),
            onPress: () => {navigation.navigate("LogisticsAnalytics")}
        },
        {
            id: 2,
            logistics: 'DHL',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            imageUrl: require('../assets/images/dhl.png'),
            onPress: () => {navigation.navigate("LogisticsAnalytics")}
        },
        {
            id: 3,
            logistics: 'Fedex',
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            imageUrl: require('../assets/images/fedex.png'),
            onPress: () => {navigation.navigate("LogisticsAnalytics")}
        },
    ];

    // product analytics list
    const productAnalyticsList = [
        {
            id: 1,
            product: 'Maybach Sunglasses',
            numberOfDeliveries: 10,
            totalPrice: 72500,
            oldTotalPrice: 67000,
            imageUrl: require('../assets/images/maybach-sunglasses.png'),
            onPress: () => {navigation.navigate("ProductAnalytics")}
        },
        {
            id: 2,
            product: 'Pheonix Sneakers',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            imageUrl: require('../assets/images/sneakers.png'),
            onPress: () => {navigation.navigate("ProductAnalytics")}
        },
        {
            id: 3,
            product: 'Black Sneakers', 
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            imageUrl: require('../assets/images/black-sketchers.png'),
            onPress: () => {navigation.navigate("ProductAnalytics")}
        },
        {
            id: 4,
            product: 'Timberland Shoe', 
            numberOfDeliveries: 13,
            totalPrice: 150000,
            oldTotalPrice: 89000,
            imageUrl: require("../assets/images/Timberland.jpg"),
            onPress: () => {navigation.navigate("ProductAnalytics")}
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
            onPress: () => {navigation.navigate("LocationAnalytics")}
        },
        {
            id: 2,
            location: 'Sapele',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 48000,
            onPress: () => {navigation.navigate("LocationAnalytics")}
        },
        {
            id: 3,
            location: 'Ughelli',
            numberOfDeliveries: 5,
            totalPrice: 35000,
            oldTotalPrice: 40000,
            onPress: () => {navigation.navigate("LocationAnalytics")}
        },
    ];

    // state to control tabs
    const [tabs, setTabs] = useState("Logistics");

    // calendar ref
    const calendarRef = useRef(null);

    // state to save calendar open or closed state
    const [openCalendar, setOpenCalendar] = useState(false);

    const handleOpenCalendar = () => {
        setOpenCalendar(true);
        calendarRef.current?.present();
    }
    
    const handleCloseCalendar = () => {
        setOpenCalendar(false);
        calendarRef.current?.close();
    }

    // use effect to close calendar modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (openCalendar) {
                // if calendar is open, close it
                handleCloseCalendar();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [openCalendar]);

    const [date, setDate] = useState("");

    // render Analytics page
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
                            stackName={"Analytics"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                        <View style={style.chartContainer}>
                            {/* range wrapper */}
                            <View style={style.rangeWrapper}>
                                <TouchableOpacity 
                                    style={style.rangeButton}
                                    onPress={handleOpenCalendar}
                                >
                                    <Text style={style.rangeButtonText}>Last 7 Days</Text>
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
                        <View style={style.topStatsWrapper}>
                            <Text style={style.topStatHeading}>Top Stats</Text>
                            <View style={style.tabsContainer}>
                                {/* Tab buttons container */}
                                <View style={style.tabButtonContainer}>
                                    <TouchableOpacity
                                        style={
                                            tabs === "Logistics" ? style.tabButtonSelected : style.tabButton
                                        }
                                        onPress={() => setTabs("Logistics")}
                                    >
                                        <Text 
                                            style={
                                                tabs === "Logistics" ? style.tabButtonTextSelected : style.tabButtonText
                                            }
                                        >
                                            Logistics
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            tabs === "Location" ? style.tabButtonSelected : style.tabButton
                                        }
                                        onPress={() => setTabs("Location")}
                                    >
                                        <Text 
                                            style={
                                                tabs === "Location" ? style.tabButtonTextSelected : style.tabButtonText
                                            }
                                        >
                                            Location
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            tabs === "Product" ? style.tabButtonSelected : style.tabButton
                                        }
                                        onPress={() => setTabs("Product")}
                                    >
                                        <Text 
                                            style={
                                                tabs === "Product" ? style.tabButtonTextSelected : style.tabButtonText
                                            }
                                        >
                                            Product
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.tabContentList}>
                                    {/* Logistics Tab content */}
                                    {tabs === "Logistics" && logisticsAnalyticsList.map(item => (
                                        <LogisticsAnalyticsItem
                                            key={item.id}
                                            logistics={item.logistics}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            imageUrl={item.imageUrl}
                                            onPress={item.onPress}
                                        />
                                    ))}
                                    {/* Location Tab content */}
                                    {tabs === "Location" && locationAnalyticsList.map(item => (
                                        <LocationAnalyticsItem
                                            key={item.id}
                                            location={item.location}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            onPress={item.onPress}
                                        />
                                    ))}
                                    {/* Product Tab content */}
                                    {tabs === "Product" && productAnalyticsList.map(item => (
                                        <ProductAnalyticsItem
                                            key={item.id}
                                            product={item.product}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            imageUrl={item.imageUrl}
                                            onPress={item.onPress}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : <AnalyticsSkeleton />}
            {/* calendar */}
            <CalendarSheet 
                closeCalendar={handleCloseCalendar}
                setDate={setDate}
                disableActionButtons={false}
                snapPointsArray={["70%"]}
                maxDate={new Date()}
                calendarRef={calendarRef} 
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
    main: {
        display: 'flex',
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
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
        height: 26,
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
 
export default Analytics;