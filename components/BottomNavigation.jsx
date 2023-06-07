import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import HomeActiveIcon from "../assets/icons/HomeActiveIcon";
import OrdersIcon from "../assets/icons/OrdersIcon";
import WaybillIcon from "../assets/icons/WaybillIcon";
import InventoryIcon from "../assets/icons/InventoryIcon";
import AccountsIcon from "../assets/icons/AccountsIcon";

const BottomNavigation = () => {
    return (
        <View style={style.bottomNavigation}>
            <TouchableOpacity style={style.navButton}>
                <HomeActiveIcon />
                <Text style={style.activeText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.navButton}>
                <OrdersIcon />
                <Text style={style.inactiveText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.navButton}>
                <WaybillIcon />
                <Text style={style.inactiveText}>Waybill</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.navButton}>
                <InventoryIcon />
                <Text style={style.inactiveText}>Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.navButton}>
                <AccountsIcon />
                <Text style={style.inactiveText}>Account</Text>
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