// react native components
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View
} from "react-native";
// colors
import { inactivePrimaryColor, primaryColor, secondaryColor, white } from "../style/colors";

const ModalButton = ({onPress, name, emptyFeilds, secondaryButton, topMargin}) => {
    // onPress => function
    // name => string
    // emptyFields, secondaryButton, topMargin => boolean

    // return ModalButton component
    return (
        <View 
            style={[
                style.wrapper,
                {marginTop: topMargin ? 20 : 0},
            ]}
        >
            { !secondaryButton ? (
                // render primary button
                <TouchableOpacity 
                    style={[style.button, {backgroundColor: !emptyFeilds ? primaryColor : inactivePrimaryColor}]}
                    onPress={onPress}
                >
                    <Text style={style.buttonText}>{name}</Text>
                </TouchableOpacity>
            ) : (
                // render secondary button
                <TouchableOpacity 
                    style={[style.button, {backgroundColor: secondaryColor}]}
                    onPress={onPress}
                >
                    <Text style={[style.buttonText, {color: primaryColor}]}>{name}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: 44,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: white,
    },
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
})
 
export default ModalButton;