// react native components
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    TouchableOpacity,
    StyleSheet,
    Linking,
    Keyboard,
    Platform,
} from "react-native";
// compoents
import AccountButtons from "../components/AccountButtons";
import Header from "../components/Header";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton"
import CustomBottomSheet from "../components/CustomBottomSheet";
// react hooks
import { useRef, useState, useEffect } from "react";
// icons
import PhoneIcon from "../assets/icons/PhoneIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import { background, black, bodyText } from "../style/colors";
// globals
import { useGlobals } from "../context/AppContext";
// use auth
import { useAuth } from "../context/AuthContext";
// firebase firestore functions
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../Firebase";

const Profile = ({navigation}) => {

    // auth data
    const { authData, setStoredData } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    // sheet ref
    const sheetRef = useRef(null);

    // global states
    const {
        bottomSheet,
        setBottomSheet,
        setToast
    } = useGlobals();

    const [sheetParameters, setSheetParameters] = useState({
        sheetTitle: "Help & Support",
        snapPointsArray: [280],
    })

    // update botomsheet global states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });
    }, []);

    // state to store full name input value
    const [fullName, setFullName] = useState(authData?.full_name);

    // state to store error in full name input value
    const [errorFullName, setErrorFullName] = useState(false);

    // function to update full name
    const updateFullName = (text) => {
        setFullName(text);
    }

    // state to store phone number input value
    const [phoneNumber, setPhoneNumber] = useState(authData?.phone);

    // state to store error in phone number input value
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

    // function to update phone number
    const updatePhoneNumber = (text) => {
        setPhoneNumber(text);
    }

    // profile button list
    const profileButtons = [
        {
            id: 1,
            title: "Full Name",
            mainInfoText: authData?.full_name,
            onPress: () => openModal("Full Name"),
            disabled: false
        },
        {
            id: 2,
            title: "Business Name",
            mainInfoText: authData?.business_name,
            onPress: () => {},
            disabled: true
        },
        {
            id: 3,
            title: "Phone Number",
            mainInfoText: authData?.phone,
            onPress: () => openModal("Phone Number"),
            disabled: false
        },
        {
            id: 4,
            title: "Email Address",
            mainInfoText: authData?.email,
            onPress: () => {},
            disabled: true
        },
    ];

    // open modal function
    const openModal = (type) => {

        setSheetParameters({
            sheetTitle: type,
            snapPointsArray: (() => {
                if (type === "Full Name") {
                    return [270];
                } else if (type === "Phone Number") {
                    return [386];
                }
                // else return default
                return [280];
            })()
        })

        // open bottomsheet
        sheetRef?.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    // close modal function
    const closeModal = () => {
        // close bottomsheet
        sheetRef?.current?.close();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // support button list to populate support bottomsheet
    const supportButtons = [
        {
            id: 1,
            title: "Call Us on +234 811 632 0575",
            icon: <PhoneIcon />,
            onPress: () => Linking.openURL('tel:+2348116320575'),
        },
        {
            id: 2,
            title: "Chat with us",
            icon: <EmailIcon />,
            onPress: () => Linking.openURL('https://wa.me/+2348116320575'),
        },
        {
            id: 3,
            title: "Contact us via email",
            icon: <SmsIcon />,
            onPress: () => Linking.openURL('mailto:komitexstock@gmail.com'),
        },
    ];

    const userRef = doc(database, "users", authData?.uid);

    const handleUpdateFullname = async () => {
        setIsLoading(true);
        // dismiss keyboard
        Keyboard.dismiss();
        try {

            // update document
            await updateDoc(userRef, {
                full_name: fullName.trim(),
            });
            // show success toast
            setToast({
                text: "Full name successfully updated",
                visible: true,
                type: "success",
            });
            // set loading state to false
            setIsLoading(false);
            // close bottomsheet modal
            closeModal();
            // update user data in async storage
            await setStoredData({
                ...authData,
                full_name: fullName.trim(),
            })
        } catch (error) {
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            })
        }
    }

    const handleUpdatePhoneNumber = async () => {
        setIsLoading(true);
        // dismiss keyboard
        Keyboard.dismiss();
        try {

            // update document
            await updateDoc(userRef, {
                phone: phoneNumber,
            });
            // show success toast
            setToast({
                text: "Phone number successfully updated",
                visible: true,
                type: "success",
            });
            // set loading state to false
            setIsLoading(false);
            // close bottomsheet modal
            closeModal();
            // update user data in async storage
            await setStoredData({
                ...authData,
                phone: phoneNumber,
            })
        } catch (error) {
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            })
        }
    }

    
    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                if (!bottomSheet.opened) return;
                // set bottomsheet paramteres
                setSheetParameters(prevValue => {
                    return {
                        ...prevValue,
                        snapPointsArray: ["100%"],
                    }
                })
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
            // if wareehouse address is empty
            // set bottomsheet paramteres
            setSheetParameters(prevValue => {
                return {
                    ...prevValue,
                    snapPointsArray: (() => {
                        if (prevValue.sheetTitle === "Full Name") {
                            return [270];
                        } else if (prevValue.sheetTitle === "Phone Number") {
                            return [386];
                        }
                        // else return default
                        return [280];
                    })()
                }
            })

        });

        // this is useful if the bottomsheet is closed 
        // without performing an action
        if (!bottomSheet.opened) {
            // set bottomsheet paramteres
            setSheetParameters(prevValue => {
                return {
                    ...prevValue,
                    snapPointsArray: [386],
                }
            })
        }

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [bottomSheet.opened]);


    // render Profile page/stack
    return (<>
        <TouchableWithoutFeedback>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    <Header 
                        navigation={navigation} 
                        stackName={"Profile"} 
                        iconFunction={null} 
                        icon={null} 
                        unpadded={true}
                    />
                    <Text style={style.paragraph}>
                        You can only change your full name and phone number. To change other information, please contact 
                        <TouchableOpacity 
                            style={style.link}
                            onPress={() => openModal("Help & Support")}
                        >
                            <Text style={style.linkText}>support</Text>
                        </TouchableOpacity>
                    </Text>
                    { profileButtons.map((button, index) => (
                        <AccountButtons 
                            key={button.id}
                            title={button.title}
                            mainInfoText={button.mainInfoText}
                            length={profileButtons.length - 1}
                            index={index}
                            onPress={button.onPress}
                            disabled={button.disabled}
                        />
                    )) }
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        {/* bottomsheet modal */}
        <CustomBottomSheet 
            closeModal={closeModal}
            sheetRef={sheetRef}
            sheetTitle={sheetParameters.sheetTitle}
            snapPointsArray={sheetParameters.snapPointsArray}
        >   
            {/* help and support bottomsheet content */}
            { sheetParameters.sheetTitle === "Help & Support" && supportButtons.map((item, index) => (
                <AccountButtons
                    key={item.id}
                    title={item.title}
                    subtitle={false}
                    icon={item.icon}
                    length={supportButtons.length - 1}
                    index={index}
                    onPress={item.onPress}
                    unpadded={true}
                />
            ))}
            {/* edit full name bottomsheet modal content */}
            { sheetParameters.sheetTitle === "Full Name" && (
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}
                >   
                    <View style={style.modalWrapper}>
                        <View style={style.inputWrapper}>
                            {/* full name input */}
                            <Input 
                                label={"Full Name"}
                                placeholder={"Full Name"}
                                value={fullName}
                                onChange={updateFullName}
                                error={errorFullName}
                                setError={setErrorFullName}
                            />
                        </View>
                        {/* modal button to save changes */}
                        <CustomButton
                            name={"Save Changes"}
                            inactive={authData?.full_name === fullName}
                            shrinkWrapper={true}
                            onPress={handleUpdateFullname}
                            unpadded={true}
                            isLoading={isLoading}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
            {/* edit phone number bottomsheet modal content */}
            { sheetParameters.sheetTitle === "Phone Number" && (
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}
                >   
                    <View style={style.modalWrapper}>
                        <View style={style.inputWrapper}>
                            <Text style={style.modalText}>
                                Please type in your new phone number. 
                                We will send a code to the phone member to confirm you own it.
                            </Text>
                            <Input 
                                label={"Phone number"}
                                placeholder={"Phone number"}
                                value={phoneNumber}
                                keyboardType={"phone-pad"}
                                onChange={updatePhoneNumber}
                                error={errorPhoneNumber}
                                setError={setErrorPhoneNumber}
                            />
                        </View>
                        {/* modal button to save changes */}
                        <CustomButton
                            name={"Save Changes"}
                            inactive={authData?.phone === phoneNumber}
                            shrinkWrapper={true}
                            isLoading={isLoading}
                            onPress={handleUpdatePhoneNumber}
                            unpadded={true}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </CustomBottomSheet>
    </>);
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: "100%",
    },
    main: {
        paddingBottom: 90,
        display: "flex",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        // gap: 8,
    },
    paragraph: {
        fontSize: 12,
        fontFamily: "mulish-regular",
        color: bodyText,
        flex: 1,
        marginBottom: 24,
        marginTop: 4,
        width: "100%",
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: "100%",
        alignSelf: 'baseline',
    },
    linkText: {
        marginBottom: -3,
        marginLeft: 3,
        color: black,
        fontFamily: "mulish-regular",
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    modalWrapper: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
    },
    modalText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
        width: "100%",
        textAlign: 'center',
        maxWidth: '90%',
        alignSelf: 'center',
    }
})
 
export default Profile;