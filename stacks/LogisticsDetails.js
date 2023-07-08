// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
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
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
import EmailIcon from "../assets/icons/EmailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import StarIcon from "../assets/icons/StarIcon";
import LocationIcon from "../assets/icons/LocationIcon";
// react hooks
import { useRef, useEffect } from "react";

// windows width
const windowsWidth = Dimensions.get("window").width;

const LogisticsDetails = ({navigation}) => {


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
    
    // render LogisticsDetails page
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.container}
        >
            <View style={style.main}>
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

                <ScrollView horizontal={true}>
                    <View style={style.reviewsContainer}>
                        <Text>Reviews</Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}

// stylesheet
const style = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dropdown: {
        width: '80%',
        backgroundColor: 'lightgray',
        overflow: 'hidden',
        marginTop: 10,
    },
    dropdownText: {
        padding: 10,
        color: 'black',
    },

    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
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
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
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
        height: 254,
        backgroundColor: white,
        padding: 20,
        borderRadius: 12,
        minWidth: windowsWidth - 40 /* horizonatl padding */,
    }
})
 
export default LogisticsDetails;