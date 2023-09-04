// react native components
import { TouchableOpacity, Text, StyleSheet, View, Animated , Easing} from "react-native";
// colors
import { inactivePrimaryColor, primaryColor, secondaryColor, white } from "../style/colors";
// import react hooks
import { useEffect, useRef } from "react";

const CustomButton = ({name, onPress, backgroundColor, fixed, inactive, secondaryButton, unpadded, isLoading}) => {
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
              duration: 600,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateValue, {
              toValue: 5,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateValue, {
              toValue: 0,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
        ]).start();
    };

    useEffect(() => {
        if (isLoading) {
            animateAllBoxes();
            setInterval(() => {
                animateAllBoxes();
            }, 1300);
        }
    }, [isLoading]);

    const animateAllBoxes = () => {
        animateBox(translate1, 0);
        setTimeout(() => animateBox(translate2), 100);
        setTimeout(() => animateBox(translate3), 200);        
    }
    
    // render CustomButtom component
    return (
        <View 
            style={[ 
                fixed ? style.fixed : style.buttonWrapper, 
                {backgroundColor: backgroundColor}, 
                unpadded && {paddingHorizontal: 0}
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
                    
                ]}
                onPress={inactive ? () => {} : onPress}
            >   
                { isLoading ? (
                    <>
                        <Animated.View
                            style={[
                                style.loadingBalls,
                                {transform: [{ translateY: translate1 }]}
                            ]}
                        />
                        <Animated.View
                            style={[
                                style.loadingBalls,
                                {transform: [{ translateY: translate2 }]}
                            ]}
                        />
                        <Animated.View
                            style={[
                                style.loadingBalls,
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
        borderRadius: 5,
        width: 10,
        height: 10,
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