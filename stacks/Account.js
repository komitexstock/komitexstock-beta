// react native components
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
    BackHandler
} from "react-native";
// hooks
import { 
    useState, 
    useRef, 
    useEffect,
    useLayoutEffect
} from "react";
// colors
import { primaryColor, secondaryColor, background, black, bodyText, white, } from '../style/colors';
// custom components
import CustomBottomSheet from "../components/CustomBottomSheet";
import AccountButtons from "../components/AccountButtons";
import Indicator from "../components/Indicator";
// icons
import CameraIcon from "../assets/icons/CameraIcon";
import EditUserIcon from "../assets/icons/EditUserIcon";
import AnalyticsIcon from "../assets/icons/AnalyticsIcon";
import BusinessReportIcon from "../assets/icons/BusinessReportIcon";
import TeamIcon from "../assets/icons/TeamIcon";
import LogisticsIcon from "../assets/icons/LogisticsIcon";
import SecurityIcon from "../assets/icons/SecurityIcon";
import NotificationBlackIcon from "../assets/icons/NotificationBlackIcon";
import HelpIcon from "../assets/icons/HelpIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import CameraPrimaryLargeIcon from "../assets/icons/CameraPrimaryLargeIcon";
import GalleryIcon from "../assets/icons/GalleryIcon";
// import image picker library
import * as ImagePicker from "expo-image-picker";

