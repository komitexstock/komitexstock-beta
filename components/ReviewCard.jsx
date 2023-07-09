// import React native components
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";
import { background, white, black, subText, bodyText,primaryColor } from "../style/colors";
import { useState } from "react";



const ReviewCard = ({imageUrl, fullname, timestamp, review, width, containerStyle, background, navigation}) => {

    const [reviewText, setReviewText] = useState(() => {
        if (review.length <= 200) return review;

        return <>
            {review.substring(0, 200) + "..."} &nbsp;
            <TouchableOpacity 
                style={style.readMoreButton} 
                onPress={() => {
                    navigation ? navigation.navigate("Reviews") : setReviewText(review);
                }}
            >
                <Text style={style.readMore}>read more</Text>
            </TouchableOpacity>
        </>;
    });

    return (
        <View 
            style={[
                style.review,
                containerStyle,
                {width: width ? width : "100%", backgroundColor: background ? background : white},
            ]}
        >
            <View style={style.reviewHeading}>
                <Avatar
                    imageUrl={imageUrl}
                    fullname={fullname}
                    smallerSize={true}
                />
                <View style={style.reviewInfo}>
                    <Text style={style.reviewName}>
                        {fullname}
                    </Text>
                    <Text style={style.reviewTimestamp}>
                        {timestamp}
                    </Text>
                </View>
            </View>
            <View style={style.reviewTextWrapper}>
                <Text style={style.reviewText}>
                    {reviewText}
                </Text>
            </View>
        </View>
    );
}
 
const style = StyleSheet.create({
    
    review: {
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        minHeight: 125,
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
    readMoreButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: "100%",
        alignSelf: 'baseline',
    },
    readMore: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: "underline",
        fontFamily: 'mulish-regular',
        fontSize: 12,
        marginBottom: -3,
    }
})

export default ReviewCard;