// react native components
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
} from "react-native";
// react hooks
import { useState } from "react";
// icons
import ThumbPrintIcon from "../assets/icons/ThumbPrintIcon";
import KeyIcon from "../assets/icons/KeyIcon";
// components
import Header from "../components/Header";
import AccountButtons from "../components/AccountButtons";
import CustomBottomSheet from "../components/CustomBottomSheet";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { windowHeight } from "../utils/helpers";
// colors
import { background } from "../style/colors";
// globals
import { useGlobals } from "../context/AppContext";

const Security = ({navigation}) => {

    // bottomsheet ref
    const { bottomSheetRef } = useGlobals();

    // state to store and update if face ID unlock or thumprint unlock is enabled
    const [isEnabled, setIsEnabled] = useState(false);

    // handle toggle of enable thumprint
    const handleToggle = () => {
        setIsEnabled(!isEnabled);
    }

    // list of security button
    const securityButtons = [
        {
            id: 1,
            title: "Use Fingerprints/Face ID",
            subtitle: false,
            icon: <ThumbPrintIcon />,
            onPress: () => {},
            toggle: true,
            isEnabled: isEnabled,
            handleToggle: handleToggle
        },
        {
            id: 3,
            title: "Change Password",
            subtitle: false,
            icon: <KeyIcon />,
            onPress: () => openModal(),
            toggle: false,
            isEnabled: null,
            setIsEnabled: () => {},
            handleToggle: () => {},
        },
    ];    

    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
    };

    // open modal function
    const openModal = () => {
        bottomSheetRef.current?.present();
    }

    // state to store current password
    const [currentPassword, setCurrentPassword] = useState("");
    // state to store new password
    const [newPassword, setNewPassword] = useState("");
    // state to store retyped password
    const [retypePassword, setRetypePassword] = useState("");

    // state to store current password error
    const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
    // state to store new password error
    const [errorNewPassword, setErrorNewPassword] = useState("");
    // state to store retyped password error
    const [errorRetypePassword, setErrorRetypePassword] = useState("");

    // function to update current password
    const updateCurrentPassword = (Password) => {
        setCurrentPassword(Password);
    }
    
    // function to update new password
    const updateNewPassword = (Password) => {
        setNewPassword(Password);
    }
    
    // function to update retype password
    const updateRetypePassword = (Password) => {
        setRetypePassword(Password);
    }

    // change password inputs
    const inputs = [
        {
            id: 1,
            label: "Current Password",
            placeholder: "Current Password",
            onChange: updateCurrentPassword,
            value: currentPassword,
            error: errorCurrentPassword,
            setError: setErrorCurrentPassword,
            adornment: true,
            isPasswordInput: true
        },
        {
            id: 2,
            label: "New Password",
            placeholder: "New Password",
            onChange: updateNewPassword,
            value: newPassword,
            error: errorNewPassword,
            setError: setErrorNewPassword,
            adornment: true,
            isPasswordInput: true
        },
        {
            id: 3,
            label: "Retype Password",
            placeholder: "Retype Password",
            onChange: updateRetypePassword,
            value: retypePassword,
            error: errorRetypePassword,
            setError: setErrorRetypePassword,
            adornment: true,
            isPasswordInput: true
        },
    ]

    // empty fields
    const emptyFields = [
        currentPassword, 
        newPassword,
        retypePassword,
        ].some(
            item => item === ''
    );

    // render Security Page
    return (
        <>
            <TouchableWithoutFeedback>
                <View style={style.container}>
                    <View style={style.main}>
                        {/* header component */}
                        <Header 
                            navigation={navigation} 
                            stackName={"Security"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                        {/* list security buttons */}
                        <View>
                            {securityButtons.map((item, index) => (
                                <AccountButtons 
                                    key={item.id}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    icon={item.icon}
                                    length={securityButtons.length - 1}
                                    index={index}
                                    onPress={item.onPress}
                                    toggle={item.toggle}
                                    isEnabled={item.isEnabled}
                                    handleToggle={item.handleToggle}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* bottomsheet modal */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={[0.6 * windowHeight]}
                autoSnapAt={0}
                sheetTitle={"Change Password"}
            >
                <TouchableWithoutFeedback
                    // onpress dismiss keyboard
                    onPress={() => Keyboard.dismiss()}
                >
                    <View style={style.bottomSheetContainer}>
                        {/* list out password inputs */}
                        <View style={style.inputContainer}>
                            {inputs.map(input => (
                                <Input
                                    key={input.id} 
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    onChange={input.onChange}
                                    value={input.value}
                                    error={input.error}
                                    setError={input.setError}
                                    adornment={input.adornment}
                                    isPasswordInput={input.isPasswordInput}
                                />
                            ))}
                        </View>
                        {/* update password */}
                        <CustomButton
                            name={"Update Password"}
                            shrinkWrapper={true}
                            onPress={() => {}}
                            unpadded={true}
                            inactive={emptyFields}
                        />
                    </View >
                </TouchableWithoutFeedback>
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
        minHeight: "100%"
    },
    main: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 24,
    },
    bottomSheetContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
    }
})
 
export default Security;