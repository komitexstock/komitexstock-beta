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
import Indicator from './Indicator';
import Avatar from "./Avatar";
import HighlightSearchedText from "./HighlightSearchedText";
// icons
import AddIcon from '../assets/icons/AddIcon';
import VerifiedIcon from "../assets/icons/VerifiedIcon";
import { black, secondaryColor, subText, white } from "../style/colors";
// helper
import { windowWidth } from "../utils/helpers";

const maxCardWidth = windowWidth/2 - 28;
const BusinessCard = ({businessName, bannerImage, totalLocations, totalProducts, totalStock, lowStock, onPress, addNew, verified, deactivated, searchQuery}) => {
    return (
        <>   
            { !addNew ? (
                <TouchableOpacity 
                    style={style.logisticsCard}
                    onPress={onPress}
                >   
                    <View style={style.primaryWrapper}>
                        <View style={style.imageContainer}>
                            {/* banner image */}
                            <Avatar
                                fullname={businessName}
                                squared={true}
                                imageUrl={bannerImage}
                            />
                            {/* if deactived indicate so */}
                            {!deactivated && lowStock && <Indicator text={"Low Stock"} type={"Pending"} />}

                            {/* only indiocate low stock if logistics hasn't been deactivated and stock is low */}
                            {deactivated && <Indicator text={"Deactivated"} type={"Cancelled"} />}
                        </View>
                        {/* business name */}
                        <View style={style.logisticsWrapper}>
                            {!searchQuery ? <Text style={style.logistics}>{businessName}</Text> : <HighlightSearchedText searchQuery={searchQuery} targetText={businessName}/>}
                            { verified && <VerifiedIcon />}
                        </View>
                        {/* display total locations or total products */}
                        {totalLocations && <Text style={style.location}>{totalLocations} Locations</Text>}
                        {totalProducts && <Text style={style.location}>{totalProducts} Products</Text>}
                    </View>
                    {/* display number of items in stock */}
                    <View style={style.secondaryWrapper}>
                        <Text style={style.items}>{totalStock} items <Text style={style.faintText}>in stock</Text></Text>
                    </View>
                </TouchableOpacity>
            ) : (<>
                {/* add logistics card */}
                <View style={style.addNewCardWrapper}>
                    <TouchableOpacity style={style.addNewButton} onPress={onPress}>
                        <AddIcon />
                    </TouchableOpacity>
                    <Text style={style.addNewText}>Add New Logistics</Text>
                </View>   
            </>)}
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
 
export default BusinessCard;