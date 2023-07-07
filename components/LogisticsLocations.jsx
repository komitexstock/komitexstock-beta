import { View, Text, StyleSheet } from "react-native";

const LogisticsLocations = ({locations, backgroundColor}) => {
    return (
        <View style={[style.locationsContainer, {backgroundColor: backgroundColor}]}>
            <Text style={style.locationsHeading}>Available Locations</Text>
            <Text style={style.locationsParagraph}>
                Find all available locations and the associated fees Komitex offers
            </Text>
            <View style={style.locationsList}>
                {locations.map((location) => (
                    <View key={location.id} style={style.locationsItems}>
                        <Text style={style.locationsText}>{location.location}</Text>
                        <Text style={style.locationsPrice}>
                            ₦{location.charge.toLocaleString()}
                            <Text style={style.decimal}>.00</Text>    
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    locationsContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 12,
        gap: 8,
    },
    locationsHeading: {
        fontFamily: 'mulish-bold',
        color: 'rgba(34, 34, 34, 1)',
        fontSize: 14,
        width: "100%",
    },
    locationsParagraph: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
        width: "100%",
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
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
    },
    locationsPrice: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 1)',
        fontSize: 12,
    },
    decimal: {
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 12,
    }
})
 
export default LogisticsLocations;