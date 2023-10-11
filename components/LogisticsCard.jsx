// react native component
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet,
    Dimensions
} 
from "react-native";
// component
import Indicator from '../components/Indicator';
// icons
import AddIcon from '../assets/icons/AddIcon';
import VerifiedIcon from "../assets/icons/VerifiedIcon";
import { black, secondaryColor, subText, white } from "../style/colors";

const maxCardWidth = Dimensions.get("window").width/2 - 28;
const LogisticsCard = ({logistics, imageUrl, totalLocations, totalStock, lowStock, onPress, addNew, verified}) => {
    return (
        <>   
            { !addNew ? (
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
                            {   lowStock && <Indicator text={"Low Stock"} type={"Pending"} />
                            }
                        </View>
                        <View style={style.logisticsWrapper}>
                            <Text style={style.logistics}>{logistics}</Text>
                            { verified && <VerifiedIcon />}
                        </View>
                        <Text style={style.location}>{totalLocations} Locations</Text>
                    </View>
                    <View style={style.secondaryWrapper}>
                        <Text style={style.items}>{totalStock} items <Text style={style.faintText}>in stock</Text></Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={style.addNewCardWrapper}>
                    <TouchableOpacity style={style.addNewButton} onPress={onPress}>
                        <AddIcon />
                    </TouchableOpacity>
                    <Text style={style.addNewText}>Add New Logistics</Text>
                </View>   
            )}
        </>
    );
}

const style = StyleSheet.create({
    logisticsCard: {
        minWidth: "40%",
        maxWidth: maxCardWidth,
        height: 180,
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
        fontSize: 12,
    },
    location: {
        fontFamily: "mulish-regular",
        color: subText,
        fontSize: 10,
    },
    items: {
        fontFamily: "mulish-semibold",
        color: black,
        fontSize: 10,
    },
    faintText: {
        fontFamily: "mulish-semibold",
        color: subText,
        fontSize: 10,
    },
    addNewCardWrapper: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minWidth: "40%",
        maxWidth: maxCardWidth,
        height: 180,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        padding: 12,
    },
    addNewButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: secondaryColor,
    },
    addNewText: {
        marginBottom: 26,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        width: "100%",
        textAlign: 'left',
        color: black
    }
})
 
export default LogisticsCard;