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
import AddWarehouse from './stacks/AddWarehouse';
import EditWarehouse from './stacks/EditWarehouse';
import StockTransfer from './stacks/StockTransfer';
import StockTransferProducts from './stacks/StockTransferProducts';
import StockTransferSummary from './stacks/StockTransferSummary';
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
// navigator
import Navigator from './router/Navigator';

export default function App() {
    
    // get Auth data   
    const { authData, loading } = useAuth();

    // console.log("Auth Data: ", authData);

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
                                <Navigator />
                                
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