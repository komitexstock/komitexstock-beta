import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SelectRolePopUpContent = ({hanldeRoleSelect}) => {
    return (
        <View style={style.popUpContent}>
            <View style={style.roleDescription}>
                <Text style={style.roleDescriptionHeading}>
                    Manager: &nbsp; {/*non breaking space */}
                    <Text style={style.roleDescriptionText}>
                        Full access to Komitex Stock
                    </Text>
                </Text>
                <Text style={style.roleDescriptionHeading}>
                    Sales Rep: &nbsp;  {/*non breaking space */}
                    <Text style={style.roleDescriptionText}>
                        Access to orders, waybill and inventory
                    </Text>
                </Text>
            </View>
            <View style={style.popUpBottonWrapper}>
                <TouchableOpacity 
                    style={style.popUpBotton} 
                    onPress={() => hanldeRoleSelect("Manager")}
                >
                    <Text style={style.popUpBottonText}>
                        Manager
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={style.popUpBotton} 
                    onPress={() => hanldeRoleSelect("Sales Rep")}
                >
                    <Text style={style.popUpBottonText}>
                        Sales Rep
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    popUpContent: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    roleDescription: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        justifyContent: 'center',
        backgroundColor: '#E66D1C0D',
        padding: 10,
        borderRadius: 12,

    },
    roleDescriptionHeading: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: "#222222"
    },
    roleDescriptionText: {
        color: "#22222299",
    },
    popUpBottonWrapper: {
        width: "100%",
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    popUpBotton: {
        width: "100%",
        padding: 10,
    },
    popUpBottonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: '#222222',
    }
})
 
export default SelectRolePopUpContent;