import { View, Text, Image, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../style/colors";

const Avatar = ({imageUrl, fullname, smallerSize}) => {
    // imageUrl => string | path to image
    // fullname => string

    // get initails of fullnames e.g John Doe returns JD
    const initials = fullname
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

    // render Avatar
    return (
        <View 
            style={[
                style.avatarWrapper,
                smallerSize && {width: 30, height: 30},
            ]}
        >
            {/* display image if its given */}
            {imageUrl ? (
                <Image
                    source={imageUrl}
                    style={style.avatarImage}
                />
            ):(
                // else display initials
                <Text style={style.initials}>{initials}</Text>  
            )}
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
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    initials: {
        fontFamily: "mulish-bold",
        color: primaryColor,
    }
})
 
export default Avatar;