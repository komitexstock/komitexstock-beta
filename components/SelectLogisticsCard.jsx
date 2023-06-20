import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet
} 
from "react-native";
import VerifiedIcon from "../assets/icons/VerifiedIcon";

const SelectLogisticsCard = ({logistics, imageUrl, inventories, destinations, verified, onPress }) => {
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

const style = StyleSheet.create({
    logisticsCard: {
        minWidth: "40%",
        maxWidth: "50%",
        minHeight: 120,
        backgroundColor: "#ffffff",
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
    lowStockIndicator: {
        minHeight: 16,
        minWidth: 60,
        backgroundColor: "rgba(254, 240, 199, 1)",
        borderRadius: 20,
        display: "flex",    
        alignItems: "center",
        justifyContent: "center",

    },
    lowStock: {
        fontFamily: "mulish-regular",
        fontSize: 8,
        color: "rgba(220, 104, 3, 1)",
    },
    logistics: {
        fontFamily: "mulish-semibold",
        color: "#222222",
        fontSize: 14,
    },
    location: {
        fontFamily: "mulish-regular",
        color: "rgba(34, 34, 34, 0.4)",
        fontSize: 10,
    }
})
 
export default SelectLogisticsCard;