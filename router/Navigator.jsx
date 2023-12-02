// recat
import React from 'react';
// use stack
import { useAuth } from '../context/AuthContext';
// stack navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// STACKS
// Home related stacks 
import Home from '../stacks/Home';
import Notifications from '../stacks/Notifications';
// Analytics related stacks
import Analytics from '../stacks/Analytics';
import BusinessAnalytics from '../stacks/BusinessAnalytics';
import LocationAnalytics from '../stacks/LocationAnalytics';
import ProductAnalytics from '../stacks/ProductAnalytics';
import GenerateBusinessReport from '../stacks/GenerateBusinessReport';
// orders related stacks
import Orders from '../stacks/Orders';
// send order for pick up and delivery
import PickupDelivery from '../stacks/PickupDelivery';
// send order by merchant
import SendOrder from '../stacks/SendOrder';
// waybill related stacks
import Waybill from '../stacks/Waybill';
import SendWaybill from '../stacks/SendWaybill';
// chat
import Chat from '../stacks/Chat';
import OrderDetails from '../stacks/OrderDetails';
import WaybillDetails from '../stacks/WaybillDetails';
import TransferDetails from '../stacks/TransferDetails';
// inventory related stacks
import Inventory from '../stacks/Inventory';
import Products from '../stacks/Products';
import AddLogistics from '../stacks/AddLogistics';
import AvailableLocations from '../stacks/AvailableLocations';
import AddProduct from '../stacks/AddProduct';
import EditProduct from '../stacks/EditProduct';
import ImportInventory from '../stacks/ImportInventory';
// warehouse related stacks
import Warehouse from '../stacks/Warehouse';
import AddWarehouse from '../stacks/AddWarehouse';
import EditWarehouse from '../stacks/EditWarehouse';
import StockTransfer from '../stacks/StockTransfer';
import StockTransferProducts from '../stacks/StockTransferProducts';
import StockTransferSummary from '../stacks/StockTransferSummary';
// account related stacks
import Account from '../stacks/Account';
import Profile from '../stacks/Profile';
import BusinessSettings from '../stacks/BusinessSettings';
import TeamMembers from '../stacks/TeamMembers';
import Logistics from '../stacks/Logistics';
import Merchants from '../stacks/Merchants';
import Security from '../stacks/Security';
// others stacks
import AboutLogistics from '../stacks/AboutLogistics';
import Locations from '../stacks/Locations';
import AddLocation from '../stacks/AddLocation';
import EditLocation from '../stacks/EditLocation';
import AboutMerchant from '../stacks/AboutMerchant';
import LogisticsDetails from '../stacks/LogisticsDetails';
import Reviews from '../stacks/Reviews';
import BusinessPolicy from '../stacks/BusinessPolicy';
import CaptureImage from '../stacks/CaptureImage';
import WriteReview from '../stacks/WriteReview';
import ViewImage from '../stacks/ViewImage';
import Share from '../stacks/Share';
// no session stacks
import Login from '../stacks/Login';
import OnBoarding from '../stacks/OnBoarding';
import CreateAccount from '../stacks/CreateAccount';

