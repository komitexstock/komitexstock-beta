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
// colors
import { black, subText, white } from "../style/colors";

const SelectLogisticsCard = ({logistics, imageUrl, inventories, destinations, verified, onPress }) => {
    // logistics => string
    // image => string, image path
    // inventories => int
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
                    <Image 
                        source={imageUrl} 
                        style={style.image} 
                    />
                    { verified && <VerifiedIcon />}
                </View>
                <Text style={style.logistics}>{logistics}</Text>
                <Text style={style.location}>{inventories} Inventories</Text>
                <Text style={style.location}>{destinations} Destinations</Text>
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
    logistics: {
        fontFamily: "mulish-semibold",
        color: black,
        fontSize: 14,
    },
    location: {
        fontFamily: "mulish-regular",
        color: subText,
        fontSize: 10,
    }
})
 
export default SelectLogisticsCard;