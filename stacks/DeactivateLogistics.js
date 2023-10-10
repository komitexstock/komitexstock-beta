// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking,
    BackHandler
} from "react-native";
// colors
import {
    background,
    black,
    white,
    bodyText,
    subText,
    primaryColor
} from "../style/colors";
// components
import Header from "../components/Header";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import Accordion from "../components/Accordion";
import CustomButton from "../components/CustomButton";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessPrompt from "../components/SuccessPrompt";
import CautionPrompt from "../components/CautionPrompt";
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
import EmailIcon from "../assets/icons/EmailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import ReportFlagIcon from "../assets/icons/ReportFlagIcon";
// react hooks
import { useState, useEffect } from "react";
// skeleton screen
import DeactivateLogisticsSkeleton from "../skeletons/DeactivateLogisticsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";

// windows width
const windowsHeight = Dimensions.get("window").height;

const DeactivateLogistics = ({navigation}) => {

    const { popUpSheetRef } = useGlobals();

    // states and delivery locations
    const states = [
        {
            id: 1,
            name: "Delta",
            opened: false,
            locations: [
                {
                id: 1,
                location: "Asaba",
                charge: 4000,
                },
                {
                id: 3,
                location: "Sapele",
                charge: 3500,
                },
                {
                id: 4,
                location: "Ughelli",
                charge: 4000,
                },
                {
                id: 5,
                location: "Agbor",
                charge: 3500,
                },
                {
                id: 6,
                location: "Warri",
                charge: 4500,
                },
                {
                id: 7,
                location: "Abraka",
                charge: 4000,
                },
                {
                id: 8,
                location: "Ibusa",
                charge: 3500,
                },
                {
                id: 9,
                location: "Okpanam",
                charge: 3000,
                },
                {
                id: 14,
                location: "Eku",
                charge: 4000,
                }
            ]
        },
        {
            id: 2,
            name: "Edo",
            opened: false,
            locations: [
                {
                id: 1,
                location: "Benin City",
                charge: 4000,
                },
                {
                id: 2,
                location: "Auchi",
                charge: 3500,
                },
                {
                id: 3,
                location: "Igarra",
                charge: 3000,
                },
                {
                id: 4,
                location: "Okpella",
                charge: 3500,
                },
                {
                id: 5,
                location: "Ekpoma",
                charge: 4000,
                },
                {
                id: 6,
                location: "Usen",
                charge: 3500,
                },
                {
                id: 7,
                location: "Irrua",
                charge: 3000,
                },
                {
                id: 8,
                location: "Sabongida-Ora",
                charge: 4000,
                }
            ]
        },
        {
            id: 3,
            name: "Lagos",
            opened: false,
            locations: [
                {
                id: 1,
                location: "Ikeja",
                charge: 4000,
                },
                {
                id: 2,
                location: "Victoria Island",
                charge: 5000,
                },
                {
                id: 3,
                location: "Surulere",
                charge: 3500,
                },
                {
                id: 4,
                location: "Lekki",
                charge: 4500,
                },
                {
                id: 5,
                location: "Yaba",
                charge: 3500,
                },
                {
                id: 6,
                location: "Ikorodu",
                charge: 4000,
                },
                {
                id: 7,
                location: "Apapa",
                charge: 3500,
                },
                {
                id: 8,
                location: "Epe",
                charge: 4000,
                }
            ]
        },
        {
            id: 4,
            name: "Anambra",
            opened: false,
            locations: [
                {
                id: 1,
                location: "Awka",
                charge: 4000,
                },
                {
                id: 2,
                location: "Onitsha",
                charge: 3500,
                },
                {
                id: 3,
                location: "Nnewi",
                charge: 3000,
                },
                {
                id: 4,
                location: "Ekwulobia",
                charge: 3500,
                },
                {
                id: 5,
                location: "Aguata",
                charge: 4000,
                },
                {
                id: 6,
                location: "Orumba",
                charge: 3500,
                },
                {
                id: 7,
                location: "Ogidi",
                charge: 3000,
                },
                {
                id: 8,
                location: "Otuocha",
                charge: 4000,
                }
            ]
        },
        {
            id: 5,
            name: "Rivers",
            opened: false, 
            locations: [
                {
                id: 1,
                location: "Port Harcourt",
                charge: 4500,
                },
                {
                id: 2,
                location: "Obio/Akpor",
                charge: 4000,
                },
                {
                id: 3,
                location: "Eleme",
                charge: 3500,
                },
                {
                id: 4,
                location: "Okrika",
                charge: 4000,
                },
                {
                id: 5,
                location: "Bonny",
                charge: 5000,
                },
                {
                id: 6,
                location: "Ahoada",
                charge: 3500,
                },
                {
                id: 7,
                location: "Degema",
                charge: 4000,
                },
                {
                id: 8,
                location: "Opobo",
                charge: 3500,
                }
            ]
        },
        {
            id: 6,
            name: "Bayelsa",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Yenagoa",
                    charge: 4000,
                },
                {
                    id: 2,
                    location: "Brass",
                    charge: 3500,
                },
                {
                    id: 3,
                    location: "Nembe",
                    charge: 3000,
                },
                {
                    id: 4,
                    location: "Ogbia",
                    charge: 3500,
                },
                {
                    id: 5,
                    location: "Sagbama",
                    charge: 4000,
                },
            ],
        },
        {
            id: 7,
            name: "Abuja",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Central Area",
                    charge: 4500,
                },
                {
                    id: 2,
                    location: "Garki",
                    charge: 4000,
                },
                {
                    id: 3,
                    location: "Wuse",
                    charge: 3500,
                },
                {
                    id: 4,
                    location: "Asokoro",
                    charge: 4000,
                },
                {
                    id: 5,
                    location: "Maitama",
                    charge: 5000,
                },
            ],
        },
        {
            id: 8,
            name: "Cross River",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Calabar",
                    charge: 4000,
                },
                {
                    id: 2,
                    location: "Ikom",
                    charge: 3500,
                },
                {
                    id: 3,
                    location: "Ogoja",
                    charge: 3000,
                },
                {
                    id: 4,
                    location: "Obudu",
                    charge: 3500,
                },
                {
                    id: 5,
                    location: "Ugep",
                    charge: 4000,
                },
            ],
        },
        {
            id: 9,
            name: "Oyo",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Ibadan",
                    charge: 4000,
                },
                {
                    id: 2,
                    location: "Ogbomosho",
                    charge: 3500,
                },
                {
                    id: 3,
                    location: "Iseyin",
                    charge: 3000,
                },
                {
                    id: 4,
                    location: "Oyo",
                    charge: 3500,
                },
                {
                    id: 5,
                    location: "Eruwa",
                    charge: 4000,
                },
            ],
        }
    ];
      
    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Deliveries",
            presentValue: 500,
            oldValue: 495,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 2,
            title: "Delivery Success Rate",
            presentValue: 80,
            oldValue: 82,
            decimal: false,
            unit: "%",
            unitPosition: "end",
        },
    ];

    const [confirmDeactivation, setConfirmDeactivation] = useState(false);


    // state to control popupModal snap points array
    const [snapPointsArray, setSnapPointsArray] = useState(["45%"])

    // close popup modal bottomsheet function
    const closePopUpModal = () => {
        popUpSheetRef.current?.close();
    };
    // function to open bottom sheet modal
    const openPopUpModal = () => {
        popUpSheetRef.current?.present();
    }
    // function to confirm deactivation of logistics
    const handleDeactivation = () => {
        setSnapPointsArray(["38%"])
        setConfirmDeactivation(true);
    }

    // render DeactivateLogistics page
    return (
        <>
            {!pageLoading ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.main}>
                        <View style={style.paddedContent}> 
                            {/* header component */}
                            <Header 
                                navigation={navigation} 
                                stackName={
                                    <View style={style.headerWrapper}>
                                        <Image 
                                            source={require('../assets/images/komitex.png')}
                                            style={style.logisticsImage}
                                        />
                                        <Text style={style.headerText} >Komitex Logistics</Text>
                                        <VerifiedIcon />
                                    </View>
                                } 
                                iconFunction={null} 
                                icon={null} 
                                unpadded={true}
                            />

                            <View style={style.contactInformationWrapper}>
                                <View style={style.contactDetailsWrapper}>
                                    <View style={style.contactDetails}>
                                        <EmailIcon />
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress= {() => Linking.openURL('mailto:Komitexlogistics@gmail.com')}
                                        >
                                            <Text style={style.linkText}>
                                                Komitexlogistics@gmail.com
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={style.contactDetails}>
                                        <PhoneIcon />
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress= {() => Linking.openURL('tel:+2348116320575')}
                                        >
                                            <Text style={style.linkText}>
                                                08122266618
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.contactDetailsWrapper}>
                                    <View style={style.contactDetails}>
                                        <LocationIcon />
                                        <Text style={style.locationText}>
                                            200 Locations
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <StatWrapper>
                                {stats.map(stat => (
                                    <StatCard
                                        key={stat.id}
                                        title={stat.title}
                                        presentValue={stat.presentValue}
                                        oldValue={stat.oldValue}
                                        decimal={stat.decimal}
                                        unit={stat.unit}
                                        unitPosition={stat.unitPosition}
                                        backgroundColor={white}
                                    />
                                ))}
                            </StatWrapper>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('LogisticsAnalytics')}
                            >
                                <Text style={[style.showAll, style.smallerText]}>View Full Analytics</Text>
                            </TouchableOpacity>
                            
                            <View style={style.locationsContainer}>
                                <Text style={style.locationsHeading}>Available Locations</Text>
                                <Text style={style.locationsParagraph}>
                                    Find all available locations and the associated fees Komitex offers
                                </Text>
                                <View style={style.locationsList}>
                                    { states.map((state, index) => {
                                        if (index < 5) {
                                            return (
                                                <Accordion
                                                    key={state.id}
                                                    state={state.name}
                                                    locations={state.locations}
                                                    opened={state.opened}
                                                />
                                            )
                                        }
                                    })}
                                </View>
                                { states.length > 5 && (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AvailableLocations')}
                                    >
                                        <Text style={style.showAll}>Show all locations</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={style.reportWrapper}>
                            <TouchableOpacity
                                style={style.reportButton}
                                onPress={() => {}}
                            >
                                <ReportFlagIcon />
                                <Text style={style.reportText}>Report this logistics</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            ) : <DeactivateLogisticsSkeleton />}
            <CustomButton
                name="Deactive Logistics"
                onPress={openPopUpModal}
                backgroundColor={background}
                secondaryButton={true}
            />
            {/* pop up modal */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpSheetRef}
                closeModal={closePopUpModal}
                snapPointsArray={snapPointsArray}
                autoSnapAt={0}
                sheetTitle={false}
                sheetSubtitle={false}
            >   
                {/* modal content to confirm deactivation */}
                { !confirmDeactivation ? (
                    <View style={style.popUpContent}>
                        <CautionPrompt />
                        <Text style={style.popUpHeading}>
                            Deactivate Logistics
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Are you sure you want to deactivate Komitex Logistics
                        </Text>
                        <View style={style.popUpButtonWrapper}>
                            <CustomButton
                                name={"Yes, deactivate"}
                                shrinkWrapper={true}
                                onPress={handleDeactivation}
                                unpadded={true}
                            />
                            <CustomButton
                                secondaryButton={true}
                                name={"No, cancel"}
                                shrinkWrapper={true}
                                onPress={closePopUpModal}
                                unpadded={true}
                            />
                        </View>
                    </View>
                ) : (
                    // modal content to acknowledge deactivation
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Komitex Succesfully Deactivated
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully deactivated Komitex Logistics
                        </Text>
                        <CustomButton
                            name={"Done"}
                            shrinkWrapper={true}
                            onPress={() => {
                                closePopUpModal();
                                navigation.goBack();
                            }}
                            unpadded={true}
                        />
                    </View>
                )}
            </PopUpBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        minHeight: '100%',
        minHeight: windowsHeight - 100,
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    main: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    paddedContent: {
        paddingHorizontal: 20,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 20,
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 4,
    },
    headerText: {
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 12,
    },
    contactInformationWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 12,
    },
    contactDetailsWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 8,
    },
    contactDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    linkButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    linkText: { 
        marginLeft: 8,
        fontFamily: 'mulish-medium',
        color: primaryColor,
        fontSize: 10,
    },
    locationText: { 
        fontFamily: 'mulish-medium',
        color: bodyText,
        fontSize: 10,
        marginLeft: 8,
    },
    ratingText: { 
        fontFamily: 'mulish-regular',
        color: subText,
        fontSize: 10,
        marginLeft: 8,
    },
    bulletPoint: {
        color: black,
        marginHorizontal: 4,  
    },
    linkTextUnderlined: {
        fontFamily: 'mulish-medium',
        color: primaryColor,
        fontSize: 10, 
        textDecorationLine: "underline",
        textDecorationColor: primaryColor,
    },
    locationsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: white,
        padding: 20,
        borderRadius: 12,
        gap: 8,
    },
    locationsHeading: {
        fontFamily: 'mulish-bold',
        color: black,
        fontSize: 14,
        width: "100%",
    },
    locationsParagraph: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 12,
        width: "100%",
        marginBottom: 12,
    },
    locationsList: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        width: "100%",
    },
    showAll: {
        color: primaryColor,
        fontFamily: 'mulish-semibold',
        textDecorationColor: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
    smallerText: {
        fontSize: 10,
        fontFamily: 'mulish-regular'
    },
    
    popUpContent: {
        flex: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popUpHeading: {
        fontSize: 16,
        fontFamily: 'mulish-bold',
        textAlign: 'center',
        color:  black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        textAlign: 'center',
        color: bodyText,
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 16,
    },
    reportWrapper: {
        margin: 20,
    },
    reportButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    reportText: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        textDecorationLine: "underline",
        textDecorationColor: black,
    }
})
 
export default DeactivateLogistics;