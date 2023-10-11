import 'react-native-gesture-handler'; //required import for bottomsheet to function
// react hooks
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// STACKS
// Home related stacks 
import Home from './stacks/Home';
import Notifications from './stacks/Notifications';
// Analytics related stacks
import Analytics from './stacks/Analytics';
import LogisticsAnalytics from './stacks/LogisticsAnalytics';
import LocationAnalytics from './stacks/LocationAnalytics';
import ProductAnalytics from './stacks/ProductAnalytics';
import GenerateBusinessReport from './stacks/GenerateBusinessReport';
// orders related stacks
import Orders from './stacks/Orders';
// send order for pick up and delivery
import PickupDelivery from './stacks/PickupDelivery';
// send order by merchant
import SendOrder from './stacks/SendOrder';
// waybill related stacks
import Waybill from './stacks/Waybill';
import SendWaybill from './stacks/SendWaybill';
// chat
import Chat from './stacks/Chat';
// inventory related stacks
import Inventory from './stacks/Inventory';
import Products from './stacks/Products';
import AddLogistics from './stacks/AddLogistics';
import AvailableLocations from './stacks/AvailableLocations';
import AddProduct from './stacks/AddProduct';
import ImportInventory from './stacks/ImportInventory';
// warehouse related stacks
import Warehouse from './stacks/Warehouse';
// account related stacks
import Account from './stacks/Account';
import Profile from './stacks/Profile';
import TeamMembers from './stacks/TeamMembers';
import Logistics from './stacks/Logistics';
import Security from './stacks/Security';
// others stacks
import DeactivateLogistics from './stacks/DeactivateLogistics';
import LogisticsDetails from './stacks/LogisticsDetails';
import Reviews from './stacks/Reviews';
import CompanyPolicy from './stacks/CompanyPolicy';
import CaptureImage from './stacks/CaptureImage';
import WriteReview from './stacks/WriteReview';
import ViewImage from './stacks/ViewImage';
import Share from './stacks/Share';
// no session stacks
import Login from './stacks/Login';
import OnBoarding from './stacks/OnBoarding';
import CreateAccount from './stacks/CreateAccount';
// components
import BottomNavigation from './components/BottomNavigation';
// context
import AuthProvider from './context/AuthContext';
import AppProvider from './context/AppContext';
// bottom sheet components
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// react native component
import { StatusBar, AppRegistry } from 'react-native';
// colors
import { white } from './style/colors';
// react safe area provider
import { SafeAreaProvider } from 'react-native-safe-area-context';
// context
import { useAuth } from './context/AuthContext';

export default function App() {
    
    // get Auth data
    const {authData, loading} = useAuth();

    // declare fonts 
    const [fontsLoaded] = useFonts({
        'mulish-regular': require('./assets/fonts/Mulish-Regular.ttf'),
        'mulish-medium': require('./assets/fonts/Mulish-Medium.ttf'),
        'mulish-semibold': require('./assets/fonts/Mulish-SemiBold.ttf'),
        'mulish-bold': require('./assets/fonts/Mulish-Bold.ttf'),
        'mulish-extrabold': require('./assets/fonts/Mulish-ExtraBold.ttf'),
    });

    //   function to load font
    const onLayoutRootView = useCallback(async () => {
        // wait fpr font and authData to finish loading
        if (fontsLoaded && !loading) {
            // remove splash screen
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const Stack = createNativeStackNavigator();

    const initialRouteName = "Home";


    return (
        // Safe area provider
        <SafeAreaProvider>
            {/* // navigation container */}
            <NavigationContainer>
                {/* provides authentication function and variables to the whole software */}
                <AuthProvider>
                    {/* AppProvider, access to global variables */}
                    <AppProvider>
                        {/* GestureHandlerRootView required to render bottomsheet */}
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            {/* BottomSheetModalProvider required to render bottomsheet */}
                            <BottomSheetModalProvider>
                                {/* custom status bar */}
                                <StatusBar backgroundColor={white} barStyle="dark-content" />
                                {/* barStyle 
                                    "light-content": Sets the status bar style to light content, 
                                    which is usually used when the status bar background color is darker. 
                                    "dark-content": Sets the status bar style to dark content, which is usually used when the status bar background color is lighte
                                */}
                                <Stack.Navigator 
                                    initialRouteName={initialRouteName}
                                >
                                    {authData === null ? (
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
                                            {/* Add Products stack */}
                                            <Stack.Screen 
                                                name="AddProduct" 
                                                component={AddProduct} 
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
                                            {/* Reviews stack */}
                                            <Stack.Screen 
                                                name="Reviews" 
                                                component={Reviews} 
                                            />
                                            {/* Company Policy stack */}
                                            <Stack.Screen 
                                                name="CompanyPolicy" 
                                                component={CompanyPolicy} 
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
                                            {/* Analytics stack */}
                                            <Stack.Screen 
                                                name="Analytics" 
                                                component={Analytics} 
                                            />
                                            {/* Logistics Analytics stack */}
                                            <Stack.Screen 
                                                name="LogisticsAnalytics" 
                                                component={LogisticsAnalytics} 
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
                                            {/* Deactivate Logistics stack */}
                                            <Stack.Screen 
                                                name="DeactivateLogistics" 
                                                component={DeactivateLogistics} 
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
                                        </Stack.Group>
                                    )}
                                </Stack.Navigator>
                                <BottomNavigation />
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </AppProvider>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

AppRegistry.registerComponent('MyApp', () => App);