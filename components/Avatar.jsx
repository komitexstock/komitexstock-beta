import { View, Text, Image, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../style/colors";
// icons
import SelectedOrderIcon from "../assets/icons/SelectedOrderIcon";

const Avatar = ({imageUrl, fullname, smallerSize, squared, selected}) => {
    // imageUrl => string | path to image
    // fullname => string

    // get initails of fullnames e.g John Doe returns JD
    const initials = fullname
    ?.split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

    // render Avatar
    return (
        <View 
            style={[
                style.avatarWrapper,
                smallerSize && {width: 32, height: 32, borderRadius: 16},
                squared && {borderRadius: 8}
            ]}
        >
            {/* display image if its given */}
            {imageUrl ? (
                <Image
                    source={imageUrl}
                    style={[
                        style.avatarImage,
                        squared && {borderRadius: 8}
                    ]}
                />
            ):(
                // else display initials
                <Text style={style.initials}>{initials}</Text>  
            )}
            {selected && <View style={style.selectedIconWrapper}> 
                <SelectedOrderIcon />
            </View>}
        </View>
    );
}

const style = StyleSheet.create({
    avatarWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: secondaryColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    initials: {
        fontFamily: "mulish-bold",
        color: primaryColor,
    },
    selectedIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,  
    },
})
 
export default Avatar;