import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Image,
    TouchableOpacity,
    Linking
} from "react-native";
import { primaryColor } from '../style/globalStyleSheet';
import CameraIcon from "../assets/icons/CameraIcon";
import AccountButtons from "../components/AccountButtons";
import EditUserIcon from "../assets/icons/EditUserIcon";
import AnalyticsIcon from "../assets/icons/AnalyticsIcon";
import TeamIcon from "../assets/icons/TeamIcon";
import LogisticsIcon from "../assets/icons/LogisticsIcon";
import SecurityIcon from "../assets/icons/SecurityIcon";
import NotificationBlackIcon from "../assets/icons/NotificationBlackIcon";
import HelpIcon from "../assets/icons/HelpIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { useState, useRef } from "react";
import SmsIcon from "../assets/icons/SmsIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import CallIcon from "../assets/icons/CallIcon";

const Account = ({navigation}) => {
    
    const accountButtons = {
        profile: {
            title: "Profile",
            subtitle: "Show Profile",
            icon: <EditUserIcon />,
            onPress: () => {navigation.navigate("Profile")},
        },
        business: [
            {
                id: 1,
                title: "Analytics",
                subtitle: false,
                icon: <AnalyticsIcon />,
                onPress: () => {navigation.navigate("Analytics")},
            },
            {
                id: 2,
                title: "Team Members",
                subtitle: false,
                icon: <TeamIcon />,
                onPress: () => {navigation.navigate("Team")},
            },
            {
                id: 3,
                title: "logistics",
                subtitle: false,
                icon: <LogisticsIcon />,
                onPress: () => {navigation.navigate("Logistics")},
            },
        ],
        security: [
            {
                id: 1,
                title: "Security",
                subtitle: false,
                icon: <SecurityIcon />,
                onPress: () => {navigation.navigate("Security")},
            },
            {
                id: 2,
                title: "Notification",
                subtitle: false,
                icon: <NotificationBlackIcon />,
                onPress: () => openModal("Notifications"),
            },
            {
                id: 3,
                title: "Help & Support",
                subtitle: false,
                icon: <HelpIcon />,
                onPress: () => openModal("Help & Support"),
            },
        ],
    }

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

    // enable notification state 
    const [enableNotifications, setEnableNotifications] = useState(false);

    const handleToggle = () => {
        setEnableNotifications(!enableNotifications);
    }

    // open modal function
    const openModal = (type) => {
        setModal(type);
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

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

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    <View style={style.header}>
                        <Text style={style.stackName}>Account</Text>
                        <View style={style.accountTypeWrapper}>
                            <Text style={style.accountTypeText}>
                                Manager
                            </Text>
                        </View>
                    </View>
                    <View style={style.profileWrapper}>
                        <View style={style.imageContainer}>
                            <Image 
                                style={style.profileImage}
                                source={require('../assets/profile/profile.jpg')}
                            />
                            <TouchableOpacity style={style.camera}>
                                <CameraIcon />
                            </TouchableOpacity>
                        </View>
                        <Text style={style.fullname}>Raymond Reddington</Text>
                        <Text style={style.businessName}>Mega Enterprise Ltd</Text>
                    </View>
                    <View style={style.infoWrapper}>
                        <Text style={style.infoHeading}>Person Info</Text>
                        <AccountButtons 
                            title={accountButtons.profile.title}
                            subtitle={accountButtons.profile.subtitle}
                            icon={accountButtons.profile.icon}
                            length={0}
                            index={0}
                            onPress={accountButtons.profile.onPress}
                        />
                    </View>
                    <View style={style.infoWrapper}>
                        <Text style={style.infoHeading}>Business</Text>
                        {accountButtons.business.map((item, index) => {
                            return (
                                <AccountButtons 
                                    key={item.id}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    icon={item.icon}
                                    length={accountButtons.business.length - 1}
                                    index={index}
                                    onPress={item.onPress}
                                />
                            )
                        })}
                    </View>
                    <View style={style.infoWrapper}>
                        <Text style={style.infoHeading}>Security & Support</Text>
                        {accountButtons.security.map((item, index) => {
                            return (
                                <AccountButtons 
                                    key={item.id}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    icon={item.icon}
                                    length={accountButtons.security.length - 1}
                                    index={index}
                                    onPress={item.onPress}
                                />
                            )
                        })}
                    </View>
                    <TouchableOpacity style={style.logoutButton}>
                        <LogoutIcon />
                        <Text style={style.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["50%"]}
                autoSnapAt={0}
                sheetTitle={modal}
            >
                {modal === "Notifications" ? (
                    <AccountButtons
                        title="Allow Push Notifications"
                        subtitle={false}
                        icon={<NotificationBlackIcon />}
                        length={0}
                        index={0}
                        onPress={() => {}}
                        toggle={true}
                        isEnabled={enableNotifications}
                        handleToggle={handleToggle}
                        unpadded={true}
                    />
                ) : supportButtons.map((item, index) => (
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
            </CustomBottomSheet>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#f8f8f8",
    },
    main: {
        paddingBottom: 90,
        minHeight: "100%", 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    stackName: {
        fontFamily: 'mulish-bold',
        fontSize: 16,
    },
    accountTypeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 16,
        backgroundColor: "rgba(7, 66, 124, 0.05)",
        borderRadius: 20,
    },
    accountTypeText: {
        fontFamily: 'mulish-regular',
        fontSize: 8,
        color: primaryColor,
    },
    profileWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    imageContainer: {
        width: 80,
        height: 80,
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    camera: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 10,
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: primaryColor
    },
    fullname: {
        fontFamily: 'mulish-semibold',
        color: "#222222",
        fontSize: 14,
    },
    businessName: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        color: "rgba(34, 34, 34, 0.6)",
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    infoHeading: {
        color: "rgba(34, 34, 34, 0.6)",
        fontFamily: 'mulish-semibold',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: "#ffffff",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: "100%",
        height: 42,
        borderRadius: 12,
    },
    logoutText: {
        color: "#B42318",
        fontFamily: 'mulish-semibold'
    }

})
 
export default Account;