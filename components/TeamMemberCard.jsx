// react native components
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions
} 
from "react-native";
// icons
import AddIcon from '../assets/icons/AddIcon';
// color
import { black, bodyText, secondaryColor, white } from "../style/colors";
// components
import Indicator from "./Indicator";
import Avatar from "./Avatar";

const maxCardWidth = Dimensions.get("window").width/2 - 28;
const TeamMemberCard = ({ imageUrl, admin, fullname, role, onPress, addNew, deactivated}) => {
    // imageUrl => string | path to image
    // admin, addNew, deactivated => boolean
    // fullname, role => string
    // onPress => function

    return (
        <>   
            {/* id addnEw is flase, render TeamMember default card */}
            { !addNew ? (
                <TouchableOpacity 
                    style={style.teamCard}
                    // onPress show more team member details
                    onPress={onPress}
                >   
                    <View style={style.primaryWrapper}>
                        <View style={style.imageContainer}>
                            <Avatar
                                imageUrl={imageUrl}
                                fullname={fullname}
                            />
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
                // if addNew is true, render a special component to trigger add new member bottomsheet modal
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
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    role: {
        color: bodyText,
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
        color: black,
        width: "100%",
        flexWrap: "wrap",
    }
})
 
export default TeamMemberCard;