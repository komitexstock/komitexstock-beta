import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native'
import React from 'react'
// colors
import { background, black, white, bodyText } from '../style/colors';
import { useState, useRef } from 'react';
// utility
import { windowWidth } from '../utils/helpers';
// icons
import ArrowLeft from "../assets/icons/ArrowLeft";
// components
import SearchBar from '../components/SearchBar';
import OrderListItem from '../components/OrderListItem';
import WaybillListItem from '../components/WaybillListItem';
import StockTransferListItem from '../components/StockTransferListItem';
// auth context
import { useAuth } from '../context/AuthContext';
// data
import { recentActivites } from '../data/recentActivities';
import { homeOrders } from '../data/homeOrders';

const RecentActivities = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // header width
    const headerWidth = 133;

    // horizontal padding
    const horizontalPadding = 20;

    // fontsize parameters
    // font size value
    const fontSizeRef = useRef(new Animated.Value(20));
    // max font size
    const maxFontSize = 14;
    // min font size
    const minFontSize = 20;


    // header height parameters
    const headerHeightRef = useRef(new Animated.Value(88));
    // maximum header height
    const maxHeaderHeight = 48;
    // minimum header height
    const minHeaderHeight = 88;

    // x translate parameters
    // x tranlate value
    const translateXRef = useRef(new Animated.Value(0));
    // max x translate value
    const maxTranslateX = windowWidth/2 - headerWidth/2 - horizontalPadding;
    // min x translate value
    const minTranslateX = 0;

    // y translate parameters
    // y tranlate value
    const translateYRef = useRef(new Animated.Value(0));
    // max y translate value
    const maxTranslateY = -4;
    // min y translate value
    const minTranslateY = 0;

    const animationSensitivity = 3; // lower number more sensitive;

    // shadow elevation value, to be animated on scroll of flatlist component
    const shadowElevation = useRef(new Animated.Value(0)).current;

    const handleScroll = (event) => {
        // get scroll height
        const scrollHeight = event.nativeEvent.contentOffset.y;


        // maximum scroll height to animate to
        const maxScrollHeight = animationSensitivity * maxHeaderHeight;

        // if scroll height is 0 
        if (scrollHeight === 0) {
            // set value of x translate
            translateXRef.current.setValue(minTranslateX);
            // set value of y translate
            translateYRef.current.setValue(minTranslateY);
            // set value of header font size
            fontSizeRef.current.setValue(minFontSize);
            // set value of header size
            headerHeightRef.current.setValue(minHeaderHeight);
            // set shadow elevation
            shadowElevation.setValue(0);
            return
        }

        // once max height is exceeded, return early
        if (scrollHeight > maxScrollHeight) {
            // set value of x translate
            translateXRef.current.setValue(maxTranslateX);
            // set value of y translate
            translateYRef.current.setValue(-24);
            // set value of header font size
            fontSizeRef.current.setValue(maxFontSize);
            // set value of header size
            headerHeightRef.current.setValue(maxHeaderHeight);

            // set shadow elevation
            shadowElevation.setValue(3);

            // return
            return
        };

        // evaluate x translate value
        const evaluatedTranslateX = (scrollHeight/maxScrollHeight) * maxTranslateX;
        // set new x translate value
        translateXRef.current.setValue(evaluatedTranslateX);

        // evaluate x translate value
        const evaluatedTranslateY = (scrollHeight/maxScrollHeight) * (maxTranslateY - minFontSize) + minTranslateY;
        // set new x translate value
        translateYRef.current.setValue(evaluatedTranslateY);

        // evaluate x translate value
        const evaluatedFontSize = (scrollHeight/maxScrollHeight) * (maxFontSize - minFontSize) + minFontSize;
        // set new x translate value
        fontSizeRef.current.setValue(evaluatedFontSize);

        // evaluate x translate value
        const evaluatedHeaderHeight = (scrollHeight/maxScrollHeight) * (maxHeaderHeight - minHeaderHeight) + minHeaderHeight;
        // set new x translate value
        headerHeightRef.current.setValue(evaluatedHeaderHeight);

        // set shadow elevation
        shadowElevation.setValue(0);
    }

    // animation taget parameter
    /*
        fontsize: 20 ----> 14,
        height: 68 ----> 24
        translateX: 0 ----> windowWidth/2 - headerWidth.current/2 - horizontalPadding
        translateY: 0 ----> -24
    */

    // array 1 to 3
    const array = [...Array(3).keys()];

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // function to indicate the type of waybill
    const handleWaybillType = (inventoryAction) => {
        if (inventoryAction === "increment") {
            if (authData?.account_type === "Merchant") return "Outgoing";
            return "Incoming";
        }
        if (authData?.account_type === "Merchant") return "Incoming";
        return "Outcoming";
    }

    return (<>
        {/* animated header */}
        <Animated.View 
            style={[
                styles.headerWrapper,
                {
                    height: headerHeightRef.current
                }
            ]}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                
                <ArrowLeft />
            </TouchableOpacity>
            <Animated.View
                style={[
                    styles.headerTextWrapper,
                    // transform by -50% of windowWidth
                    {
                        transform: [
                            {translateX: translateXRef.current},
                            {translateY: translateYRef.current},
                            // {translateX: 0}
                        ],
                        width: headerWidth,
                    } 
                ]}
            >
                <Animated.Text
                    style={[
                        styles.headerText,
                        {fontSize: fontSizeRef.current}
                    ]}
                >
                    Recent Activities
                </Animated.Text>
            </Animated.View>
        </Animated.View>
        {/* search bar */}
        <Animated.View 
            style={[
                styles.searchBarContainer,
                // shadow styling
                {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: shadowElevation,
                }
            ]}
        >
            <SearchBar
                placeholder={"Search Activities"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={white}
            />
        </Animated.View>
        {/* rest of the content */}
        <TouchableWithoutFeedback>
            <ScrollView
                style={styles.main}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.activityGroupWrapper}>
                    {/* day header */}
                    <View style={styles.dayWrapper}>
                        <Text style={styles.dayText}>Today</Text>
                    </View>
                    {/* order, waybill and stock transfer list items */}
                    <View
                        style={styles.ordersListWrapper}
                    >
                        {/* order list max 5 items */}
                        {homeOrders.map((order, index) => {
                            // order list item
                            if (order.activityType === "Order") return (
                                <OrderListItem 
                                    key={order.id}
                                    navigation={navigation}
                                    item={order}
                                    index={index}
                                    lastOrder={homeOrders.length - 1} 
                                    firstOrder={0}
                                    extraVerticalPadding={true}
                                    showListType={true}
                                />
                            )
                            // waybill list item
                            if (order.activityType === "Waybill") return (
                                <WaybillListItem 
                                    key={order.id}
                                    item={order} 
                                    navigation={navigation}
                                    index={index}
                                    lastWaybill={homeOrders.length - 1}
                                    firstWaybill={0}
                                    waybillType={handleWaybillType(order.inventory_action)}
                                />
                            )
                            // stock tranfer list item
                            if (order.activityType === "StockTransfer") return (
                                <StockTransferListItem 
                                    key={order.id}
                                    item={order} 
                                    navigation={navigation}
                                    index={index}
                                    lastOrder={homeOrders.length - 1}
                                    firstOrder={0}
                                    extraVerticalPadding={true} 
                                    showListType={true}
                                />
                            )
                        })}
                    </View>
                </View>
                <View style={styles.activityGroupWrapper}>
                    {/* day header */}
                    <View style={styles.dayWrapper}>
                        <Text style={styles.dayText}>Yesterday</Text>
                    </View>
                    {/* order, waybill and stock transfer list items */}
                    <View
                        style={styles.ordersListWrapper}
                    >
                        {/* order list max 5 items */}
                        {recentActivites.map((order, index) => {
                            // order list item
                            if (order.activityType === "Order") return (
                                <OrderListItem 
                                    key={order.id}
                                    navigation={navigation}
                                    item={order}
                                    index={index}
                                    lastOrder={recentActivites.length - 1} 
                                    firstOrder={0}
                                    extraVerticalPadding={true}
                                    showListType={true}
                                />
                            )
                            // waybill list item
                            if (order.activityType === "Waybill") return (
                                <WaybillListItem 
                                    key={order.id}
                                    item={order} 
                                    navigation={navigation}
                                    index={index}
                                    lastWaybill={recentActivites.length - 1}
                                    firstWaybill={0}
                                    waybillType={handleWaybillType(order.inventory_action)}
                                />
                            )
                            // stock tranfer list item
                            if (order.activityType === "StockTransfer") return (
                                <StockTransferListItem 
                                    key={order.id}
                                    item={order} 
                                    navigation={navigation}
                                    index={index}
                                    lastOrder={recentActivites.length - 1}
                                    firstOrder={0}
                                    extraVerticalPadding={true} 
                                    showListType={true}
                                />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    </>)
}

export default RecentActivities

const styles = StyleSheet.create({
    main: {
        backgroundColor: background,
        paddingHorizontal: 20,
        paddingBottom: 20,
        width: "100%",
    },
    headerWrapper: {
        paddingHorizontal: 20,
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: background,
        paddingVertical: 12,
        zIndex: 2,
    },
    headerTextWrapper: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        height: 24,
    },
    headerText: {
        fontFamily: 'mulish-bold',
        color: black,
    },
    searchBarContainer: {
        paddingHorizontal: 20,
        backgroundColor: background,
        zIndex: 1,
    },
    dayWrapper: {
        width: "100%",
        marginBottom: 12,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 15,
    },
    dayText: {
        fontFamily: 'mulish-semibold',
        color: bodyText,
        fontSize: 12,
    },
    ordersListWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 24,
    },
})