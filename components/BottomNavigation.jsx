// react native components
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    StatusBar
} from "react-native";
// icons
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
// react navigation
import { useNavigation } from '@react-navigation/native';
// app context
import { useStack } from "../context/AppContext";
// colors
import { white, neutral, primaryColor } from "../style/colors";

const BottomNavigation = () => {

    const navigation = useNavigation();

    const currentStack = useStack();

    // if user navigates to camera screen hide status bar
    if (currentStack === "CaptureImage") {
        StatusBar.setHidden(true);
    } else {
        StatusBar.setHidden(false);
    }

    // stack where navigation should be visible
    const visibleNavigation = ["Home", "Orders", "Waybill", "Inventory", "Products", "Account"]; 

    if (!visibleNavigation.includes(currentStack)) return (<></>);
    else return (
        <View style={style.bottomNavigation}>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Home")}}
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
                onPress={() => {navigation.navigate("Orders")}}
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
                onPress={() => {navigation.navigate("Waybill")}}
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
                onPress={() => {navigation.navigate("Inventory")}}
            >                
                {["Inventory", "Products"].includes(currentStack) ? (<InventoryActiveIcon />) : (<InventoryIcon />)}
                <Text 
                    style={currentStack === "Inventory" ? style.activeText : style.inactiveText}
                >
                    Inventory
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.navButton}
                onPress={() => {navigation.navigate("Account")}}
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
        backgroundColor: white,
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
        color: primaryColor,
        fontFamily: 'mulish-bold',
        fontSize: 8,
    },
    inactiveText: {
        color: neutral,
        fontFamily: 'mulish-bold',
        fontSize: 8,
    },
});
 
export default BottomNavigation;