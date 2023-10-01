// react native components
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    BackHandler
} from "react-native";
// colors
import { background, black, bodyText, inactiveStep, primaryColor, stepLabelFont } from "../style/colors";
// components
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
// react hooks
import { useState, useEffect } from "react";
// icons
import ArrowLeft from "../assets/icons/ArrowLeft";
// window height
import { windowHeight, windowWidth} from "../utils/helpers"; 

const CreateAccount = ({navigation}) => {

    // total number of step in the creating account proccess
    const totalSteps = [1, 2, 3];
    const [currentStep, setCurrentStep] = useState(1);

    // state to indicate loading
    const [isLoading, setIsLoading] = useState(false);

    // email address
    const [emailAddress, setEmailAddress] = useState("");

    // state to email address error
    const [errorEmailAddress, setErrorEmailAddress] = useState("");

    const updateEmailAddress = (text) => {
        setEmailAddress(text);
    }

    // code
    const [code, setCode] = useState("");

    // state to code error
    const [errorCode, setErrorCode] = useState("");

    const updateCode = (text) => {
        setCode(text);
    }

    // businessName
    const [businessName, setBusinessName] = useState("");

    // state to email address error
    const [errorBusinessName, setErrorBusinessName] = useState("");

    const updateBusinessName = (text) => {
        setBusinessName(text);
    }

    // fullName
    const [fullName, setFullName] = useState("");

    // state to fullName error
    const [errorFullName, setErrorFullName] = useState("");

    const updateFullName = (text) => {
        setFullName(text);
    }

    // phoneNumber
    const [phoneNumber, setPhoneNumber] = useState("");

    // state to phoneNumber error
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

    const updatePhoneNumber = (text) => {
        setPhoneNumber(text);
    }

    // password
    const [password, setPassword] = useState("");

    // state to password error
    const [errorPassword, setErrorPassword] = useState("");

    const updatePassword = (text) => {
        setPassword(text);
    }

    const handleEmailValidation = () => {
        setIsLoading(true);
        
        setTimeout(() => {
            setCurrentStep(2);
            setIsLoading(false);
        }, 3000);
    }

    const handleCodeValidation = () => {
        setIsLoading(true);
        
        setTimeout(() => {
            setCurrentStep(3);
            setIsLoading(false);
        }, 3000);
    }

    const handleSignup = () => {

    }

    const [time, setTime] = useState(90);

    useEffect(() => {
        if (currentStep === 2) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            if (time <= 0) {
                clearInterval(timer);
            }
    
            return () => {
                clearInterval(timer);
            };
        }

    }, [currentStep, time]);

    // function to display timer in a readable format i.e 01:30
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.contentContainer}
                    style={[
                        style.container,
                        {minHeight: currentStep === 3 ? windowHeight : windowHeight - 100}
                    ]}
                >
                    <View style={style.wrapper}>
                        <View style={style.header}>
                            <TouchableOpacity>
                                <ArrowLeft />
                            </TouchableOpacity>
                            <View style={style.stepsWrapper}>
                                {totalSteps.map(step => (
                                    <View 
                                        key={step}
                                        style={[
                                            style.step,
                                            {backgroundColor: currentStep >= step ? primaryColor : inactiveStep}
                                        ]}
                                    />
                                ))}
                            </View>
                            <Text style={style.stepLabel}>
                                Step
                                <Text  style={style.activeStepLabel}> {currentStep}</Text>
                                /3 
                            </Text>
                        </View>
                        { currentStep === 1 && <>
                            <Text style={style.headerText}>Create an account</Text>
                            <Text style={style.paragraph}>Set up your account in a few clicks</Text>
                            <View style={style.inputWrapper}>
                                <Input 
                                    label={"Email Address"}
                                    placeholder={"Email Address"}
                                    value={emailAddress}
                                    onChange={updateEmailAddress}
                                    error={errorEmailAddress}
                                    setError={setErrorEmailAddress}
                                />
                            </View>
                            <View style={style.footerWrapper}>
                                <Text style={style.paragraph}>
                                    Already have an account?&nbsp;
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    <Text style={style.linkText}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>}

                        { currentStep === 2 && <>
                            <Text style={style.headerText}>Confirm your email</Text>
                            <Text style={style.paragraph}>
                                Enter the code we’ve sent by email to &nbsp;
                                <Text style={style.bolderText}>
                                    Raymond@komitex.ng
                                </Text>
                            </Text>
                            <View style={style.inputWrapper}>
                                <Input 
                                    label={"Code"}
                                    placeholder={"Code"}
                                    value={code}
                                    onChange={updateCode}
                                    keyboardType={"numeric"}
                                    error={errorCode}
                                    setError={setErrorCode}
                                />
                            </View>
                            <View style={[style.footerWrapper, {justifyContent: 'center'}]}>
                                <Text style={style.paragraph}>
                                    Resend code in {formatTime(time)}
                                </Text>
                            </View>
                        </>}

                        { currentStep === 3 && <>
                            <Text style={style.headerText}>Add your info</Text>
                            <Text style={style.paragraph}>
                                Let us get to know more about you
                            </Text>
                            <View style={style.inputWrapper}>
                                <Input 
                                    label={"Business Name"}
                                    placeholder={"Business Name"}
                                    value={businessName}
                                    onChange={updateBusinessName}
                                    error={errorBusinessName}
                                    setError={setErrorBusinessName}
                                />
                                <Input 
                                    label={"Full Name"}
                                    placeholder={"Full Name"}
                                    value={fullName}
                                    onChange={updateFullName}
                                    error={errorFullName}
                                    setError={errorFullName}
                                />
                                <Input 
                                    label={"Phone Number"}
                                    placeholder={"Phone Number"}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    keyboardType={"numeric"}
                                    error={errorPhoneNumber}
                                    setError={setErrorPhoneNumber}
                                />
                                <Input 
                                    label={"Password"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={updatePassword}
                                    error={errorPassword}
                                    setError={setPassword}
                                    isPasswordInput={true}
                                    adornment={true}
                                />
                            </View>
                            <View style={[style.footerWrapper]}>
                                <Text style={style.paragraph}>By clicking</Text>
                                <Text style={style.bolderText}> Agree and continue</Text>
                                <Text style={style.paragraph}>, you agree to Komitex&nbsp;</Text>
                                <TouchableOpacity
                                    onPress={() => {}}
                                >
                                    <Text style={style.linkText}>
                                        Terms of Use
                                    </Text>
                                </TouchableOpacity>
                                <Text style={style.paragraph}> and&nbsp;</Text>
                                <TouchableOpacity
                                    onPress={() => {}}
                                >
                                    <Text style={style.linkText}>
                                        Privacy Policy
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>}
                    </View>
                    {currentStep === 3 && <>
                        <CustomButton
                            inactive={businessName === "" || phoneNumber === "" || password === "" || fullName === ""}
                            name={"Agree and Continue"}
                            onPress={handleSignup}
                            unpadded={true}
                            isLoading={isLoading}
                            backgroundColor={background}
                        />
                    </>}
                </ScrollView>
            </TouchableWithoutFeedback>
            {currentStep === 1 && <>
                <CustomButton
                    inactive={emailAddress === ""}
                    name={"Continue"}
                    onPress={handleEmailValidation}
                    fixed={true}
                    isLoading={isLoading}
                    backgroundColor={background}
                />
            </>}
            {currentStep === 2 && <>
                <CustomButton
                    inactive={code.length < 6}
                    name={"Continue"}
                    onPress={handleCodeValidation}
                    fixed={true}
                    isLoading={isLoading}
                    backgroundColor={background}
                />
            </>}
        </>
    );  
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: windowHeight - 100,
        backgroundColor: background,
        paddingHorizontal: 20,
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',  
    },
    wrapper: {
        width: "100%",
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepsWrapper: {
        width: "50%",
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    step: {
        height: 4,
        flex: 1,
        borderRadius: 4,
    },
    stepLabel: {
        color: stepLabelFont,
        fontSize: 12,
        fontFamily: 'mulish-medium',
    },
    activeStepLabel: {
        color: black
    },
    headerText: {
        color: black,
        fontSize: 20,
        fontFamily: 'mulish-bold',
        marginBottom: 12,
    },
    paragraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
    },
    inputWrapper: {
        marginBottom: 26,
        marginTop: 24,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    footerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        width: "100%",
        flexWrap: 'wrap',
    },
    linkText: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
        fontSize: 12,
        fontFamily: 'mulish-bold',
    },
    bolderText: {
        fontSize: 12,
        color: black,
        fontFamily: 'mulish-semibold'
    },
})
 
export default CreateAccount;