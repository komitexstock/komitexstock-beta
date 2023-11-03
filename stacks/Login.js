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
import CustomButton from "../components/CustomButton";
// react hooks
import { useState } from "react";
// colors
import { background, black, bodyText, primaryColor } from "../style/colors";
// auth
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// globals
import { useGlobals } from "../context/AppContext";

const Login = ({navigation}) => {

    const { setToast } = useGlobals();

    const [isLoading, setIsLoading] = useState(false);

    // state to store password
    const [password, setPassword] = useState("komitex1234");
    // email address
    const [emailAddress, setEmailAddress] = useState("komitexlogistics@gmail.com");

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

    const handleUserLogin = async () => {
        setIsLoading(true);
        Keyboard.dismiss();

        try {
            await signInWithEmailAndPassword(
                auth,
                emailAddress,
                password,
            );
        } catch (error) {
            console.log(error);
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });        
            setIsLoading(false);
        }

        // if (response) {
        // }
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
                    navigateTo={"OnBoarding"}
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
        fontFamily: 'mulish-bold',
    }
})
 
export default Login;