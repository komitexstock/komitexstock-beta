import { TouchableWithoutFeedback, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { black, blackOut, overlay, white } from "../style/colors";

const Menu = ({closeMenu, menuButtons}) => {
    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={style.menuWrapper}>
                <View style={style.menuContainer}>
                    {menuButtons.map(menuButton => (
                        <TouchableOpacity
                            onPress={menuButton.onPress}
                            key={menuButton.id}
                            style={style.menuButton}
                        >
                            {menuButton.icon}
                            <Text style={style.menuText}>{menuButton.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    menuWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 5,
    },
    menuContainer: {
        backgroundColor: white,
        width: 184,
        // maxWidth: "80%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 15,
        shadowColor: blackOut,
        shadowOffset: { 
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 5,
    },
    menuButton: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        gap: 10,
    },
    menuText: {
        fontSize: 14,
        fontFamily: 'mulish-medium',
        color: black,
    }

})
 
export default Menu;