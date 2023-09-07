// react components
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// icons
import ArrowLeft from "../assets/icons/ArrowLeft";
// colors
import { black, white } from "../style/colors";


const Header = ({navigation, stackName, iconFunction, icon, iconBackground, removeBackArrow, inlineArrow, backgroundColor, unpadded, viewStyle}) => {
    // stack name => string
    // iconfunction => function
    // icon => jsx component
    // inlineArrow, removeBackArrow => boolean

    // render header component
    return (
        <View 
            style={[
                style.header, 
                viewStyle,
                {backgroundColor: backgroundColor ? backgroundColor : 'transparent'},
            ]}
        >
            {/* elevated back arrow, visible by default */}
            { !removeBackArrow && (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={style.backArrow}
                >
                    
                    <ArrowLeft />
                </TouchableOpacity>
            )}
            <View 
                style={[
                    style.headerBar,
                    removeBackArrow && {paddingTop: 12, paddingBottom: 20},
                    {paddingHorizontal: unpadded ? 0 : 20}
                ]}
            >
                {/* inline back arrow, disabled by default */}
                { inlineArrow && (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        
                        <ArrowLeft />
                    </TouchableOpacity>
                )}
                {/* Stack name */}
                <Text style={style.headerText}>{stackName}</Text>
                {/* right aligned icon usually a menu icon */}
                { icon && (
                    <TouchableOpacity
                        style={style.filter}
                        onPress={iconFunction}
                    >
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    header: {
        maxHeight: 75,
        minHeight: 25,
        width: "100%",
        display: 'flex',
        gap: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    backArrow: {
        paddingTop: 10,
        // backgroundColor: 'red',
    },
    headerBar: {
        gap: 12,
        width: "100%",
        height: 57,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: 'mulish-bold',
        fontSize: 20,
        color: black,
        flex: 1,
    },
    filter: {
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 5
    }
})
 
export default Header;