import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet,
    Dimensions
} 
from "react-native";
import AddIcon from '../assets/icons/AddIcon';
import { primaryColor, secondaryColor } from "../style/globalStyleSheet";
import Indicator from "./Indicator";

const maxCardWidth = Dimensions.get("window").width/2 - 28;
const TeamMemberCard = ({ imageUrl, admin, fullname, role, onPress, addNew, deactivated}) => {
    return (
        <>   
            { !addNew ? (
                <TouchableOpacity 
                    style={style.teamCard}
                    onPress={onPress}
                >   
                    <View style={style.primaryWrapper}>
                        <View style={style.imageContainer}>
                            { imageUrl ? (
                                <Image 
                                    source={imageUrl} 
                                    style={style.image} 
                                />
                            ) : (
                                <View style={style.contact}>
                                    <Text style={style.contactText}>FJ</Text>
                                </View>
                            ) }
                            { deactivated && <Indicator text={"Deactivated"} type={"Cancelled"} /> }
                        </View>
                    </View>
                    <View style={style.secondaryWrapper}>
                        {admin && (
                            <Indicator
                                type={"Dispatched"}
                                text={"Admin"}
                            />
                        )}
                        { fullname && <Text style={style.fullname}>{fullname}</Text>}
                        { role && <Text style={style.role}>{role}</Text>}
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={style.addNewCardWrapper}>
                    <TouchableOpacity style={style.addNewButton} onPress={onPress}>
                        <AddIcon />
                    </TouchableOpacity>
                    <Text style={style.addNewText}>Add New Team Member</Text>
                </View>   
            )}
        </>
    );
}

const style = StyleSheet.create({
    teamCard: {
        minWidth: "40%",
        maxWidth: maxCardWidth,
        height: 185,
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
        borderRadius: 20,
    },
    contact: {
        width: 40,
        height: 40,
        backgroundColor: secondaryColor,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    contactText: {
        fontFamily: 'mulish-bold',
        color: primaryColor,
    },
    secondaryWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: "100%",
        flex: 1,
        gap: 4,
    },
    fullname: {
        color: "#222222",
        fontFamily: 'mulish-regular',
        fontSize: 12,
    },
    role: {
        color: "#22222299",
        fontFamily: 'mulish-regular',
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
        backgroundColor: "#ffffff",
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
        backgroundColor: 'rgba(7, 66, 124, 0.05)',
        
    },
    addNewText: {
        marginBottom: 26,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        width: "100%",
        textAlign: 'left',
        color: "#222222",
        width: "100%",
        flexWrap: "wrap",
    }
})
 
export default TeamMemberCard;