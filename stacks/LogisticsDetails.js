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
import Avatar from "../components/Avatar";
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
import EmailIcon from "../assets/icons/EmailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import StarIcon from "../assets/icons/StarIcon";
import LocationIcon from "../assets/icons/LocationIcon";
// react hooks
import { useRef, useState } from "react";

// windows width
const windowsWidth = Dimensions.get("window").width;

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LogisticsDetails = ({navigation}) => {


    // states and delivery locations
    const states = [
        {
          id: 1,
          name: "Delta",
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
        }
    ];
      

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
          imageUrl: require('../assets/profile/profile.jpg'),
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
          imageUrl: require('../assets/profile/profile1.jpg'),
          fullname: "David Johnson",
          timestamp: "2023-07-06 17:45:00",
          review: "Impressive service from this logistics company. The staff was professional and helpful throughout the process."
        },
        {
          id: 4,
          imageUrl: require('../assets/profile/profile3.png'),
          fullname: "Sarah Williams",
          timestamp: "2023-07-05 11:20:00",
          review: "I had a great shipping experience with this logistics company. They provided real-time tracking and my package arrived in perfect condition."
        },
        {
          id: 5,
          imageUrl: require('../assets/profile/profile7.jpg'),
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
          imageUrl: require('../assets/profile/profile5.png'),
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
          imageUrl: require('../assets/profile/profile4.png'),
          fullname: "Olivia Anderson",
          timestamp: "2023-06-29 12:35:00",
          review: "Great logistics service overall. The delivery was on time, and the staff was friendly and helpful."
        }
    ];

    const processLongReviews = (text) => {
        if (text.length <= 200) return text;

        return <>
            {text.substring(0, 200) + "..."} &nbsp;
            <Text style={style.readMore}>read more</Text>
        </>;
    }


    const scrollViewRef = useRef(null);

    const [reviewsContainerStyle, setReviewContainerStyle] = useState(() => {
        if (reviews.length > 1) return {width: windowsWidth}
        return {width: windowsWidth - 40}
    });


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
    
      
    
    // render LogisticsDetails page
    return (
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
                                    5.0
                                </Text>
                                <Text style={style.bulletPoint}>{'\u2022'}</Text>
                                <TouchableOpacity 
                                    style={style.linkButton}
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
                            { states.map(state => (
                                <Accordion
                                    key={state.id}
                                    state={state.name}
                                    locations={state.locations}
                                />
                                
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('AvailableLocations')}
                        >
                            <Text style={style.showAll}>Show all locations</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[style.reviewsContainer, reviewsContainerStyle]}>
                    <View style={style.contactDetails}>
                        <StarIcon />
                        <Text style={[style.ratingHeadingText, style.ratingScore]}>
                            5.0
                        </Text>
                        <Text style={style.bulletPoint}>{'\u2022'}</Text>
                        <TouchableOpacity 
                            style={style.linkButton}
                        >
                            <Text style={style.ratingHeadingText}>
                                10 reviews
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16} // the frequency the scroll event is triggered, 16 milliseconds
                    >
                        <TouchableOpacity style={style.reviewsWrapper} activeOpacity={1}>
                            {reviews.map((review, index) => (
                                <View 
                                    key={review.id} 
                                    style={[
                                        style.review,
                                        index === reviews.length - 1 && {marginRight: 40}
                                        // adding marginRight of 40 px to the last review
                                        // to give room for the reduction in width of revie container
                                        // when a user scrolls to the end 
                                    ]}
                                >
                                    <View style={style.reviewHeading}>
                                        <Avatar
                                            imageUrl={review.imageUrl}
                                            fullname={review.fullname}
                                            smallerSize={true}
                                        />
                                        <View style={style.reviewInfo}>
                                            <Text style={style.reviewName}>
                                                {review.fullname}
                                            </Text>
                                            <Text style={style.reviewTimestamp}>
                                                {review.timestamp}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={style.reviewTextWrapper}>
                                        <Text style={style.reviewText}>
                                            {processLongReviews(review.review)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Reviews')}
                    >
                        <Text style={style.showAll}>Show all reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        paddingVertical: 20,
        paddingTop: 0,
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    main: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 20,
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
    review: {
        width: 214,
        flex: 1,
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        maxHeight: 150,
    },
    reviewHeading: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
    reviewInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    reviewName: {
        fontFamily: 'mulish-medium',
        fontSize: 14,
        color: black,
    },
    reviewTimestamp: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: subText,
    },
    reviewText: {
        color: bodyText,
        fontFamily: 'mulish-regular',
        fontSize: 12,
    },
    readMore: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: "underline",
    }
})
 
export default LogisticsDetails;