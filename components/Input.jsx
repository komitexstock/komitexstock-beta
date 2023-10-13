// recat native components 
import { 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity 
} from "react-native";
// react hooks
import { useState, useEffect, useRef } from "react";
// colors
import { black, cancelledText, inputBorder, inputLabel, neutral, primaryColor, white } from "../style/colors";
// icons
import EyeIcon from "../assets/icons/EyeIcon";
import EyeSlashIcon from "../assets/icons/EyeSlashIcon";

const Input = ({label, inputRef, placeholder, onChange, value, forceBlur, multiline, disabled, minRows, textAlign, height, keyboardType, adornment, helperText, characterLimit, error, setError, isPasswordInput, segmented, segmentId, handleFocusNextSegment, handleSegmentedInput}) => {
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

    const [keyUp, setKeyUp] = useState(false);

    const incomponentRef = useRef(null)

    // handle on text change in input
    const handleTextChange = (text) => {
        if (segmented) {
            handleSegmentedInput(segmentId, text);
            onChange(text);
            setKeyUp(true);
            return;
        }
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

    const handleKeyPress = (event) => {
        if (segmented && event.nativeEvent.key === "Backspace") {
            setKeyUp(false);
            handleSegmentedInput(segmentId, "", true);
        }
    }

    // handle input out of focus
    const handleBlur = () => {
        setInputInFocus(false);
    }

    // handle input in focus
    const handleFocus = () => {
        setInputInFocus(true);
        if (segmented && !keyUp) return handleFocusNextSegment();
    }

    // state to indicate input is in focus
    const [inputInFocus, setInputInFocus] = useState(false);

    // state to indicate password visibility
    const [hidePassword, setHidePassword] = useState(true);

    // return input component
    return (
        <View 
            style={[
                style.inputWrapper,
                segmented && {width: 40}
            ]}
        >
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
                            borderColor: `${error ? cancelledText : inputBorder}`
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
                        ref={inputRef ? inputRef : incomponentRef}
                        onChangeText={handleTextChange}
                        keyboardType={keyboardType ? keyboardType : "default"}
                        style={style.adornedInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        placeholderTextColor={neutral}
                        // if value is an array print out all its elements, usefull for phone number input
                        defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                        multiline={multiline}
                        numberOfLines={minRows ? minRows : 1}
                        textAlignVertical={textAlign ? textAlign : "center"}
                        editable={disabled ? false : true}
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
                    ref={inputRef ? inputRef : incomponentRef}
                    onChangeText={handleTextChange}
                    onKeyPress={handleKeyPress}
                    keyboardType={keyboardType ? keyboardType : "default"}
                    placeholder={placeholder}
                    placeholderTextColor={neutral}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    defaultValue={!Array.isArray(value) ? value : value.join(", ")}
                    multiline={multiline}
                    numberOfLines={minRows ? minRows : 1}
                    textAlignVertical={textAlign ? textAlign : "center"}
                    editable={disabled ? false : true}
                    maxLength={characterLimit ? characterLimit : null} 
                    style={!inputInFocus ? [
                        // style if input is not infocus
                        style.input, 
                        {
                            height: height ? height : 44,
                            borderColor: `${error ? cancelledText : inputBorder}`,
                        },
                        segmented && {
                            width: 40, 
                            height: 40,
                            fontSize: 16,
                        },
                    ] : [
                        // style if input is in focus
                        style.input, 
                        style.focusedInput, 
                        {
                            height: height ? height : 44
                        },
                        segmented && {
                            width: 40, 
                            height: 40,
                            fontSize: 16,
                        },
                    ]}
                />
            )}
            {/* // display helper text if it's given */}
            {helperText && <Text style={style.label}>{helperText}</Text>}
            {characterLimit && !segmented && (
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
        fontSize: 12,
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