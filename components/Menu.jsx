import { TouchableWithoutFeedback, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { black, blackOut, white } from "../style/colors";
// helpers


const Menu = ({closeMenu, menuButtons, top, right, hideTouchableBackground, left, shrinkMenu}) => {

    return (
        <>  
            {!hideTouchableBackground && (
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={style.withoutFeedbackContent} />
                </TouchableWithoutFeedback>
            )}
            <View 
                style={[
                    style.menuContainer,
                    top !== undefined ? {top: top} : {top: 42},
                    right !== undefined && {right: right},
                    left !== undefined && {left: left},
                ]}
            >
                {menuButtons?.map(menuButton => (
                    <TouchableOpacity
                        onPress={menuButton.onPress}
                        key={menuButton.id}
                        style={[
                            style.menuButton,
                            shrinkMenu && {paddingVertical: 12},
                        ]}
                    >
                        {menuButton.icon}
                        <Text 
                            style={[
                                style.menuText,
                                shrinkMenu && {fontSize: 12},
                            ]}
                        >
                            {menuButton.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
}

const style = StyleSheet.create({
    withoutFeedbackContent: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menuContainer: {
        zIndex: 10,
        backgroundColor: white,
        position: "absolute",
        top: 42,
        right: 5,
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