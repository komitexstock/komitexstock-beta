import { View, Text, Image, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../style/globalStyleSheet";

const Avatar = ({imageUrl, fullname}) => {

    const initials = fullname
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

    return (
        <View style={style.avatarWrapper}>
            {imageUrl ? (
                <Image
                    source={imageUrl}
                    style={style.avatarImage}
                />
            ):(
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
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    initials: {
        fontFamily: "mulish-bold",
        color: primaryColor,
    }
})
 
export default Avatar;