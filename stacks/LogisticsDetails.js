// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Linking,
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
import ReviewCard from "../components/ReviewCard";
import Avatar from "../components/Avatar";
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
import EmailIcon from "../assets/icons/EmailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import StarIcon from "../assets/icons/StarIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import SuccessSheet from "../components/SuccessSheet";
// react hooks
import { useState } from "react";
// skeleton
import LogisticsDetailsSkeleton from "../skeletons/LogisticsDetailsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";

// windows width
const windowsWidth = Dimensions.get("window").width;

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LogisticsDetails = ({navigation}) => {

    // calendar sheet
    const { successSheetRef } = useGlobals();

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

    // is loading state
    const [isLoading, setIsLoading] = useState(false); 

    // page loading state
    const [pageLaoding, setPageLoading] = useState(true);

    setTimeout(() => {
        setPageLoading(false);
    }, 500);
      
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

    // reviews
    const reviews = [
        {
          id: 1,
          imageUrl: '../assets/profile/profile.jpg',
          fullname: "John Doe",
          timestamp: "2023-07-08 09:15:00",
          review: "I recently had the pleasure of utilizing the logistics services provided by this company, and I must say it was an exceptional experience from start to finish. The level of professionalism and attention to detail demonstrated by their team was truly commendable. From the moment I reached out for a quote to the safe delivery of my package, they exceeded my expectations at every step.\n\nThe customer service was outstanding. The representatives were knowledgeable, responsive, and eager to assist. They patiently answered all my questions and provided me with regular updates on the status of my shipment. It was comforting to know that I could rely on their expertise and trust them with my valuable package. Moreover, the delivery itself was prompt and seamless. My package arrived on time and in perfect condition, which speaks volumes about their dedication to ensuring the safe transportation of goods.\n\nI highly recommend this logistics company to anyone in need of reliable and efficient shipping services. They prioritize customer satisfaction and deliver on their promises. I will definitely be using their services again in the future for all my logistics needs."
        },
        {
          id: 2,
          imageUrl: null,
          fullname: "Jane Smith",
          timestamp: "2023-07-07 14:30:00",
          review: "I highly recommend this logistics company. They handled my package with care and delivered it on time."
        },
        {
          id: 3,
          imageUrl: '../assets/profile/profile1.jpg',
          fullname: "David Johnson",
          timestamp: "2023-07-06 17:45:00",
          review: "Impressive service from this logistics company. The staff was professional and helpful throughout the process."
        },
        {
          id: 4,
          imageUrl: '../assets/profile/profile3.png',
          fullname: "Sarah Williams",
          timestamp: "2023-07-05 11:20:00",
          review: "I had a great shipping experience with this logistics company. They provided real-time tracking and my package arrived in perfect condition."
        },
        {
          id: 5,
          imageUrl: '../assets/profile/profile7.jpg',
          fullname: "Michael Brown",
          timestamp: "2023-07-04 16:10:00",
          review: "Excellent logistics services. The delivery was fast and the communication was clear and friendly."
        },
        {
          id: 6,
          imageUrl: null,
          fullname: "Emily Davis",
          timestamp: "2023-07-03 13:05:00",
          review: "I am extremely satisfied with the logistics service provided. They went above and beyond to ensure my package was delivered safely and on time."
        },
        {
          id: 7,
          imageUrl: null,
          fullname: "Christopher Wilson",
          timestamp: "2023-07-02 19:40:00",
          review: "The logistics company did an outstanding job. My shipment arrived earlier than expected, and the customer support was fantastic."
        },
        {
          id: 8,
          imageUrl: '../assets/profile/profile5.png',
          fullname: "Jessica Miller",
          timestamp: "2023-07-01 10:55:00",
          review: "I had a wonderful experience with this logistics company. They were efficient, reliable, and delivered my package without any issues."
        },
        {
          id: 9,
          imageUrl: null,
          fullname: "Daniel Taylor",
          timestamp: "2023-06-30 15:25:00",
          review: "I am impressed with the professionalism of this logistics company. They handled my fragile items with care and delivered them safely."
        },
        {
          id: 10,
          imageUrl: '../assets/profile/profile4.png',
          fullname: "Olivia Anderson",
          timestamp: "2023-06-29 12:35:00",
          review: "Great logistics service overall. The delivery was on time, and the staff was friendly and helpful."
        }
    ];

    const [reviewsContainerStyle, setReviewContainerStyle] = useState(() => {
        if (reviews.length > 1) return {width: windowsWidth}
        return {width: windowsWidth - 40}
    });

    // function to adjust review wrapper width on end of horizontal scroll
    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isEndReached =
        contentOffset.x >= contentSize.width - layoutMeasurement.width;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (isEndReached) {
            // console.log('End of scroll reached');
            setReviewContainerStyle({
                width: windowsWidth - 40,
            })
        } else {
            setReviewContainerStyle({
                width: windowsWidth,
            })
        }
    };

    // close popup modal bottomsheet function
    const closeSuccessModal = () => {
        successSheetRef.current?.close();
    };

    // function to open bottom sheet modal
    const openSuccessModal = () => {
        successSheetRef.current?.present();
    }

    // handle add logistics 
    const handleAddLogistics = () => {
        openSuccessModal();
    }
    

    const handleAddLogisticsSuccess = () => {
        closeSuccessModal();
        navigation.navigate("Inventory");
    }
    
    // render LogisticsDetails page
    return (
        <>
            {!pageLaoding ? (
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
                                        <Avatar 
                                            imageUrl={'../assets/images/komitex.png'}
                                            squared={true}
                                        />
                                        <Text style={style.headerText}>Komitex Logistics</Text>
                                        <VerifiedIcon />
                                    </View>
                                }
                                component={true}
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
                                    <View style={style.contactDetails}>
                                        <StarIcon />
                                        <Text style={style.ratingText}>
                                            4.4
                                        </Text>
                                        <Text style={style.bulletPoint}>{'\u2022'}</Text>
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress={() => navigation.navigate('Reviews')}
                                        >
                                            <Text style={style.linkTextUnderlined}>
                                                10 reviews
                                            </Text>
                                        </TouchableOpacity>
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

                        <View style={[style.reviewsContainer, reviewsContainerStyle]}>
                            <View style={style.contactDetails}>
                                <StarIcon />
                                <Text style={[style.ratingHeadingText, style.ratingScore]}>
                                    4.4
                                </Text>
                                <Text style={style.bulletPoint}>{'\u2022'}</Text>
                                <Text style={style.ratingHeadingText}>
                                    10 reviews
                                </Text>
                            </View>
                            <ScrollView 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                scrollEventThrottle={16} // the frequency the scroll event is triggered, 16 milliseconds
                            >
                                <TouchableOpacity 
                                    style={style.reviewsWrapper} 
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate("Reviews")}
                                >
                                    {reviews.map((review, index) => (
                                        <ReviewCard
                                            key={review.id}
                                            imageUrl={review.imageUrl}
                                            fullname={review.fullname}
                                            timestamp={review.timestamp}
                                            review={review.review}
                                            width={214}
                                            background={background}
                                            containerStyle={index === reviews.length - 1 && {marginRight: 40}}
                                            navigation={navigation}
                                        />
                                    ))}
                                </TouchableOpacity>
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Reviews')}
                            >
                                <Text style={style.showAll}>Show all reviews</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.policyContainer}>
                            <View style={style.policyWrapper}>
                                <Text style={style.locationsHeading}>Company Policy</Text>
                                <View style={style.policyContent}>
                                    <Text style={style.policyText}>Remittance Duration: 24hrs after Delivery </Text>
                                    <Text style={style.policyText}>Cost for failed delivery: 50% of delivery charges</Text>
                                    <Text style={style.policyText}>Inactive Inventory: 3 months maximum</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CompanyPolicy')}
                                >
                                    <Text style={style.showAll}>Show more</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <CustomButton 
                            name="Add Komitex" 
                            onPress={handleAddLogistics}
                            backgroundColor={white}
                        />
                    </View>
                </ScrollView>
            ) : <LogisticsDetailsSkeleton />}
            {/* success sheet */}
            <SuccessSheet
                successSheetRef={successSheetRef}
                heading={"Komitex Successfully Added"}
                height={320}
                paragraph={<>
                    Hi Raymond, You have successfully linked your store to Komitex Logistics
                </>}
                primaryFunction={handleAddLogisticsSuccess}
            />
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        minHeight: '100%',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        marginTop: 4,
    },
    main: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    paddedContent: {
        paddingHorizontal: 20,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    headerText: {
        marginLeft: 8,
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 12,
    },
    contactInformationWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 12,
    },
    contactDetailsWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
    locationsItems: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
    },
    locationsText: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 12,
    },
    locationsPrice: {
        fontFamily: 'mulish-regular',
        color: black,
        fontSize: 12,
    },
    decimal: {
        color: subText,
        fontSize: 12,
    },
    showAll: {
        color: primaryColor,
        fontFamily: 'mulish-semibold',
        textDecorationColor: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
    reviewsContainer: {
        minHeight: 254,
        backgroundColor: white,
        padding: 20,
        borderRadius: 12,
        gap: 20,
        width: windowsWidth - 40 /* horizonatl padding */,
        marginTop: 20,
        marginLeft: 20,
    },
    ratingHeadingText: {
        color: black,
        fontSize: 14,
        fontFamily: 'mulish-semibold',
    },
    ratingScore: {
        marginLeft: 8,
    },
    reviewsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    policyContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    policyWrapper: {
        width: "100%",
        backgroundColor: white,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        borderRadius: 12,
        gap: 8,
    },
    policyContent: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    policyText: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
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
        color: black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: bodyText,
    },
})
 
export default LogisticsDetails;