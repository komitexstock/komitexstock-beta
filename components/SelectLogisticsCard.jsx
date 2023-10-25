// react native components
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet
} 
from "react-native";
// icons
import VerifiedIcon from "../assets/icons/VerifiedIcon";
import StarIcon from "../assets/icons/StarIcon";
// components
import Avatar from "./Avatar";
// colors
import { black, subText, white } from "../style/colors";

const SelectLogisticsCard = ({logistics, imageUrl, rating, destinations, verified, onPress }) => {
    // logistics => string
    // image => string, image path
    // rating => float
    // destinations => int
    // verified => boolean
    // onPress => function

    // render SelectLogisticsCard component
    return (
        <TouchableOpacity 
            style={style.logisticsCard}
            onPress={onPress}
        >   
            <View style={style.primaryWrapper}>
                <View style={style.imageContainer}>
                    <Avatar 
                        imageUrl={imageUrl}
                        smallerSize={true}
                        squared={true}
                        fullname={logistics}
                    />
                    {/* { verified && <VerifiedIcon />} */}
                </View>
                <View style={style.logisticsWrapper}>
                    <Text style={style.logistics}>{logistics}</Text>
                    { verified && <VerifiedIcon />}
                </View>
                <Text style={style.location}>{destinations} Destinations</Text>
                <View style={style.ratingWrapper}>
                    <StarIcon />
                    <Text style={style.location}>{rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    logisticsCard: {
        minWidth: "40%",
        maxWidth: "50%",
        minHeight: 120,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    primaryWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 4,
    },
    imageContainer: {
        display: 'flex',
        width: "100%",
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    logisticsWrapper: {
        display: "flex",
        flexDirection: 'row',
        gap: 4,
        justifyContent: "flex-start",
        alignItems: 'center',
        width: '100%',
    },
    logistics: {
        fontFamily: "mulish-semibold",
        color: black,
        fontSize: 14,
    },
    location: {
        fontFamily: "mulish-regular",
        color: subText,
        fontSize: 10,
    },
    ratingWrapper: {
        display: "flex",
        gap: 4,
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
    }
})
 
export default SelectLogisticsCard;