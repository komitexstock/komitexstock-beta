import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { primaryColor } from "../style/globalStyleSheet";

const Input = ({label, placeholder, onChange, value, multiline, editable, minRows, textAlign, height, keyboardType, adornment}) => {

    const handleTextChange = (text) => {
        onChange(text);
    }

    const [inputInFocus, setInputInFocus] = useState(false);

    return (
        <View style={style.inputWrapper}>
            <Text style={style.label}>{label}</Text>
            { adornment ? (
                <View
                    style={!inputInFocus ? [style.input, {height: height}] : [style.input, style.focusedInput, {height: height}]}
                >   
                    <Text style={style.adornment}>{adornment}</Text>
                    <TextInput
                        onChangeText={handleTextChange}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        style={style.adornedInput}
                        onFocus={() => setInputInFocus(true)}
                        onBlur={() => setInputInFocus(false)}
                        placeholderTextColor="#B1B2B2"
                        defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                        multiline={multiline}
                        numberOfLines={minRows}
                        textAlignVertical={textAlign}
                        editable={editable}
                    />
                </View>                
            ) : (
                <TextInput
                    onChangeText={handleTextChange}
                    style={!inputInFocus ? [style.input, {height: height}] : [style.input, style.focusedInput, {height: height}]}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    onFocus={() => setInputInFocus(true)}
                    onBlur={() => setInputInFocus(false)}
                    placeholderTextColor="#B1B2B2"
                    defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                    multiline={multiline}
                    numberOfLines={minRows}
                    textAlignVertical={textAlign}
                    editable={editable}
                />
            )}
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'flex-start',
        fontFamily: 'mulish-semibold',
        maxHeight: 100,
        gap: 3,
    }, 
    adornment: {
        fontFamily: 'mulish-semibold',
        color: "#837F7F",
        fontSize: 20,     
    },
    focusedInput: {
        borderColor: primaryColor
    },
    adornedInput: {
        flex: 1,
    }
})
 
export default Input;