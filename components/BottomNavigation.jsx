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
import { useGlobals } from "../context/AppContext";
// auth context
import { useAuth } from "../context/AuthContext";
// colors
import { white, neutral, primaryColor } from "../style/colors";

const BottomNavigation = () => {

    const navigation = useNavigation();

    // get current stact
    const { currentStack } = useGlobals();

    // get Auth data
    const { authData } = useAuth();

    // console.log(authData?.account_type)

    // if user navigates to camera screen hide status bar
    if (currentStack === "CaptureImage") {
        StatusBar.setHidden(true);
    } else {
        StatusBar.setHidden(false);
    }

    // stack where navigation should be visible
    const visibleNavigation = ["Home", "Orders", "Waybill", "Inventory", "Warehouse", "Products", "Account"]; 

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
                onPress={() => {
                    if (authData?.account_type === "Merchant") return navigation.navigate("Inventory");
                    return navigation.navigate("Warehouse");
                }}
            >                
                {["Inventory", "Products", "Warehouse"].includes(currentStack) ? (<InventoryActiveIcon />) : (<InventoryIcon />)}
                <Text 
                    style={["Inventory", "Warehouse"].includes(currentStack) ? style.activeText : style.inactiveText}
                >
                    {authData?.account_type === "Merchant" ? "Inventory" : "Warehouse"}
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
        fontSize: 10,
    },
    inactiveText: {
        color: neutral,
        fontFamily: 'mulish-bold',
        fontSize: 10,
    },
});
 
export default BottomNavigation;