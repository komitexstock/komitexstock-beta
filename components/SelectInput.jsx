import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { primaryColor } from "../style/globalStyleSheet";
const SelectInput = ({label, labelIcon, placeholder, onPress, icon, value, active}) => {
    return (
        <View style={style.inputWrapper}>
                { labelIcon ? (
                    <View style={style.labelWrapper}>
                        <Text style={style.label}>
                            {label}
                        </Text>
                        <TouchableOpacity>
                            {labelIcon}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={style.label}>
                        {label}
                    </Text>
                )}
            <TouchableOpacity 
                onPress={onPress}
                style={!active ? style.input : [style.input, style.activeInput]}
            >
                <Text 
                    style={value ? style.value : style.placeholder}
                >
                    {/* if value is present show value, else show placeholder */}
                    {value ? value : placeholder} 
                </Text>
                {icon && (
                    <>{icon}</>
                )}
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
        color: '#837F7F',
    },
    input: {
        height: 44,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E7E5E5',
        borderRadius: 12,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    activeInput: {
        borderColor: primaryColor,
    },
    placeholder: {
        fontFamily: 'mulish-semibold',
        color: '#B1B2B2',
    },
    value: {
        fontFamily: 'mulish-semibold',
    }
})
 
export default SelectInput;