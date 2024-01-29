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
    white,
} from "../style/colors";
// components
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import BusinessAnalyticsItem from "../components/BusinessAnalyticsItem";
import LocationAnalyticsItem from "../components/LocationAnalyticsItem";
import ProductAnalyticsItem from "../components/ProductAnalyticsItem";
import CalendarSheet from "../components/CalendarSheet";
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
// react hooks
import {useState, useEffect} from "react";
// skeleton screen
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";
// use auth
import { useAuth } from "../context/AuthContext";


const Analytics = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // calendar ref
    const { calendarSheetRef } = useGlobals();

    // bar chart data
    const data = [57000, 72000, 58000, 81500, 83750, 67000, 39000];

    // prev duration data
    const prevData = [0, 0, 0, 0, 0, 0, 0];
    
    // bar chart x axis labels
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
    // const labels = []; 

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

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
            business_name: 'Komitex Logistics',
            numberOfDeliveries: 10,
            totalPrice: 72500,
            oldTotalPrice: 67000,
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "Komitex Logistics",
                business_id: 1,
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
                verified: true,
            })}
        },
        {
            id: 2,
            business_name: 'DHL',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "DHL",
                business_id: 2,
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
                verified: false,
            })}
        },
        {
            id: 3,
            business_name: 'Fedex',
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "Fedex",
                business_id: 3,
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
                verified: true,
            })}
        },
    ];

    // merchant analytics list
    const merchantAnalyticsList = [
        {
            id: 1,
            business_name: 'Style Bazaar',
            numberOfDeliveries: 10,
            totalPrice: 72500,
            oldTotalPrice: 67000,
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1',
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "Style Bazaar",
                business_id: 1,
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1',
                verified: true,
            })}
        },
        {
            id: 2,
            business_name: 'Tech Haven',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            banner_image: null,
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "Tech Haven",
                business_id: 2,
                banner_image: null,
                verified: false,
            })}
        },
        {
            id: 3,
            business_name: 'Luxe Living Ltd',
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fluxe_living_finds.png?alt=media&token=91aa3e09-658b-4900-8558-d10a12590513',
            onPress: () => {navigation.navigate("BusinessAnalytics", {
                business_name: "Luxe Living Ltd",
                business_id: 3,
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fluxe_living_finds.png?alt=media&token=91aa3e09-658b-4900-8558-d10a12590513',
                verified: true,
            })}
        },
    ];

    // product analytics list
    const productAnalyticsList = [
        {
            id: 1,
            product_name: 'Maybach Sunglasses',
            numberOfDeliveries: 10,
            totalPrice: 72500,
            oldTotalPrice: 67000,
            product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            onPress: () => {navigation.navigate("ProductAnalytics", {
                product_id: 1,
                product_name: "Maybach Sunglasses",
                product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            })}
        },
        {
            id: 2,
            product_name: 'Pheonix Sneakers',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 67000,
            product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648',
            onPress: () => {navigation.navigate("ProductAnalytics", {
                product_id: 1,
                product_name: "Pheonix Sneakers",
                product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648',
            })}
        },
        {
            id: 3,
            product_name: 'Black Sneakers', 
            numberOfDeliveries: 7,
            totalPrice: 70000,
            oldTotalPrice: 67000,
            product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fblack-sketchers.png?alt=media&token=a07e02ac-610d-4da0-9527-2b6e9e85d56d',
            onPress: () => {navigation.navigate("ProductAnalytics", {
                product_id: 1,
                product_name: "Black Sneakers",
                product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fblack-sketchers.png?alt=media&token=a07e02ac-610d-4da0-9527-2b6e9e85d56d',
            })}
        },
        {
            id: 4,
            product_name: 'Timberland Shoe', 
            numberOfDeliveries: 13,
            totalPrice: 150000,
            oldTotalPrice: 89000,
            product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722',
            onPress: () => {navigation.navigate("ProductAnalytics", {
                product_id: 1,
                product_name: "Timberland Shoe",
                product_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722',
            })}
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
            onPress: () => {navigation.navigate("LocationAnalytics", {
                location_id: 1,
            })}
        },
        {
            id: 2,
            location: 'Sapele',
            numberOfDeliveries: 13,
            totalPrice: 49500,
            oldTotalPrice: 48000,
            onPress: () => {navigation.navigate("LocationAnalytics", {
                location_id: 1,
            })}
        },
        {
            id: 3,
            location: 'Ughelli',
            numberOfDeliveries: 5,
            totalPrice: 35000,
            oldTotalPrice: 40000,
            onPress: () => {navigation.navigate("LocationAnalytics", {
                location_id: 1,
            })}
        },
    ];

    // if all the analytics result are empty
    const emptyAnalytics = merchantAnalyticsList.length === 0 && 
    productAnalyticsList.length === 0 && 
    locationAnalyticsList.length === 0 &&
    logisticsAnalyticsList.length === 0;

    // console.log(emptyAnalytics)

    // state to control tabs
    const [tabs, setTabs] = useState(authData?.account_type === "Logistics" ? "Merchant" : "Logistics");

    // console.log(tabs)

    const openCalendar = () => {
        calendarSheetRef.current?.present();
    }
    
    const closeCalendar = () => {
        calendarSheetRef.current?.close();
    }

    const [date, setDate] = useState("");

    // render Analytics page
    return (<>
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
                                onPress={openCalendar}
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
                            prevData={prevData}
                            labels={labels}
                            unit={"₦"}
                            fullbar={false}
                            rotateXAxisLabel={false}
                            enableGrid={false}
                        />
                    </View>
                    {/* stats wrapper */}
                    <StatWrapper>
                        {/* stats card list items */}
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
                        <View 
                            style={[
                                style.tabsContainer,
                                emptyAnalytics && {minHeight: 72}
                            ]}
                        >
                            {!emptyAnalytics ? <>
                                {/* Tab buttons container */}
                                <View style={style.tabButtonWrapper}>
                                    <View style={style.tabButtonContainer}>
                                        {/* logistics tab button */}
                                        { authData?.account_type !== "Logistics" && (
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
                                        )}
                                        {/* merchant tab button */}
                                        { authData?.account_type !== "Merchant" && (
                                            <TouchableOpacity
                                                style={
                                                    tabs === "Merchant" ? style.tabButtonSelected : style.tabButton
                                                }
                                                onPress={() => setTabs("Merchant")}
                                            >
                                                <Text 
                                                    style={
                                                        tabs === "Merchant" ? style.tabButtonTextSelected : style.tabButtonText
                                                    }
                                                >
                                                    Merchant
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        {/* location tab buttons */}
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
                                        {/* product tab button */}
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
                                </View>
                                <View style={style.tabContentList}>
                                    {/* Merchant Tab content */}
                                    {tabs === "Merchant" && merchantAnalyticsList.map(item => (
                                        <BusinessAnalyticsItem
                                            key={item.id}
                                            businessName={item.business_name}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            bannerImage={item?.banner_image}
                                            onPress={item.onPress}
                                        />
                                    ))}
                                    {/* Logistics Tab content */}
                                    {tabs === "Logistics" && logisticsAnalyticsList.map(item => (
                                        <BusinessAnalyticsItem
                                            key={item.id}
                                            businessName={item.business_name}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            bannerImage={item?.banner_image}
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
                                            product={item.product_name}
                                            numberOfDeliveries={item.numberOfDeliveries}
                                            totalPrice={item.totalPrice}
                                            oldTotalPrice={item.oldTotalPrice}
                                            imageUrl={item?.product_image}
                                            onPress={item.onPress}
                                        />
                                    ))}
                                </View>
                            </> : <>
                                {/* empty states */}
                                <View style={style.noResultWrapper}>
                                    <Text style={style.emptyAnalyticsHeading}>
                                        Nothing to show yet
                                    </Text>
                                    <Text style={style.emptyAnalyticsParagraph}>
                                        Top stats is shown after 3 successful deliveries
                                    </Text>
                                </View>
                            </>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        ) : <AnalyticsSkeleton />}
        {/* calendar bottomsheet modal */}
        <CalendarSheet 
            closeCalendar={closeCalendar}
            setDate={setDate}
            disableActionButtons={false}
            snapPointsArray={["70%"]}
            maxDate={new Date()}
            calendarRef={calendarSheetRef} 
        />
    </>);
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
        paddingVertical: 10,
    },
    tabButtonWrapper: {
        paddingHorizontal: 10,
        width: "100%",
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
    },
    noResultWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 4,
        padding: 10,
    },
    emptyAnalyticsHeading: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    emptyAnalyticsParagraph: {
        color: bodyText,
        fontFamily: 'mulish-regular',
        fontSize: 10,
    }
})
 
export default Analytics;