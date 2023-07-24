// recat native components 
import { 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity 
} from "react-native";
// react hooks
import { useState, useEffect } from "react";
// colors
import { black, inputBorder, inputLabel, neutral, primaryColor, white } from "../style/colors";
// icons
import EyeIcon from "../assets/icons/EyeIcon";
import EyeSlashIcon from "../assets/icons/EyeSlashIcon";

const Input = ({label, placeholder, onChange, value, forceBlur, multiline, editable, minRows, textAlign, height, keyboardType, adornment, helperText, characterLimit, error, setError, isPasswordInput}) => {
    // label, placeholder, textAlign, keyboardType, helperText  => string
    // value => variable (string or int)
    // forceBlur, multiline, editable, adornment, error, isPasswordInput => Boolean
    // onChange, setError => function
    // minRows, height => int

    // listen for change in force blur
    // forceBlur state is used to blur an input
    useEffect(() => {
        // if force blur is true, set input in focus as false
        forceBlur && setInputInFocus(false);
    }, [forceBlur])

    const [charactersLeft, setCharactersLeft] = useState(characterLimit);

    // handle on text change in input
    const handleTextChange = (text) => {
        if (characterLimit) {
            setCharactersLeft(() => {
                const characterDifference = characterLimit - text.length
                if (characterDifference < 0) return 0;
                return characterDifference;
            });
        }

        onChange(text);
        if (text === '') setError(true);
        else setError(false);
    }

    // handle input out of focus
    const handleBlur = () => {
        setInputInFocus(false);
    }

    // handle input in focus
    const handleFocus = () => {
        setInputInFocus(true);
    }

    // state to indicate input is in focus
    const [inputInFocus, setInputInFocus] = useState(false);

    // state to indicate password visibility
    const [hidePassword, setHidePassword] = useState(true);

    // return input component
    return (
        <View style={style.inputWrapper}>
            { label && <Text style={style.label}>{label}</Text>}
            { adornment ? (
                // if it's an adornment input
                <View
                    style={!inputInFocus ? [
                        // if inputis not in focus
                        style.input, 
                        style.adornmentWrapper, 
                        {
                            // if height is given use that value else use default of 44
                            height: height ? height : 44,
                            // set border as red if error is detected in input
                            borderColor: `${error ? "rgba(180, 35, 24, 1)" : inputBorder}`
                        }
                    ] : [
                        // if input is in focus
                        style.input, 
                        style.adornmentWrapper, 
                        style.focusedInput, 
                        {
                            // if height is given use that value else use default of 44
                            height: height ? height : 44,
                        }
                    ]}
                >   
                    {/* adornment */}
                    <Text style={style.adornment}>{adornment}</Text>
                    {/* textinput component */}
                    <TextInput
                        onChangeText={handleTextChange}
                        keyboardType={keyboardType ? keyboardType : "default"}
                        placeholder={placeholder}
                        style={style.adornedInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholderTextColor={neutral}
                        // if value is an array print out all its elements, usefull for phone number input
                        defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                        multiline={multiline ? multiline : false}
                        numberOfLines={minRows ? minRows : 1}
                        textAlignVertical={textAlign ? textAlign : "center"}
                        editable={editable ? editable : true}
                        secureTextEntry={isPasswordInput ?  hidePassword : false}
                    />
                    {/* if its a password input show eye icon */}
                    {/* note password inputs require adornment to be set as true */}
                    { isPasswordInput && (
                        <TouchableOpacity onPress={() => setHidePassword(prevState => !prevState)}>
                            {/* swicth view password icons according to hidePassword state */}
                            { hidePassword ? <EyeIcon /> : <EyeSlashIcon /> }
                        </TouchableOpacity>
                    )}
                </View>                
            ) : (
                // not adornment input
                <TextInput
                    onChangeText={handleTextChange}
                    style={!inputInFocus ? [
                        // style if input is not infocus
                        style.input, 
                        {
                            height: height ? height : 44,
                            borderColor: `${error ? "rgba(180, 35, 24, 1)" : inputBorder}`
                        }
                    ] : [
                        // style if input is in focus
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
                    placeholderTextColor={neutral}
                    defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                    multiline={multiline ? multiline : false}
                    numberOfLines={minRows ? minRows : 1}
                    textAlignVertical={textAlign ? textAlign : "center"}
                    editable={editable ? editable : true}
                    maxLength={characterLimit ? characterLimit : null} 
                />
            )}
            {/* // display helper text if it's given */}
            {helperText && <Text style={style.label}>{helperText}</Text>}
            {characterLimit && (
                <Text style={style.limit}>{charactersLeft} character left</Text>
            )}
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: "100%",
        position: 'relative'
    },
    label: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        color: inputLabel,
    },
    limit: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        color: inputLabel,
        position: 'absolute',
        right: 0,
        top: "100%",
    },
    input: {
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
        justifyContent: 'flex-start',
        fontFamily: 'mulish-semibold',
        maxHeight: 100,
        gap: 3,
        color: black,
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
        color: inputLabel,
        color: black,
        fontSize: 14,  
    },
    focusedInput: {
        borderColor: primaryColor
    },
    helperTextWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    }
})
 
export default Input;