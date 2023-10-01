import { View, Image, Text, StyleSheet, Animated, PanResponder, ScrollView } from "react-native";
import { background, black, primaryColor, secondaryColor, subText } from "../style/colors";
import CustomButton from "../components/CustomButton";
// react hooks
import { useState, useRef } from "react";
// import utils
import { windowWidth, windowHeight } from "../utils/helpers";

const OnBoarding = ({navigation}) => {

    const [step, setStep] = useState(1);

    const onBoardingInfo = [
        {
            id: 1,
            header: "Effortless Logistics management starts here",
            paragraph: "Optimize your supply chain with ease and precision.",
            image: require("../assets/onboarding/onboarding4.png")
        },
        {
            id: 2,
            header: "Unlock the power of efficient deliveries",
            paragraph: "Save time and enhance customer satisfaction effortlessly.",
            image: require("../assets/onboarding/onboarding5.png")
        },
        {
            id: 3,
            header: "Track your orders in real-time with live updates",
            paragraph: "Stay in the loop with real-time order updates. Track your orders effortlessly and know their status every step of the way.",
            image: require("../assets/onboarding/onboarding2.png")
        },
    ];

    const handleScroll = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;

        if (scrollOffset === 0) return setStep(1);
        if (scrollOffset === windowWidth) return setStep(2);
        if (scrollOffset === windowWidth * 2) return setStep(3);
    }

    return (
        <View style={style.container}>
            <ScrollView 
                style={style.scrollView}
                contentContainerStyle={style.infoContainer} 
                horizontal={true}
                decelerationRate={'fast'} // reduce scrol speed
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                snapToInterval={windowWidth}
            >
                {onBoardingInfo.map(info => (
                    <View key={info.id} style={style.infoWrapper}>
                        <View style={style.textContainer}>
                            <Text style={style.headingText}>
                                {info.header}
                            </Text>
                            <Text style={style.paragraphText}>
                                {info.paragraph}
                            </Text>
                        </View>
                        <Image 
                            style={style.image}
                            source={info.image}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={style.stepsWrapper}>
                <View 
                    style={{
                        width: 20, 
                        height: 4, 
                        borderRadius: 4,
                        backgroundColor: step === 1 ? primaryColor : secondaryColor, 
                    }} 
                />
                <View 
                    style={{
                        width: 20, 
                        height: 4, 
                        borderRadius: 4,
                        backgroundColor: step === 2 ? primaryColor : secondaryColor, 
                    }} 
                />
                <View 
                    style={{
                        width: 20, 
                        height: 4, 
                        borderRadius: 4,
                        backgroundColor: step === 3 ? primaryColor : secondaryColor, 
                    }} 
                />
            </View>
            <View style={style.buttonWrapper}>
                <CustomButton
                    name={"Get Started"}
                    unpadded={true}
                    shrinkWrapper={true}
                    onPress={() => navigation.navigate("CreateAccount")}
                />
                <CustomButton
                    name={"Login"}
                    secondaryButton={true}
                    unpadded={true}
                    shrinkWrapper={true}
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingHorizontal: 20,
        paddingVertical: 24,
    },
    stepsWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 20,
        marginBottom: 40,
    },
    buttonWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,   
        paddingHorizontal: 20,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        // width: (windowWidth * 3) - 40,
        alignSelf: 'flex-start'
        // marginLeft: -900,
    },
    infoWrapper: {
        width: windowWidth - 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 50,
        marginHorizontal: 20,
    },
    textContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 20,
        flexWrap: 'wrap',
    },
    headingText: {
        width: "100%",
        fontSize: 24,
        fontFamily: 'mulish-bold',
        color: black,
    },
    paragraphText: {
        width: "100%",
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: subText,
    },
    image: {
        width: windowWidth - 40,
        height: windowHeight - 391,
        borderRadius: 12,
        resizeMode: 'cover',
    }
})
 
export default OnBoarding;