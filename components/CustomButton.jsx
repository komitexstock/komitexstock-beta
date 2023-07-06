// react native components
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
// colors
import { inactivePrimaryColor, primaryColor, white } from "../style/colors";

const CustomButton = ({name, onPress, backgroundColor, fixed, inactive}) => {
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
            ]}
        >
            <TouchableOpacity 
                style={inactive ? style.inactive : style.button}
                onPress={inactive ? () => {} : onPress}
            >
                <Text style={style.buttonText}>{name}</Text>
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
    inactive: {
        width: "100%",
        backgroundColor: inactivePrimaryColor,
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1,
    },
    fixed: {
        width: "100%",
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 1000,
        position: "absolute",
        bottom: 0,
        left: 0
    }
})
 
export default CustomButton;