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
    BackHandler
} from "react-native";
// compoents
import AccountButtons from "../components/AccountButtons";
import Header from "../components/Header";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton"
import CustomBottomSheet from "../components/CustomBottomSheet";
// react hooks
import { useState, useRef, useEffect } from "react";
// icons
import PhoneIcon from "../assets/icons/PhoneIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import { background, black, bodyText } from "../style/colors";
// utils

const Profile = ({navigation}) => {

    // state to store full name input value
    const [fullName, setFullName] = useState("");

    // state to store error in full name input value
    const [errorFullName, setErrorFullName] = useState(false);

    // function to update full name
    const updateFullName = (text) => {
        setFullName(text);
    }

    // state to store phone number input value
    const [phoneNumber, setPhoneNumber] = useState("");

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
            mainInfoText: "Raymond Reddington",
            onPress: () => {openModal("Full Name")},
            disabled: false
        },
        {
            id: 2,
            title: "Business Name",
            mainInfoText: "Mega Enterprise Ltd",
            onPress: () => {},
            disabled: true
        },
        {
            id: 3,
            title: "Phone Number",
            mainInfoText: "08012345678",
            onPress: () => {openModal("Phone Number")},
            disabled: false
        },
        {
            id: 4,
            title: "Email Address",
            mainInfoText: "raymondreddington@gmail.com",
            onPress: () => {},
            disabled: true
        },
    ];

    // state to store modal parameters
    const [modal, setModal] = useState("")

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);
   
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // open modal function
    const openModal = (type) => {
        setModal(type);
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    // use effect to close modal when back button is prressed
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay]);


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

    // validation to check for empty input fields
    const fullNameEmptyFields = [
        fullName, 
        ].some(
            (item) => item === null || item === ''
    );

    // render Profile page/stack
    return (
        <>
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
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={modal === "Help & Support" ? ["40%"] : ["50%"]}
                autoSnapAt={0}
                sheetTitle={modal}
            >   
                {/* help and support bottomsheet content */}
                { modal === "Help & Support" && supportButtons.map((item, index) => (
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
                { modal === "Full Name" && (
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
                                inactive={fullNameEmptyFields}
                                shrinkWrapper={true}
                                onPress={() => {}}
                                unpadded={true}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
                {/* edit phone number bottomsheet modal content */}
                { modal === "Phone Number" && (
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
                                    onChange={updatePhoneNumber}
                                    error={errorPhoneNumber}
                                    setError={setErrorPhoneNumber}
                                />
                            </View>
                            {/* modal button to save changes */}
                            <CustomButton
                                name={"Save Changes"}
                                inactive={phoneNumber === ''}
                                shrinkWrapper={true}
                                onPress={() => {}}
                                unpadded={true}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </CustomBottomSheet>
        </>
    );
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