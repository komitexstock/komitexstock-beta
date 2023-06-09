import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
const SelectInput = ({label, placeholder, onPress, iconPresent, icon, value}) => {
    return (
        <View style={style.inputWrapper}>
            <Text style={style.label}>{label}</Text>
            <TouchableOpacity 
                onPress={onPress}
                style={style.input}
            >
                <Text 
                    style={placeholder ? style.placeholder : style.value}
                >
                    {placeholder ? placeholder : value}
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
    placeholder: {
        fontFamily: 'mulish-semibold',
        color: '#B1B2B2',
    },
    value: {
        fontFamily: 'mulish-semibold',
    }
})
 
export default SelectInput;