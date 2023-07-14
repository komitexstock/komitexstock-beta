// react native components
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
// colors
import { inactivePrimaryColor, primaryColor, secondaryColor, white } from "../style/colors";

const CustomButton = ({name, onPress, backgroundColor, fixed, inactive, secondaryButton, unpadded}) => {
    // name => string
    // onPress => function
    // backgroundColor => string
    // inactive, fixed => boolean

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
                <Text 
                    style={[
                        style.buttonText,
                        {color: secondaryButton ? primaryColor : white}
                    ]}
                >
                    {name}
                </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
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