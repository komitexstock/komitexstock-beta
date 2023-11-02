// react native components
import { TouchableOpacity, Text, StyleSheet, View, Animated , Easing} from "react-native";
// colors
import { inactivePrimaryColor, primaryColor, secondaryColor, white } from "../style/colors";
// import react hooks
import { useEffect, useRef } from "react";

const CustomButton = ({name, onPress, backgroundColor, fixed, inactive, secondaryButton, unpadded, isLoading, shrinkWrapper, wrapperStyle, buttonStyle}) => {
    // name => string
    // onPress => function
    // backgroundColor => string
    // inactive, fixed => boolean

    const translate1 = useRef(new Animated.Value(0)).current;
    const translate2 = useRef(new Animated.Value(0)).current;
    const translate3 = useRef(new Animated.Value(0)).current;

    const animateBox = (translateValue) => {
        Animated.sequence([
            Animated.timing(translateValue, {
              toValue: -10,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateValue, {
              toValue: 5,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateValue, {
              toValue: 0,
              duration: 150,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
        ]).start();
    };

    useEffect(() => {
        
        let intervalId;
        
        const animateAllBoxes = () => {
            animateBox(translate1, 0);
            setTimeout(() => animateBox(translate2), 100);
            setTimeout(() => animateBox(translate3), 200);        
        }
        
        const startAnimation = () => {
            animateAllBoxes()
            intervalId = setInterval(animateAllBoxes, 1200);
        };

        const stopAnimation = () => {
            // reset values
            translate1.setValue(0);
            translate2.setValue(0);
            translate3.setValue(0);
            clearInterval(intervalId);
        };

        if (isLoading) {
            startAnimation();
        } else {
            stopAnimation();
        }

        return () => {
            stopAnimation();
        };

    }, [isLoading]);

    const handleOnPress = () => {
        if (isLoading) return () => {};
        if (inactive) return () => {};
        return onPress();
    }
    
    // render CustomButtom component
    return (
        <View 
            style={[ 
                fixed ? style.fixed : style.buttonWrapper, 
                {backgroundColor: backgroundColor}, 
                unpadded && {paddingHorizontal: 0},
                shrinkWrapper && {height: 44, paddingBottom: 0},
                wrapperStyle && wrapperStyle
            ]}
        >
            <TouchableOpacity 
                style={[
                    style.button,
                    secondaryButton ? {
                        backgroundColor: secondaryColor,
                        opacity: inactive ? 0.5 : 1,
                    } : {
                        backgroundColor: inactive ? inactivePrimaryColor : primaryColor
                    },
                    buttonStyle && buttonStyle
                ]}
                onPress={handleOnPress}
            >   
                { isLoading ? (
                    <>
                        <Animated.View
                            style={[
                                style.loadingBalls,
                                secondaryButton && {backgroundColor: primaryColor},
                                {transform: [{ translateY: translate1 }]}
                            ]}
                        />
                        <Animated.View
                            style={[
                                style.loadingBalls,
                                secondaryButton && {backgroundColor: primaryColor},
                                {transform: [{ translateY: translate2 }]}
                            ]}
                        />
                        <Animated.View
                            style={[
                                style.loadingBalls,
                                secondaryButton && {backgroundColor: primaryColor},
                                {transform: [{ translateY: translate3 }]}
                            ]}
                        />
                    </>                    
                ) : (
                    <Text 
                        style={[
                            style.buttonText,
                            {color: secondaryButton ? primaryColor : white}
                        ]}
                    >
                        {name}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: primaryColor,
        height: 44,
        borderRadius: 12,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 6,
    },
    loadingBalls: {
        borderRadius: 4,
        width: 8,
        height: 8,
        backgroundColor: white,
        // marginBottom: -5,
    },
    buttonText: {
        fontFamily: "mulish-semibold",
        color: white,
        fontSize: 16,
    },
    buttonWrapper: {
        width: "100%",
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        paddingBottom: 30,
        zIndex: 1,
    },
    fixed: {
        width: "100%",
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        paddingBottom: 30,
        zIndex: 1000,
        position: "absolute",
        bottom: 0,
        left: 0
    }
})
 
export default CustomButton;