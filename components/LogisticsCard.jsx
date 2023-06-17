import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet
} 
from "react-native";

const LogisticsCard = ({logistics, imageUrl, totalLocations, totalStock, lowStock, onPress }) => {
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
                    {   lowStock && <View style={style.lowStockIndicator}>
                            <Text style={style.lowStock}>Low Stock</Text>
                        </View>
                    }
                </View>
                <Text style={style.logistics}>{logistics}</Text>
                <Text style={style.location}>{totalLocations} Locations</Text>
            </View>
            <View style={style.secondaryWrapper}>
                <Text style={style.items}>{totalStock} items <Text style={style.faintText}>in stock</Text></Text>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    logisticsCard: {
        minWidth: "40%",
        maxWidth: "50%",
        height: 180,
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
        fontSize: 12,
    },
    location: {
        fontFamily: "mulish-regular",
        color: "rgba(34, 34, 34, 0.6)",
        fontSize: 10,
    },
    items: {
        fontFamily: "mulish-semibold",
        color: "rgba(34, 34, 34, 1)",
        fontSize: 10,
    },
    faintText: {
        fontFamily: "mulish-semibold",
        color: "rgba(34, 34, 34, 0.6)",
        fontSize: 10,
    }
})
 
export default LogisticsCard;