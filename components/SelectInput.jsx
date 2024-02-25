// react native components
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
// colors
import { inputBorder, inputLabel, listSeparator, neutral, primaryColor, white } from "../style/colors";
// icon
import ArrowDown from "../assets/icons/ArrowDown";
// moment
import moment from "moment";

const SelectInput = ({label, labelIcon, placeholder, onPress, icon, value, active, inputFor, disabled}) => {
    // label, placeholder, value => string
    // lableIcon, icon => jxst component
    // active = boolean
    // onPress => function
    // inputFor => string | Location || Logistics || String

    // render SelectInput
    return (
        <View style={style.inputWrapper}>
                { labelIcon ? (
                    // if labelIcon is provided, render label text with labelIcon
                    <View style={style.labelWrapper}>
                        <Text style={style.label}>
                            {label}
                        </Text>
                        <TouchableOpacity>
                            {labelIcon}
                        </TouchableOpacity>
                    </View>
                ) : (
                    // if labelIcon is not provided, render only label text
                    <Text style={style.label}>
                        {label}
                    </Text>
                )}
            <TouchableOpacity 
                onPress={disabled ? () => {} : onPress}
                // if input is active, render activeinput else regular input
                style={[
                    style.input,
                    active && style.activeInput,
                    disabled && style.disabled
                ]}
                activeOpacity={disabled && 1}
            >
                {/* render value */}
                <Text 
                    style={[
                        value ? style.value : style.placeholder,
                        disabled && style.disabledText
                    ]}
                >
                    { inputFor === "Location" && (
                        <>
                            {/* render location specific value */}
                            {value ? `${value?.location} (₦${value?.charge})` : placeholder}
                        </>
                    )}

                    { inputFor === "Logistics" && (
                        <>
                            {/* render logistics specific value */}
                            {value ? value?.business_name : placeholder} 
                        </>
                    )}

                    { inputFor === "String" && (
                        <>
                            {/* render any other String */}
                            {value ? value : placeholder} 
                        </>
                    )}

                    { inputFor === "Date" && (
                        <>
                            {/* render any other String */}
                            {value ? moment(value)?.format('DD MMMM, YYYY') : placeholder} 
                        </>
                    )}
                    {/* if value is present show value, else show placeholder */}
                </Text>
                {icon ? icon : <ArrowDown />}
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: "100%",
    },
    labelWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 5,
        alignItems: 'flex-end',
    },
    label: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        color: inputLabel,
    },
    input: {
        height: 44,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: white,
        borderWidth: 1,
        borderColor: inputBorder,
        borderRadius: 12,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    activeInput: {
        borderColor: primaryColor,
    },
    disabled: {
        // opacity: 0.5,
        backgroundColor: listSeparator,
    },
    disabledText: {
        color: inputLabel,
    },
    placeholder: {
        fontFamily: 'mulish-semibold',
        color: neutral,
        fontSize: 12,
    },
    value: {
        fontFamily: 'mulish-semibold',
        textTransform: 'capitalize',
        fontSize: 12,
    }
})
 
export default SelectInput;