import { View, Text, Image, StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../style/colors";
// icons
import SelectedOrderIcon from "../assets/icons/SelectedOrderIcon";

const Avatar = ({imageUrl, fullname, smallerSize, largerSize, squared, selected, borderWidth, borderColor}) => {
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
                largerSize && {width: 80, height: 80, borderRadius: 40},
                borderWidth && {borderWidth: borderWidth},
                borderColor && {borderColor: borderColor},
                squared && {borderRadius: 8},
                squared && smallerSize && {borderRadius: 5},
            ]}
        >
            {/* display image if its given */}
            {imageUrl &&
                <Image
                    source={{uri: imageUrl}}
                    style={[
                        style.avatarImage,
                        smallerSize && {borderRadius: 16},
                        largerSize && {borderRadius: 40},
                        squared && {borderRadius: 8},
                        squared && smallerSize && {borderRadius: 5},
                    ]}
                />
            }
            { !imageUrl &&
                // else display initials
                <Text 
                    style={[
                        style.initials,
                        largerSize && {fontSize: 24},
                        smallerSize && {fontSize: 12},
                    ]}
                >
                    {initials}
                </Text>  
            }
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
        resizeMode: "cover",
    },
    initials: {
        fontFamily: "mulish-bold",
        color: primaryColor,
        fontSize: 16,
    },
    selectedIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,  
    },
})
 
export default Avatar;