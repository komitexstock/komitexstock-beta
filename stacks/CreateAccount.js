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
import React, { useState, useEffect, useRef } from "react";
// icons
import ArrowLeft from "../assets/icons/ArrowLeft";
import SignupCompleteIcon from "../assets/icons/SignupCompleteIcon";
// window height
import { windowHeight } from "../utils/helpers"; 
// context
// import { useAuth } from "../context/AuthContext";
import { auth, database } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// fire store functions
import {
    collection,
    addDoc,
    setDoc,
    doc,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
// globals
import { useGlobals } from "../context/AppContext";
// firebase functions
import { functions } from "../Firebase";
import { httpsCallable } from "firebase/functions";
// import use AUth
import { useAuth } from "../context/AuthContext";

const CreateAccount = ({navigation}) => {

    const { setStoredData } = useAuth();

    // toast parameters
    const { setToast } = useGlobals();

    // total number of step in the creating account proccess
    const totalSteps = [1, 2, 3];
    const [currentStep, setCurrentStep] = useState(1);

    // state to indicate loading
    const [isLoading, setIsLoading] = useState(false);

    // email address
    const [emailAddress, setEmailAddress] = useState("tonystark@gmail.com");

    // state to email address error
    const [errorEmailAddress, setErrorEmailAddress] = useState(false);

    const updateEmailAddress = (text) => {
        setEmailAddress(text);
    }

    // state to store full code
    const [code, setCode] = useState("1");

    // ref for code segment 1
    const segment1 = useRef(null);
    // state for segemnt 1
    const [code1, setCode1] = useState("1");
    
    // ref for code segment 2
    const segment2 = useRef(null);
    // state for segemnt 2
    const [code2, setCode2] = useState("1");
    
    // ref for code segment 3
    const segment3 = useRef(null);
    // state for segemnt 3
    const [code3, setCode3] = useState("1");
    
    // ref for code segment 4
    const segment4 = useRef(null);
    // state for segemnt 4
    const [code4, setCode4] = useState("1");
    
    // ref for code segment 5
    const segment5 = useRef(null);
    // state for segemnt 5
    const [code5, setCode5] = useState("1");
    
    // ref for code segment 6
    const segment6 = useRef(null);
    // state for segemnt 6
    const [code6, setCode6] = useState("1");

    useEffect(() => {
        setCode(code1 + code2 + code3 + code4 + code5 + code6);
    }, [code1, code2, code3, code4, code5, code6])

    // refs for code segment
    const codeSegments = [
        {
            id: 1,
            ref: segment1,
            value: code1,
            setValue: setCode1,
        },
        {
            id: 2,
            ref: segment2,
            value: code2,
            setValue: setCode2,
        },
        {
            id: 3,
            ref: segment3,
            value: code3,
            setValue: setCode3
        },
        {
            id: 4,
            ref: segment4,
            value: code4,
            setValue: setCode4,
        },
        {
            id: 5,
            ref: segment5,
            value: code5,
            setValue: setCode5,
        },
        {
            id: 6,
            ref: segment6,
            value: code6,
            setValue: setCode6,
        },
    ];

    const [backspaceCount, setBackspaceCount] = useState(0);

    const handleSegmentedInput = (id, text, prevSegment) => {
        
        if (prevSegment === true) {
            setBackspaceCount(prevCount => prevCount + 1)
            if (id !== 1 && backspaceCount === 1) {
                codeSegments.filter(segment => segment.id === id - 1)[0].ref.current.focus();
                codeSegments.filter(segment => segment.id === id - 1)[0].setValue("");
                setBackspaceCount(1);
            }
            return;        
        }

        if (/^\d+$/.test(text)) {
            // focus on the next input segment
            if (id !== codeSegments.length ) {
                codeSegments.filter(segment => segment.id === id + 1)[0].ref.current.focus();
                setBackspaceCount(1);
            } else {
                setBackspaceCount(0);
            }
        } 
    }

    const handleFocusNextSegment = () => {
        // console.log(codeSegments.find(segment => segment.ref.current.value === ""));
        codeSegments.find(segment => segment.value === "").ref.current.focus();
    }

    // businessName
    const [businessName, setBusinessName] = useState("Stark Industries");

    // state to email address error
    const [errorBusinessName, setErrorBusinessName] = useState(false);

    const updateBusinessName = (text) => {
        setBusinessName(text);
    }

    // fullName
    const [fullName, setFullName] = useState("Tony Stark");

    // state to fullName error
    const [errorFullName, setErrorFullName] = useState(false);

    const updateFullName = (text) => {
        setFullName(text);
    }

    // phoneNumber
    const [phoneNumber, setPhoneNumber] = useState("08011223344");

    // state to phoneNumber error
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

    const updatePhoneNumber = (text) => {
        setPhoneNumber(text);
    }

    // password
    const [password, setPassword] = useState("komitex1234");

    // state to password error
    const [errorPassword, setErrorPassword] = useState(false);

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

    // console.log("Email", emailAddress);
    // console.log("Password", password);

    // user account type
    const accountType = "Merchant";

    // user role
    const role = "Manager";

    // uid avraibel
    let uid;
    let businessId;

    const handleSignup = async () => {
        setIsLoading(true);
        
        try {

            // business reference
            const businessesRef = collection(database, 'businesses');

            // get business docs
            const businessDoc = await getDocs(businessesRef);

            // get business data
            const businessData = businessDoc.docs.map(doc => doc.data());
            
            // check if business name exist
            const checkBusinessNameExist = businessData.find(business => business.business_name ===  businessName);

            // if business name exist, throw error
            if (checkBusinessNameExist !== undefined) {
                setIsLoading(false);
                // trhow error
                throw new Error("Business name already exist");
            }
            
            // sign up user
            const authResponse = await createUserWithEmailAndPassword(auth, emailAddress, password);

            // user id from create user doc response
            uid = authResponse.user.uid;

            // store business data
            const businessResponse = await addDoc(businessesRef, {
                account_type: accountType,
                banner_image: null,
                business_name: businessName,
                verified: false,
            });

            // business id from add business doc response
            businessId = businessResponse.id;

            // ref to users collection
            const usersRef = doc(database, "users", uid);

            // get setRole cloud functions
            const setRole = httpsCallable(functions, "setRole");

            // setRole token
            await setRole({ 
                email: emailAddress, 
                role: role,
                account_type: accountType,
                business_id: businessId,
            });
            
            // save data in database
            await setDoc(usersRef, {
                business_id: businessId,
                email: emailAddress,
                created_at: serverTimestamp(),
                deactivated: false,
                face_id: false,
                fingerprint: false,
                full_name: fullName,
                notification: false,
                profile_image: null,
                phone: phoneNumber,
                role: role,
                admin: true,
            });

            // disable laoding state
            setIsLoading(false);

            // move to next step
            setCurrentStep(4);
            
        } catch (error) {
            console.log("Error: ", error.message);
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });
            setIsLoading(false);
        }
    }

    // function to navigate to home screen/stack
    const handleCompleteSignup = async () => {
        // enable loading state
        setIsLoading(true);
        // store data in async storage
        await setStoredData({
            uid: uid,
            email: emailAddress,
            account_type: accountType,
            banner_image: null,
            business_name: businessName,
            verified: false,
            business_id: businessId,
            deactivated: false,
            face_id: false,
            fingerprint: false,
            full_name: fullName,
            notification: false,
            profile_image: null,
            phone: phoneNumber,
            role: role,
            admin: true,
        });
        // on data store completed, it'll auto navigate to home
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
                        {minHeight: currentStep === 3 ? windowHeight : windowHeight - 300},
                    ]}
                >
                    <View style={currentStep !== 4 ? style.wrapper : style.centerWrapper}>
                        {/* header, doesn't show in step 4 */}
                        { currentStep !== 4 && <>
                            <View style={style.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                        </>}
                        {/* step 1 content */}
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
                        {/* step 2 content */}
                        { currentStep === 2 && <>
                            <Text style={style.headerText}>Confirm your email</Text>
                            <Text style={style.paragraph}>
                                Enter the code we’ve sent by email to &nbsp;
                                <Text style={style.bolderText}>
                                    {emailAddress}
                                </Text>
                            </Text>
                            <View style={style.inputWrapper}>
                                <View style={style.segementWrapper}>
                                    {codeSegments.map(segment => (
                                        <Input 
                                            key={segment.id}
                                            inputRef={segment.ref}
                                            value={segment.value}
                                            onChange={segment.setValue}
                                            keyboardType={"numeric"}
                                            segmented={true}
                                            segmentId={segment.id}
                                            disabled={segment.disabled}
                                            handleSegmentedInput={handleSegmentedInput}
                                            characterLimit={1}
                                            handleFocusNextSegment={handleFocusNextSegment}
                                        />
                                    ))}
                                </View>
                            </View>
                            <View style={[style.footerWrapper]}>
                                <Text style={style.paragraph}>
                                    Resend code in {formatTime(time)}
                                </Text>
                            </View>
                        </>}
                        {/* step 3 content */}
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
                                    setError={setErrorFullName}
                                />
                                <Input 
                                    label={"Phone Number"}
                                    placeholder={"Phone Number"}
                                    value={phoneNumber}
                                    onChange={updatePhoneNumber}
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
                                    setError={setErrorPassword}
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
                        {/* step 4 content */}
                        { currentStep === 4 && <>
                            <View style={style.successPromptWrapper}>
                                <SignupCompleteIcon />
                                <Text style={style.successHeading}>
                                    Account set up complete
                                </Text>
                                <Text style={style.successParagraph}>
                                    Click done and explore the full benefits of Komitex
                                </Text>
                            </View>
                        </>}
                    </View>
                    {/* step 3 button, keyboard displays over button */}
                    {currentStep === 3 && <>
                        <CustomButton
                            // inactive={businessName === "" || phoneNumber === "" || password === "" || fullName === ""}
                            inactive={false}
                            name={"Agree and Continue"}
                            onPress={handleSignup}
                            unpadded={true}
                            isLoading={currentStep === 3 && isLoading}
                            backgroundColor={background}
                        />
                    </>}
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* step 1 button, button floats over keyboard */}
            {currentStep === 1 && <>
                <CustomButton
                    inactive={emailAddress === ""}
                    name={"Continue"}
                    onPress={handleEmailValidation}
                    fixed={true}
                    isLoading={currentStep === 1 && isLoading}
                    backgroundColor={background}
                />
            </>}
            {/* step 2 button, button floats over keyboard */}
            {currentStep === 2 && <>
                <CustomButton
                    inactive={code.length < 6}
                    name={"Continue"}
                    onPress={handleCodeValidation}
                    fixed={true}
                    isLoading={ currentStep === 2 && isLoading}
                    backgroundColor={background}
                />
            </>}
            {/* step 4 button */}
            {currentStep === 4 && <>
                <CustomButton
                    name={"Done"}
                    onPress={handleCompleteSignup}
                    fixed={true}
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
    segementWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
        width: '100%',
    },
    centerWrapper: {
        height: '100%',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    successPromptWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    successHeading: {
        color: black,
        fontSize: 20,
        fontFamily: 'mulish-bold',
        marginTop: 30,
        marginBottom: 13,
    },
    successParagraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-medium',
        lineHeight: 18,
        maxWidth: "50%",
        textAlign: 'center',
    },
})
 
export default CreateAccount;