const Account = ({navigation, route}) => {
    // list of buttons in Account Page
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
                id: 4,
                title: "Generate Business Report",
                subtitle: false,
                icon: <BusinessReportIcon />,
                onPress: () => {navigation.navigate("GenerateBusinessReport")},
            },
            {
                id: 2,
                title: "Team Members",
                subtitle: false,
                icon: <TeamIcon />,
                onPress: () => {navigation.navigate("TeamMembers")},
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

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal state
    const [modal, setModal] = useState({
        type: "Notifications",
        snapPoints: ["35%"],
    });

    // state to hold selected image for profile
    const [selectedImage, setSelectedImage] = useState(null);
    
    // state to hold selected image for BANNER
    const [selectedBanner, setSelectedBanner] = useState(null);

    // state to indicate what type of image is being uploade "Banner" or "Profile"
    const [imageType, setImageType] = useState("");

    useLayoutEffect(() => {
        if (route.params) {
            route.params.imageType === "Profile" ? 
            setSelectedImage(route.params.imageUri) :
            setSelectedBanner(route.params.imageUri);
        }
    })

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
   
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        bottomSheetModalRef.current?.present();
        // set overlay
        setShowOverlay(true);
        // set modal type
        if (type === "Notifications") {
            return setModal({
                type: type,
                snapPoints: ["35%"],
            });
        }
        else if (type === "Help & Support") {
            return setModal({
                type: type,
                snapPoints: ["40%"],
            });
        } 
        else if (type === "Open with") {
            return setModal({
                type: type,
                snapPoints: ["25%"],
            });
        } 
    }

    // enable notification state 
    const [enableNotifications, setEnableNotifications] = useState(false);

    // toggle notification
    const handleToggle = () => {
        setEnableNotifications(!enableNotifications);
    }

    // buttons in support bottom sheet modal
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
            icon: <SmsIcon />,
            onPress: () => Linking.openURL('https://wa.me/+2348116320575'),
        },
        {
            id: 3,
            title: "Contact us via email",
            icon: <EmailIcon />,
            onPress: () => Linking.openURL('mailto:komitexstock@gmail.com'),
        },
    ];

    // function to select image for profile photo
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            imageType === "Profile" ? 
            setSelectedImage(result.assets[0].uri) : 
            setSelectedBanner(result.assets[0].uri);
            closeModal();
        }
    };

    // render Account page
    return (
        <>
            {/* main page content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                {/* main page wrapper */}
                <View style={style.main}>
                    <View style={style.header}>
                        <View style={style.bannerWrapper}>
                            {/* change banner photo button */}
                            <TouchableOpacity 
                                style={style.bannerCamera}
                                onPress={() => {
                                    setImageType("Banner");
                                    openModal("Open with");
                                }}
                            >
                                <CameraIcon />
                            </TouchableOpacity>
                            <Image 
                                style={style.bannerImage}
                                source={!selectedBanner ? 
                                    require('../assets/images/mega-enterprise.png') : 
                                    {uri: selectedBanner}
                                }
                            />
                        </View>
                        <View style={style.accountInfoWrapper}> 
                            <Indicator type={"Dispatched"} text={"Manager"}/>
                            <View style={style.profileWrapper}>
                                <View style={style.imageContainer}>
                                    {/* user profile photo */}
                                    <Image 
                                        style={style.profileImage}
                                        source={!selectedImage ? 
                                            require('../assets/profile/profile.jpg') : 
                                            {uri: selectedImage}
                                        }
                                    />
                                    {/* change profile photo button */}
                                    <TouchableOpacity 
                                        style={style.camera}
                                        onPress={() => {
                                            setImageType("Profile");
                                            openModal("Open with")
                                        }}
                                    >
                                        <CameraIcon />
                                    </TouchableOpacity>
                                </View>
                                {/* Username and company/business name */}
                                <View>
                                    <Text style={style.fullname}>Raymond Reddington</Text>
                                    <Text style={style.businessName}>Mega Enterprise Ltd</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.body}>
                        <View style={style.infoWrapper}>
                            <Text style={style.infoHeading}>Person Info</Text>
                            {/* Profile button to navigate to profile page */}
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
                            {/* Business button to navigate to business related pages like...*/}
                            {/*  Analytics, Team Members and Logistics  */}
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
                            {/* Security and Support buttons to navigate to security and page and... */}
                            {/*  trigger other support related bottomsheet */}
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
                        {/* logout button */}
                        <TouchableOpacity style={style.logoutButton}>
                            <LogoutIcon />
                            <Text style={style.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* Bottom sheet component */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={modal.snapPoints}
                autoSnapAt={0}
                sheetTitle={modal.type}
            >
                {/* Notifications bottomsheet content */}
                { modal.type === "Notifications" && (
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
                )}
                {/* Help and support bittonsheet content */}
                { modal.type === "Help & Support" && supportButtons.map((item, index) => (
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
                {/* Upload profile photo bottomsheet */}
                { modal.type === "Open with" && (
                    <View style={style.uploadButtonsWrapper}>
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={() => { 
                                closeModal();
                                navigation.navigate("CaptureImage", {
                                    origin: "Account",
                                    imageType: imageType,
                                })
                            }}
                        >
                            <View style={style.uploadIconWrapper}>
                                <CameraPrimaryLargeIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={pickImageAsync}
                        >
                            <View style={style.uploadIconWrapper}>
                                <GalleryIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>   
                )}
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        backgroundColor: background,
    },
    main: {
        paddingBottom: 90,
        minHeight: "100%", 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        // padding: 20,
        // paddingTop: 12,
        gap: 20,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        width: '100%',
        gap: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 189,
    },
    bannerWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: secondaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    bannerCamera: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 20,
        top: 10,
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: white,
        backgroundColor: primaryColor
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    accountInfoWrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        padding: 20,
        flex: 1,
    },
    profileWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 5,
        height: 129,
        position: 'absolute',
        bottom: 0,
        right: 20,
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
        borderWidth: 2,
        borderColor: white,
    },
    camera: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 7,
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: white,
        backgroundColor: primaryColor
    },
    fullname: {
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 14,
        marginBottom: 4,
    },
    businessName: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    infoHeading: {
        color: bodyText,
        fontFamily: 'mulish-semibold',
        marginBottom: 12,
    },
    logoutButton: {
        width: "100%",
        height: 42,
        backgroundColor: white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 12,
    },
    logoutText: {
        color: "#B42318",
        fontFamily: 'mulish-semibold',
        fontSize: 14,
    },
    uploadButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
    uploadButton: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: secondaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    uploadButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: bodyText,
    }
})
 
export default Account;