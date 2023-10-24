// react native components
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from "react-native";
// components
import Header from "../components/Header";
import ReviewCard from "../components/ReviewCard";
// colors
import { background, black, bodyText, primaryColor, secondaryColor } from "../style/colors";
// icons
import StarIcon from "../assets/icons/StarIcon";

const Reviews = ({navigation}) => {

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

    // ratings
    const ratings = [
        {
            id: 1,
            name: "Delivery Speed",
            score: 4.5
        },
        {
            id: 2,
            name: "Inventory Management",
            score: 4.5
        },
        {
            id: 3,
            name: "Customer Satisfaction",
            score: 4.2
        },
        {
            id: 4,
            name: "Remittance Speed",
            score: 4.9
        },
        {
            id: 5,
            name: "Affordability",
            score: 3.9
        },
    ];

    // render Security Page
    return (
        <ScrollView 
            style={style.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={style.main}>
                {/* header component */}
                <Header 
                    navigation={navigation} 
                    stackName={
                        <View style={style.headerWrapper}>
                            <StarIcon />
                            <Text style={[style.ratingHeadingText, style.ratingScore]}>
                                4.4
                            </Text>
                            <Text style={style.bulletPoint}>{'\u2022'}</Text>
                            <Text style={style.ratingHeadingText}>
                                10 reviews
                            </Text>
                        </View>
                    } 
                    iconFunction={null} 
                    icon={null} 
                    unpadded={true}
                />
                <View style={style.ratingContainer}>
                    {ratings.map((rating) => (
                        <View key={rating.id} style={style.ratingsWrapper}>
                            <Text style={style.ratingTitle}>{rating.name}</Text>
                            <View style={style.ratingScoreWrapper}>
                                <View style={style.barContainer}>
                                    <View 
                                        style={[
                                            style.bar,
                                            { width: 120 * (rating.score/5) }
                                        ]}
                                    />
                                </View>
                                <Text style={style.ratingLevel}>{rating.score}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={style.reviewsWrapper}>
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            imageUrl={review.imageUrl}
                            fullname={review.fullname}
                            timestamp={review.timestamp}
                            fullText={true}
                            review={review.review}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
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
        marginBottom: 20
    },
    headerWrapper: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    ratingHeadingText: {
        color: black,
        fontSize: 20,
        fontFamily: 'mulish-semibold',
    },
    ratingScore: {
        marginLeft: 8,
    },
    bulletPoint: {
        color: black,
        marginHorizontal: 4,  
    },
    ratingContainer: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        justifyContent: "flex-start",
        width: "100%",
    },
    ratingsWrapper: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    ratingTitle: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
    },
    ratingScoreWrapper: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
    },
    barContainer: {
        width: 120,
        height: 3.24,
        backgroundColor: secondaryColor,
    },
    bar: {
        width: "50%",
        height: "100%",
        backgroundColor: primaryColor,
        borderRadius: 1.62,
    },
    ratingLevel: {
        fontFamily: 'mulish-semibold',
        fontSize: 8,
    },
    reviewsWrapper: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        width: "100%",
    }
})
 
export default Reviews;