import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import HomeIcon from '../assets/icons/HomeIcon';
import HomeActiveIcon from "../assets/icons/HomeActiveIcon";
import OrdersIcon from "../assets/icons/OrdersIcon";
import OrdersActiveIcon from "../assets/icons/OrdersActiveIcon";
import WaybillIcon from "../assets/icons/WaybillIcon";
import WaybillActiveIcon from "../assets/icons/WaybillActiveIcon";
import InventoryIcon from "../assets/icons/InventoryIcon";
import InventoryActiveIcon from "../assets/icons/InventoryActiveIcon";
import AccountIcon from "../assets/icons/AccountIcon";
import AccountActiveIcon from "../assets/icons/AccountActiveIcon";
import { useNavigation } from '@react-navigation/native';
import { useStack } from "../context/AppContext";
import { useStackUpdate } from "../context/AppContext";

const BottomNavigation = () => {

    const navigation = useNavigation();

    const currentStack = useStack();
    const setCurrentStack = useStackUpdate();

    if (currentStack === "Chat") return (<></>);
    else return (
        <View style={style.bottomNavigation}>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Home"); setCurrentStack("Home")}}
            >
                {currentStack === "Home" ? (<HomeActiveIcon />) : (<HomeIcon />)}
                <Text 
                    style={currentStack === "Home" ? style.activeText : style.inactiveText}
                >
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Orders"); setCurrentStack("Orders")}}
            >
                {currentStack === "Orders" ? (<OrdersActiveIcon />) : (<OrdersIcon />)}
                <Text 
                    style={currentStack === "Orders" ? style.activeText : style.inactiveText}
                >
                    Orders
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Waybill"); setCurrentStack("Waybill")}}
            >
                {currentStack === "Waybill" ? (<WaybillActiveIcon />) : (<WaybillIcon />)}
                <Text 
                    style={currentStack === "Waybill" ? style.activeText : style.inactiveText}
                >
                    Waybill
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Inventory"); setCurrentStack("Inventory")}}
            >                
                {currentStack === "Inventory" ? (<InventoryActiveIcon />) : (<InventoryIcon />)}
                <Text 
                    style={currentStack === "Inventory" ? style.activeText : style.inactiveText}
                >
                    Inventory
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Account"); setCurrentStack("Account")}}
            >
                {currentStack === "Account" ? (<AccountActiveIcon />) : (<AccountIcon />)}
                <Text 
                    style={currentStack === "Account" ? style.activeText : style.inactiveText}
                >
                    Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    bottomNavigation: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        position: 'absolute',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%",
        height: 70,
        bottom: 0,
        shadowColor: 'rgb(38, 50, 56)',
        shadowOffset: { 
            width: 0,
            height: -3 
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    navButton: {
        display: 'flex',
        flexDirection:  'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        color: '#07427C',
        fontFamily: 'mulish-bold',
        fontSize: 8,
    },
    inactiveText: {
        color: '#B1B2B2',
        fontFamily: 'mulish-bold',
        fontSize: 8,
    },
});
 
export default BottomNavigation;