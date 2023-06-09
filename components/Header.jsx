import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import ArrowLeft from "../assets/icons/ArrowLeft";
import { StatusBar } from "react-native";


const Header = ({navigation, stackName, iconFunction, icon, iconExist}) => {
    return (
        <>
            <View style={style.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <ArrowLeft />
                </TouchableOpacity>
                <View style={style.headerBar}>
                    <Text style={style.headerText}>{stackName}</Text>
                    { iconExist && (
                        <TouchableOpacity
                            style={style.filter}
                            onPress={iconFunction}
                        >
                            {icon}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    header: {
        height: 100,
        width: "100%",
        display: 'flex',
        gap: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: "100%",       
    },
    headerText: {
        fontFamily: 'mulish-bold',
        fontSize: 20,
        color: '#222222',
    },
    filter: {
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5
    }
})
 
export default Header;