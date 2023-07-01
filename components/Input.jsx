import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { primaryColor } from "../style/globalStyleSheet";
import EyeIcon from "../assets/icons/EyeIcon";
import EyeSlashIcon from "../assets/icons/EyeSlashIcon";

const Input = ({label, placeholder, onChange, value, multiline, editable, minRows, textAlign, height, keyboardType, adornment, helperText, error, setError, isPasswordInput}) => {

    const handleTextChange = (text) => {
        onChange(text);
        if (text === '') setError(true);
        else setError(false);
    }

    const handleBlur = () => {
        setInputInFocus(false);
    }

    const handleFocus = () => {
        setInputInFocus(true);
    }

    const [inputInFocus, setInputInFocus] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <View style={style.inputWrapper}>
            <Text style={style.label}>{label}</Text>
            { adornment ? (
                <View
                    style={!inputInFocus ? [
                        style.input, 
                        style.adornmentWrapper, 
                        {
                            height: height ? height : 44,
                            borderColor: `${error ? "rgba(180, 35, 24, 1)" : "#E7E5E5"}`
                        }
                    ] : [
                        style.input, 
                        style.adornmentWrapper, 
                        style.focusedInput, 
                        {
                            height: height ? height : 44,
                        }
                    ]}
                >   
                    <Text style={style.adornment}>{adornment}</Text>
                    <TextInput
                        onChangeText={handleTextChange}
                        keyboardType={keyboardType ? keyboardType : "default"}
                        placeholder={placeholder}
                        style={style.adornedInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholderTextColor="#B1B2B2"
                        defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                        multiline={multiline ? multiline : false}
                        numberOfLines={minRows ? minRows : 1}
                        textAlignVertical={textAlign ? textAlign : "center"}
                        editable={editable ? editable : true}
                        secureTextEntry={isPasswordInput ?  hidePassword : false}
                    />
                    { isPasswordInput && (
                        <TouchableOpacity onPress={() => setHidePassword(prevState => !prevState)}>
                                { hidePassword ? <EyeIcon /> : <EyeSlashIcon /> }
                        </TouchableOpacity>
                    )}
                </View>                
            ) : (
                <TextInput
                    onChangeText={handleTextChange}
                    style={!inputInFocus ? [
                        style.input, 
                        {
                            height: height ? height : 44,
                            borderColor: `${error ? "rgba(180, 35, 24, 1)" : "#E7E5E5"}`
                        }
                    ] : [
                        style.input, 
                        style.focusedInput, 
                        {
                            height: height ? height : 44
                        }
                    ]}
                    keyboardType={keyboardType ? keyboardType : "default"}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor="#B1B2B2"
                    defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                    multiline={multiline ? multiline : false}
                    numberOfLines={minRows ? minRows : 1}
                    textAlignVertical={textAlign ? textAlign : "center"}
                    editable={editable ? editable : true}
                />
            )}
            { helperText && (
                <Text style={style.label}>{helperText}</Text>
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
    adornmentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },  
    adornedInput: {
        flex: 1,
        fontFamily: 'mulish-semibold',   
        height: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontSize: 12,
    },
    adornment: {
        fontFamily: 'mulish-regular',
        color: "#837F7F",
        fontSize: 14,  
    },
    focusedInput: {
        borderColor: primaryColor
    },
})
 
export default Input;