import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated
} from 'react-native'
import React from 'react'
import { background, black } from '../style/colors';
import { useState, useRef } from 'react';
// utility
import { windowWidth, windowHeight } from '../utils/helpers';
// icons
import ArrowLeft from "../assets/icons/ArrowLeft";

const RecentActivities = ({navigation}) => {

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
    }

    // animation taget parameter
    /*
        fontsize: 20 ----> 14,
        height: 68 ----> 24
        translateX: 0 ----> windowWidth/2 - headerWidth.current/2 - horizontalPadding
        translateY: 0 ----> -24
    */

    // array 1 to 50
    const array = [...Array(50).keys()];

    return (<>
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
        <TouchableWithoutFeedback>
            <ScrollView
                contentConctainerStyle={styles.container}
                onScroll={handleScroll}
                style={{backgroundColor: background}}
            >
                {array.map(i => (
                    <View key={i} style={{padding: 40}}>
                        <Text>Recent activity screen</Text>
                    </View>
                ))}
            </ScrollView>
        </TouchableWithoutFeedback>
        </>)
}

export default RecentActivities

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
        // height: 2 * windowHeight,
        // minHeight: 2 * windowHeight,
        backgroundColor: background,
        paddingHorizontal: 20,
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
    }
})