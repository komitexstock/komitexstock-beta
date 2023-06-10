import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { primaryColor } from "../style/globalStyleSheet";

const Input = ({label, placeholder, onChange, value, multiline, editable, minRows, textAlign, height, keyboardType}) => {

    const handleTextChange = (text) => {
        onChange(text);
    }

    const [inputInFocus, setInputInFocus] = useState(false);

    return (
        <View style={style.inputWrapper}>
            <Text style={style.label}>{label}</Text>
            <TextInput 
                onChangeText={handleTextChange}
                style={!inputInFocus ? [style.input, {height: height}] : [style.input, style.focusedInput, {height: height}]}
                keyboardType={keyboardType}
                placeholder={placeholder}
                onFocus={() => setInputInFocus(true)}
                onBlur={() => setInputInFocus(false)}
                placeholderTextColor="#B1B2B2"
                defaultValue={value}
                multiline={multiline}
                numberOfLines={minRows}
                textAlignVertical={textAlign}
                editable={editable}
            />
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
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E7E5E5',
        borderRadius: 12,
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
        fontFamily: 'mulish-semibold',
        maxHeight: 100,
    }, 
    focusedInput: {
        borderColor: primaryColor
    }
})
 
export default Input;