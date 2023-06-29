import Header from "../components/Header";
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
import AccountButtons from "../components/AccountButtons";
import { useState, useRef, useEffect } from "react";
import CallIcon from "../assets/icons/CallIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import CustomBottomSheet from "../components/CustomBottomSheet";
import Input from "../components/Input";
import ModalButton from "../components/ModalButton";

const Profile = ({navigation}) => {

    // state to store first name input value
    const [firstName, setFirstName] = useState("");

    // state to store error in first name input value
    const [errorFirstName, setErrorFirstName] = useState(false);

    // function to update first name
    const updateFirstName = (text) => {
        setFirstName(text);
    }

    // state to store last name input value
    const [lastName, setLastName] = useState("");

    // state to store error in last name input value
    const [errorLastName, setErrorLastName] = useState(false);

    // function to update last name
    const updateLastName = (text) => {
        setLastName(text);
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

    // use effect to close modal
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

    const supportButtons = [
        {
            id: 1,
            title: "Call Us on +234 811 632 0575",
            icon: <CallIcon />,
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

    const fullNameEmptyFields = [
        firstName, 
        lastName,
        ].some(
            (item) => item === null || item === ''
    );


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
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["50%"]}
                autoSnapAt={0}
                sheetTitle={modal}
            >   
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

                { modal === "Full Name" && (
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                    >   
                        <View style={style.modalWrapper}>
                            <View style={style.inputWrapper}>
                                <Input 
                                    label={"First Name"}
                                    placeholder={"First Name"}
                                    value={firstName}
                                    onChange={updateFirstName}
                                    error={errorFirstName}
                                    setError={setErrorFirstName}
                                />
                                <Input 
                                    label={"Last Name"}
                                    placeholder={"Last Name"}
                                    value={lastName}
                                    onChange={updateLastName}
                                    error={errorLastName}
                                    setError={setErrorLastName}
                                />
                            </View>
                            <ModalButton
                                name={"Save Changes"}
                                onPress={() => {}}
                                emptyFeilds={fullNameEmptyFields}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}

                { modal === "Phone Number" && (
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                    >   
                        <View style={style.modalWrapper}>
                            <View style={style.inputWrapper}>
                                <Text style={style.modalText}>
                                    Please type in your new phone number. We will send a code to the phone member to confirm you own it.
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
                            <ModalButton
                                name={"Continue"}
                                onPress={() => {}}
                                emptyFeilds={phoneNumber === ''}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </CustomBottomSheet>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        padding: 20,
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
        color: "rgba(34, 34, 34, 0.60)",
        flex: 1,
        marginBottom: 24,
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
        color: "rgba(34, 34, 34, 1)",
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
    },
    modalText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: "rgba(34, 34, 34, 0.6)",
        width: "100%",
    }
})
 
export default Profile;