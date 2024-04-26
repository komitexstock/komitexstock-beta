// react native components
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
// hooks
import { 
    useState, 
    useEffect,
    useRef,
} from "react";
// colors
import { primaryColor, secondaryColor, background, black, bodyText, white, cancelledText, } from '../style/colors';
// custom components
import AccountButtons from "../components/AccountButtons";
import Indicator from "../components/Indicator";
import Avatar from "../components/Avatar";
import CustomBottomSheet from "../components/CustomBottomSheet";
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
import MerchantsIcon from "../assets/icons/MerchantsIcon";
import BusinessSettingsIcon from "../assets/icons/BusinessSettingsIcon";

// import image picker library
import * as ImagePicker from "expo-image-picker";

// import global
import { useGlobals } from "../context/AppContext";

// auth functions
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

// upload file function
import { uploadFile } from "../database/common/storage";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    doc,
    updateDoc,
} from "firebase/firestore";

//local database
import { handleUsers } from "../sql/handleUsers";
import { useSQLiteContext } from "expo-sqlite/next";

const Account = ({navigation, route}) => {

    // local database
    const db = useSQLiteContext();

    // auth data
    const { authData, setStoredData, utilityData } = useAuth();

    // sheet ref
    const sheetRef = useRef(null);

    const [sheetParameters, setSheetParameters] = useState({
        sheetTitle: "Open with",
        snapPointsArray: [198],
    });

    // global varaibles/states
    const { setBottomSheet, setToast, currentStack } = useGlobals();

    useEffect(() => {
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });
    }, [])
    
    // state to store preloaded data
    const [preload, setPreload] = useState({
        teamMembers: { // data for temMembers screen
            data: []
        },
        analytics: { // data for analytics screen
            data: []
        },
        merchants: { // data for merchants
            data: []
        },
        logistics: { // data for logistics
            data: []
        },
    });

    // fetch members from local database
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // get team members
                const users = await handleUsers.getUsers(db);
                return users;
            } catch (error) {
                console.log("Fetch local members error:", error.message);            
            }
        };

        fetchMembers().then((users) => {
            // modify users array 
            const modifyUsers = users.map(user => {
                return {
                    ...user,
                    admin: user?.admin === 1,
                    deactivated: user?.deactivated === 1,
                }
            });

            // add new member card
            const addNewCard = { 
                id: "addNew",
                add_new: true,
            }

            // set team members preloaded_data
            setPreload(prevState => {
                return {
                    ...prevState,
                    teamMembers: {
                        data: [...modifyUsers, addNewCard],
                    }
                }
            });
        }).catch((error) => {
            console.log("Fetch members Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        })
    }, [currentStack])

    // console.log(preload.teamMembers.data);

    // merchant account business group buttons
    const merchantBusinessButtons = () => {

        // business default buttons
        let buttons = [
            {
                id: 2,
                title: "Team Members",
                subtitle: false,
                icon: <TeamIcon />,
                onPress: () => navigation.navigate("TeamMembers", {
                    preloaded_data: preload.teamMembers.data,
                }),
            },
        ];

        // buttons accessible to just managers
        const managerButtons = [
            {
                id: 1,
                title: "Analytics",
                subtitle: false,
                icon: <AnalyticsIcon />,
                onPress: () => navigation.navigate("Analytics", {
                    preloaded_data: preload.analytics,
                }),
            },
            {
                id: 4,
                title: "Generate Business Report",
                subtitle: false,
                icon: <BusinessReportIcon />,
                onPress: () => navigation.navigate("GenerateBusinessReport"),
            },
            {
                id: 3,
                title: "logistics",
                subtitle: false,
                icon: <LogisticsIcon />,
                onPress: () => navigation.navigate("Logistics", {
                    preloaded_data: preload.logistics.data,
                }),
            },
        ];

        // if user is a manager, include manager buttons
        if (authData?.role === "Manager") {
            return [...buttons, ...managerButtons];
        };

        // else return just common buttons
        return buttons;
    };

    // logistics account business group buttons
    const logisticsBusinessButtons = () => {
        
        // business buttons
        const buttons = [
            {
                id: 2,
                title: "Team Members",
                subtitle: false,
                icon: <TeamIcon />,
                onPress: () => navigation.navigate("TeamMembers", {
                    preloaded_data: preload.teamMembers.data,
                }),            },
        ];

        // manager buttons
        const managerButtons = [
            {
                id: 1,
                title: "Analytics",
                subtitle: false,
                icon: <AnalyticsIcon />,
                onPress: () => navigation.navigate("Analytics", {
                    preloaded_data: preload.analytics.data,
                }),            },
            {
                id: 5,
                title: "Business Settings",
                subtitle: false,
                icon: <BusinessSettingsIcon />,
                onPress: () => {navigation.navigate("BusinessSettings")},
            },
            {
                id: 4,
                title: "Generate Business Report",
                subtitle: false,
                icon: <BusinessReportIcon />,
                onPress: () => {navigation.navigate("GenerateBusinessReport")},
            },
            {
                id: 3,
                title: "Merchants",
                subtitle: false,
                icon: <MerchantsIcon />,
                onPress: () => navigation.navigate("Merchants", {
                    preloaded_data: preload.merchants.data,
                }),            },
        ];

        // if user is a manager, include manager buttons
        if (authData?.role === "Manager") {
            return [...buttons, ...managerButtons];
        }

        // return all the buttons
        return buttons;
    };

    // list of buttons in Account Page
    const accountButtons = {
        profile: {
            title: "Profile",
            subtitle: "Show Profile",
            icon: <EditUserIcon />,
            onPress: () => {navigation.navigate("Profile")},
        },
        // select business button group according to account type
        business: authData?.account_type === "Logistics" ? logisticsBusinessButtons() : merchantBusinessButtons(),
        security: [
            {
                id: 1,
                title: "Security",
                subtitle: false,
                icon: <SecurityIcon />,
                onPress: () => navigation.navigate("Security"),
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
  
    // uploading profile state
    const [uploadingProfile, setUploadingProfile] = useState(false);
    
    // uploading profile state
    const [uploadingBanner, setUploadingBanner] = useState(false);

    // state to hold selected image for profile
    const [selectedProfile, setSelectedProfile] = useState(null);
    
    // state to hold selected image for BANNER
    const [selectedBanner, setSelectedBanner] = useState(null);

    // state to indicate what type of image is being uploade "Banner" or "Profile"
    const [imageType, setImageType] = useState("");

    // function to handle uploading profile image after navigating from Camera Screen
    useEffect(() => {        
        const handleUploadProfile = async (image, type, id) => {
            try {
                const response = await uploadFile(image, type, id, authData, setStoredData);
                if (response && type === "Profile") {
                    setSelectedProfile(null);
                    setUploadingProfile(false);
                    return;
                }
                if (response && type === "Banner") {
                    setSelectedBanner(null);
                    setUploadingBanner(false);
                    return;
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        if(!route.params) return;
        const image = route?.params?.image;
        const type = route?.params?.imageType;
        let id;
        if ( type === "Profile") {
            setUploadingProfile(true);
            setSelectedProfile(image?.uri);
            id = authData?.uid;
            handleUploadProfile(image, type, id);
        } else {
            setUploadingBanner(true);
            setSelectedBanner(image?.uir);
            id = authData?.business_id;
            handleUploadProfile(image, type, id);
        }
    }, [route?.params]);

    // open modal function
    const openModal = (type) => {
        
        // set sheet parameters
        setSheetParameters({
            sheetTitle: type,
            snapPointsArray: (() => {
               if (type === "Notifications") return [271];
               else if (type === "Help & Support") return [280];
               return [198] 
            })(),
        });
        
        sheetRef.current?.present();

        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }

    const closeModal = () => {
        sheetRef.current?.close();
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    }

    // enable notification state 
    const [enableNotifications, setEnableNotifications] = useState(utilityData?.notification);

    // toggle notification
    const handleToggle = async () => {
        try {
            // ref to users collection
            const usersRef = doc(database, "users", authData?.uid);
            
            // save data in database
            await updateDoc(usersRef, {
                notification: !enableNotifications,
            });
            
            // toggle notifications
            setEnableNotifications(prevValue => !prevValue);
    
        } catch (error) {
            console.log(error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            })            
        }
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

    // function to select image for profile photo selected from Gallery
    const pickImageAsync = async () => {
        imageType === "Profile" ? setUploadingProfile(true) : setUploadingBanner(true);

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: false,
            });
            
            
            if (!result.canceled) {
                let id = null;
                // console.log(result.assets[0].uri);
                if (imageType === "Profile") {
                    setSelectedProfile(result.assets[0].uri);
                    id = authData?.uid;
                } else {
                    setSelectedBanner(result.assets[0].uri)
                    id = authData?.business_id;
                }
                const response = await uploadFile(result.assets[0], imageType, id, authData, setStoredData);

                if (response) {
                    imageType === "Profile" ? setUploadingProfile(true) : setUploadingBanner(true);
                }
                // await uploadImage(result.assets[0], imageType);
                closeModal();
            } else {
                imageType === "Profile" ? setUploadingProfile(false) : setUploadingBanner(false);
            }
        } catch (error) {
            console.log(error.message);
            imageType === "Profile" ? setUploadingProfile(false) : setUploadingBanner(false);
        }
    
    };

    // handle sign out function
    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error.message);
        }
    }

    // console.log(authData);

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
                            { authData?.role === "Manager" && (
                                <TouchableOpacity 
                                    style={style.bannerCamera}
                                    onPress={() => {
                                        setImageType("Banner");
                                        openModal("Open with");
                                    }}
                                >
                                    <CameraIcon />
                                </TouchableOpacity>
                            )}
                            {/* banner image */}
                            <Image
                                style={style.bannerImage}
                                source={uploadingBanner ? {uri: selectedBanner} : {uri: authData?.banner_image}}
                            />
                        </View>

                        <View style={style.accountInfoWrapper}> 
                            <View style={style.profileWrapper}>
                                <View style={style.imageContainer}>
                                    {/* user profile photo */}
                                    <Avatar 
                                        imageUrl={!uploadingProfile ? authData?.profile_image : selectedProfile}
                                        largerSize={true}
                                        borderColor={white}
                                        borderWidth={2}
                                        fullname={authData?.full_name}
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
                                    <View style={style.fullnameWrapper}>
                                        <Text style={style.fullname}>{authData?.full_name}</Text>
                                        {/* user role */}
                                        <Indicator type={"Dispatched"} text={authData?.role}/>
                                    </View>
                                    <Text style={style.businessName}>{authData?.business_name}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.body}>
                        {/* profile button group */}
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

                        {/* business buttons group */}
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

                        {/* security and support button group */}
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
                        <TouchableOpacity
                            onPress={handleSignOut}
                            style={style.logoutButton}
                        >
                            <LogoutIcon />
                            <Text style={style.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <CustomBottomSheet
                sheetRef={sheetRef}
                sheetTitle={sheetParameters.sheetTitle}
                snapPointsArray={sheetParameters.snapPointsArray}
                closeModal={closeModal}
            >
                {/* open with bottomsheet */}
                {sheetParameters.sheetTitle === "Open with" && (
                    <View style={style.uploadButtonsWrapper}>
                        {/* navigate to camera screen button */}
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={() => { 
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
            
                        {/* open gallery image picker button */}
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
                {/* notifications bottomsheet */}
                {sheetParameters.sheetTitle === "Notifications" && (
                    <AccountButtons
                        title="Allow Push Notifications"
                        subtitle={false}
                        icon={<NotificationBlackIcon />}
                        length={0}
                        index={0}
                        toggle={true}
                        isEnabled={enableNotifications}
                        handleToggle={handleToggle}
                        unpadded={true}
                    />
                )}
                
                {/* help and support bottomsheet */}
                {sheetParameters.sheetTitle === "Help & Support" && supportButtons.map((item, index) => (
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
    businessNameBanner: {
        color: primaryColor,
        fontFamily: 'mulish-semibold',
        fontSize: 24,
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
        borderRadius: 40,
        backgroundColor: white,
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
    fullnameWrapper: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
        // height: 18,
        // backgroundColor: 'red',
    },
    fullname: {
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 14,
        textTransform: 'capitalize',
    },
    businessName: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
        marginTop: 4,
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
        color: cancelledText,
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