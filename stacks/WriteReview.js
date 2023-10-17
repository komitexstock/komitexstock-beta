// react native components
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
// components
import Header from "../components/Header";
import Input from "../components/Input";
import SuccessSheet from "../components/SuccessSheet";
// react hooks
import { useState } from "react";
import { background, black, bodyText, neutral } from "../style/colors";
import CustomButton from "../components/CustomButton";
// icons
import StarActiveIcon from "../assets/icons/StarActiveIcon";
import StarInactiveIcon from "../assets/icons/StarInactiveIcon";
// gobals
import { useGlobals } from "../context/AppContext";

const WriteReview = ({navigation}) => {

    // popup sheet ref
    const { popUpSheetRef, successSheetRef } = useGlobals();

    const [deliverySpeedRating, setDeliverySpeedRating] = useState(0);
    const [inventoryManagementRating, setInventoryManagementRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [remittanceSpeedRating, setRemittanceSpeedRating] = useState(0);
    const [affordabilityRating, setAffordabilityRating] = useState(0);

    const [review, setReview] = useState("");
    const [errorReview, setErrorReview] = useState(false);

    const ratingsList = [
        {
            id: 1,
            title: "Delivery Speed",
            description: "How was the delivery speed?",
            rating: deliverySpeedRating,
            setRating: setDeliverySpeedRating,
            ratingScores: [1, 2, 3, 4, 5]
        },
        {
            id: 2,
            title: "Inventory Management",
            description: "Were your products properly managed?",
            rating: inventoryManagementRating,
            setRating: setInventoryManagementRating,
            ratingScores: [1, 2, 3, 4, 5]
        },
        {
            id: 3,
            title: "Communication",
            description: "Were you promptly notified about any updates or changes related to your orders?",
            rating: communicationRating,
            setRating: setCommunicationRating,
            ratingScores: [1, 2, 3, 4, 5]
        },
        {
            id: 4,
            title: "Remittance Speed",
            description: "How long did it take to get your funds?",
            rating: remittanceSpeedRating,
            setRating: setRemittanceSpeedRating,
            ratingScores: [1, 2, 3, 4, 5]
        },
        {
            id: 5,
            title: "Affordability",
            description: "Do you feel you were given value for your money?",
            rating: affordabilityRating,
            setRating: setAffordabilityRating,
            ratingScores: [1, 2, 3, 4, 5]
        },
    ];

    // check for empty fields
    const emptyFields = [
        deliverySpeedRating, 
        inventoryManagementRating,
        communicationRating,
        remittanceSpeedRating,
        affordabilityRating,
        review,
        ].some(
            (item) => item === 0 || item === ''
    );

    // close popup modal bottomsheet function
    const closeSuccessModal = () => {
        successSheetRef.current?.close();
    };
    // function to open bottom sheet modal
    const openSuccessModal = () => {
        successSheetRef.current?.present();
    }

    const handleSubmitReview = () => {
        openSuccessModal();
    }
    

    const handleSubmitReviewSuccess = () => {
        closeSuccessModal();
        navigation.navigate("Home");
    }

    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <ScrollView
                    style={style.container}
                    // showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Header 
                        stackName={"Rate & Review"}
                        unpadded={true}
                        navigation={navigation}
                    />
                    <View style={style.main}>
                        { ratingsList.map((item) => (
                            <View key={item.id} style={style.ratingGroup}>
                                <Text style={style.ratingTitle}>{item.title}</Text>
                                <Text style={style.ratingDescription}>{item.description}</Text>
                                <View style={style.ratingButtonGroup}>
                                    { item.ratingScores.map((score) => (
                                        <TouchableOpacity
                                            key={score}
                                            style={style.ratingButton}
                                            onPress={() => item.setRating(score)}
                                        >
                                            {item.rating >= score ? <StarActiveIcon /> : <StarInactiveIcon />}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                        <View style={style.ratingGroup}>
                            <Text style={style.ratingTitle}>
                                Describe your Experience 
                                <Text style={style.neutralText}> (required)</Text>
                            </Text>
                            <Text style={style.ratingDescription}>
                                We’ll show this to other merchants. Your review will be public on the logistics' profile 
                            </Text>
                            <Input
                                multiline={true}
                                placeholder={"What was it like to do business with Komitex?"}
                                value={review}
                                onChange={setReview}
                                height={100}
                                textAlign={"top"}
                                error={errorReview}
                                setError={setErrorReview}
                                characterLimit={1000} 
                            />
                        </View>
                        <CustomButton
                            name={"Submit"}
                            unpadded={true}
                            inactive={emptyFields}
                            onPress={handleSubmitReview}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* success sheet */}
            <SuccessSheet
                successSheetRef={successSheetRef}
                heading={"Review submitted for Komitex Logistics"}
                height={320}
                paragraph={<>
                    Thanks for your review! We value your feedback to improve our services
                </>}
                primaryFunction={handleSubmitReviewSuccess}
            />
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        minHeight: '100%',
        backgroundColor: background,
        paddingHorizontal: 20
    },
    main: {
        paddingTop: 24,
        gap: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    ratingGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    ratingTitle: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
        textAlign: 'left',
        marginBottom: 4,
        width: '100%',
    },
    ratingDescription: {
        fontFamily: 'mulish-medium',
        fontSize: 12,
        color: bodyText,
        textAlign: 'left',
        marginBottom: 12,
        width: '100%',
        lineHeight: 18,
    },
    ratingButtonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    neutralText: {
        color: neutral
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
 
export default WriteReview;