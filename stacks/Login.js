// react native components
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
// components
import Input from "../components/Input";
import Header from "../components/Header";
import { background, black, bodyText, primaryColor } from "../style/colors";
import CustomButton from "../components/CustomButton";
// react hooks
import { useState } from "react";

const Login = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);

    // state to store password
    const [password, setPassword] = useState("");
    // email address
    const [emailAddress, setEmailAddress] = useState("");

    // state to store password error
    const [errorPassword, setErrorPassword] = useState("");
    // state to email address error
    const [errorEmailAddress, setErrorEmailAddress] = useState("");

    // function to update current password
    const updatePassword = (text) => {
        setPassword(text);
    }

    const updateEmailAddress = (text) => {
        setEmailAddress(text);
    }

    const handleUserLogin = () => {
        setIsLoading(true);
    }

    const emptyFields = [emailAddress, password].some(
        (item) => item === null || item === ''
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.container}>
                <Header 
                    stackName={""}
                    navigation={navigation}
                />
                <View style={style.main}>
                    <Text style={style.headerText}>Welcome Back</Text>
                    <Input 
                        label={"Email Address"}
                        placeholder={"Email Address"}
                        value={emailAddress}
                        onChange={updateEmailAddress}
                        error={errorEmailAddress}
                        setError={setErrorEmailAddress}
                    />
                    <Input 
                        label={"Password"}
                        placeholder={"Password"}
                        isPasswordInput={true}
                        adornment={true} // adornment must be set as true for password input
                        value={password}
                        onChange={updatePassword}
                        error={errorPassword}
                        setError={setErrorPassword}
                    />

                    <CustomButton
                        name={"Login"}
                        unpadded={true}
                        shrinkWrapper={true}
                        onPress={handleUserLogin}
                        inactive={emptyFields}
                        isLoading={isLoading}
                    />

                    <View style={style.footer}>
                        <Text style={style.footerText}>Forgot password?</Text>
                        <TouchableOpacity>
                            <Text style={[style.footerText, style.linkText]}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: background,
        paddingHorizontal: 20,
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 30,
        gap: 20,
    },
    headerText: {
        color: black,
        fontSize: 24,
        fontFamily: 'mulish-bold',
    },
    footer: {
        width: "100%",
        marginTop: -4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    footerText: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 12,
    },
    linkText: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
    }
})
 
export default Login;