const Navigator = () => {

    const { authData } = useAuth();  

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator 
            initialRouteName={!authData ? "OnBoarding" : "Home"}
        >
            {!authData ? (
                <Stack.Group screenOptions={{ headerShown: false}}>
                    {/* no session stacks */}
                    {/* OnBoarding stack */}
                    <Stack.Screen 
                        name="OnBoarding" 
                        component={OnBoarding}
                    />
                    {/* Login stack */}
                    <Stack.Screen 
                        name="Login" 
                        component={Login}
                    />
                    {/* OnBoarding stack */}
                    <Stack.Screen 
                        name="CreateAccount" 
                        component={CreateAccount}
                    />
                </Stack.Group>
            ) : (
                <Stack.Group screenOptions={{ headerShown: false}}>
                    {/* Home Stack */}
                    <Stack.Screen 
                        name="Home" 
                        component={Home}
                    />
                    {/* Orders Stack */}
                    <Stack.Screen 
                        name="Orders" 
                        component={Orders} 
                    />
                    {/* Waybill Stack */}
                    <Stack.Screen 
                        name="Waybill" 
                        component={Waybill} 
                    />
                    {/* Chat stack, requires chat id and chat type === order || waybill */}
                    <Stack.Screen 
                        name="Chat" 
                        component={Chat} 
                    />
                    {/* order details screen */}
                    <Stack.Screen 
                        name="OrderDetails" 
                        component={OrderDetails} 
                    />
                    {/* WaybillDetails screen */}
                    <Stack.Screen 
                        name="WaybillDetails" 
                        component={WaybillDetails} 
                    />
                    {/* TransferDetails screen */}
                    <Stack.Screen 
                        name="TransferDetails" 
                        component={TransferDetails} 
                    />
                    {/* View Image stack */}
                    <Stack.Screen 
                        name="ViewImage" 
                        component={ViewImage} 
                    />
                    {/* Inventory stack */}
                    <Stack.Screen 
                        name="Inventory" 
                        component={Inventory} 
                    />
                    {/* Products stack */}
                    <Stack.Screen 
                        name="Products" 
                        component={Products} 
                    />
                    {/* Add Product stack */}
                    <Stack.Screen 
                        name="AddProduct" 
                        component={AddProduct} 
                    />
                    {/* Edit Product stack */}
                    <Stack.Screen 
                        name="EditProduct" 
                        component={EditProduct} 
                    />
                    {/* Import Inventory stack */}
                    <Stack.Screen 
                        name="ImportInventory" 
                        component={ImportInventory} 
                    />
                    {/* Add Logistics stack */}
                    <Stack.Screen 
                        name="AddLogistics" 
                        component={AddLogistics} 
                    />
                    {/* Logistics Details stack */}
                    <Stack.Screen
                        name="LogisticsDetails" 
                        component={LogisticsDetails} 
                    />
                    {/* Available Locations stack */}
                    <Stack.Screen 
                        name="AvailableLocations" 
                        component={AvailableLocations} 
                    />
                    {/* Locations stack */}
                    <Stack.Screen 
                        name="Locations" 
                        component={Locations} 
                    />
                    {/* AddLocations stack */}
                    <Stack.Screen 
                        name="AddLocation" 
                        component={AddLocation} 
                    />
                    {/* AddLocations stack */}
                    <Stack.Screen 
                        name="EditLocation" 
                        component={EditLocation} 
                    />
                    {/* Reviews stack */}
                    <Stack.Screen 
                        name="Reviews" 
                        component={Reviews} 
                    />
                    {/* Company Policy stack */}
                    <Stack.Screen 
                        name="BusinessPolicy" 
                        component={BusinessPolicy} 
                    />
                    {/* Account stack */}
                    <Stack.Screen 
                        name="Account" 
                        component={Account} 
                    />
                    {/* Capture Image stack */}
                    <Stack.Screen 
                        name="CaptureImage" 
                        component={CaptureImage} 
                    />
                    {/* Profile stack */}
                    <Stack.Screen 
                        name="Profile" 
                        component={Profile} 
                    />
                    {/* BusinessSettings stack */}
                    <Stack.Screen 
                        name="BusinessSettings" 
                        component={BusinessSettings} 
                    />
                    {/* Analytics stack */}
                    <Stack.Screen 
                        name="Analytics" 
                        component={Analytics} 
                    />
                    {/* Logistics Analytics stack */}
                    <Stack.Screen 
                        name="BusinessAnalytics" 
                        component={BusinessAnalytics} 
                    />
                    {/* Location Analytics stack */}
                    <Stack.Screen 
                        name="LocationAnalytics" 
                        component={LocationAnalytics} 
                    />
                    {/* Product Analytics stack */}
                    <Stack.Screen 
                        name="ProductAnalytics" 
                        component={ProductAnalytics} 
                    />
                    {/* Generate Business Report Stack */}
                    <Stack.Screen 
                        name="GenerateBusinessReport" 
                        component={GenerateBusinessReport} 
                    />
                    {/* Team stack */}
                    <Stack.Screen 
                        name="TeamMembers" 
                        component={TeamMembers} 
                    />
                    {/* logistics stack */}
                    <Stack.Screen 
                        name="Logistics" 
                        component={Logistics} 
                    />
                    {/* merchants stack */}
                    <Stack.Screen 
                        name="Merchants" 
                        component={Merchants} 
                    />
                    {/* About Logistics stack */}
                    <Stack.Screen 
                        name="AboutLogistics" 
                        component={AboutLogistics} 
                    />
                    {/* About Merchant stack */}
                    <Stack.Screen 
                        name="AboutMerchant" 
                        component={AboutMerchant} 
                    />
                    {/* security stack */}
                    <Stack.Screen 
                        name="Security" 
                        component={Security} 
                    />
                    {/* Notifications stack */}
                    <Stack.Screen 
                        name="Notifications" 
                        component={Notifications}
                    />
                    {/* Share stack */}
                    <Stack.Screen 
                        name="Share" 
                        component={Share}
                    />
                    {/* Write Review stack */}
                    <Stack.Screen 
                        name="WriteReview" 
                        component={WriteReview}
                    />
                    {/* send order stack */}
                    <Stack.Screen 
                        name="SendOrder" 
                        component={SendOrder}
                    />
                    {/* send pick uo and delivery stack */}
                    <Stack.Screen 
                        name="PickupDelivery" 
                        component={PickupDelivery}
                    />
                    {/* send waybill stack */}
                    <Stack.Screen 
                        name="SendWaybill" 
                        component={SendWaybill}
                    />
                    {/* Warehouse stack */}
                    <Stack.Screen 
                        name="Warehouse" 
                        component={Warehouse}
                    />
                    {/* AddWarehosue stack */}
                    <Stack.Screen 
                        name="AddWarehouse" 
                        component={AddWarehouse}
                    />
                    {/* EditWarehosue stack */}
                    <Stack.Screen 
                        name="EditWarehouse" 
                        component={EditWarehouse}
                    />
                    {/* StockTransfer stack */}
                    <Stack.Screen 
                        name="StockTransfer" 
                        component={StockTransfer}
                    />
                    {/* StockTransferProducts stack */}
                    <Stack.Screen 
                        name="StockTransferProducts" 
                        component={StockTransferProducts}
                    />
                    {/* StockTransferProducts stack */}
                    <Stack.Screen 
                        name="StockTransferSummary" 
                        component={StockTransferSummary}
                    />
                </Stack.Group>
            )}
        </Stack.Navigator>
    )
}

export default Navigator