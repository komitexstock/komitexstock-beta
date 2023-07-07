import 'react-native-gesture-handler'; //required import for bottomsheet to function
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
// orders related stacks
import Orders from './stacks/Orders';
import SendOrder from './stacks/SendOrder';
import Chat from './stacks/Chat';
// waybill related stacks
import Waybill from './stacks/Waybill';
import SendWaybill from './stacks/SendWaybill';
// inventory related stacks
import Inventory from './stacks/Inventory';
import Products from './stacks/Products';
import AddLogistics from './stacks/AddLogistics';
import AddProduct from './stacks/AddProduct';
// account related stacks
import Account from './stacks/Account';
import Profile from './stacks/Profile';
import TeamMembers from './stacks/TeamMembers';
import Logistics from './stacks/Logistics';
import Security from './stacks/Security';
import LogisticsDetails from './stacks/LogisticsDetails';

// components
import BottomNavigation from './components/BottomNavigation';
import AppProvider from './context/AppContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { AppRegistry } from 'react-native';

// colors
import { white } from './style/colors';

export default function App() {

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
        if (fontsLoaded) {
        await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const Stack = createNativeStackNavigator();

    return (
        // navigation container
        <NavigationContainer>
            {/* AppProvider, access to global variables */}
            <AppProvider>
                {/* GestureHandlerRootView required to render bottomsheet */}
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {/* BottomSheetModalProvider required to render bottomsheet */}
                    <BottomSheetModalProvider>
                        {/* custom status bar */}
                        <StatusBar backgroundColor={white} barStyle="light-content" />
                        <Stack.Navigator initialRouteName='Home'>
                            {/* Home Stack */}
                            <Stack.Screen 
                                name="Home" 
                                component={Home}
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Orders Stack */}
                            <Stack.Screen 
                                name="Orders" 
                                component={Orders} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Waybill Stack */}
                            <Stack.Screen 
                                name="Waybill" 
                                component={Waybill} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Chat stack, requires chat id and chat type === order || waybill */}
                            <Stack.Screen 
                                name="Chat" 
                                component={Chat} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Inventory stack */}
                            <Stack.Screen 
                                name="Inventory" 
                                component={Inventory} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Products stack */}
                            <Stack.Screen 
                                name="Products" 
                                component={Products} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Add Products stack */}
                            <Stack.Screen 
                                name="AddProduct" 
                                component={AddProduct} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Add Logistics stack */}
                            <Stack.Screen 
                                name="AddLogistics" 
                                component={AddLogistics} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Logistics Details stack */}
                            <Stack.Screen 
                                name="LogisticsDetails" 
                                component={LogisticsDetails} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Account stack */}
                            <Stack.Screen 
                                name="Account" 
                                component={Account} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Profile stack */}
                            <Stack.Screen 
                                name="Profile" 
                                component={Profile} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Analytics stack */}
                            <Stack.Screen 
                                name="Analytics" 
                                component={Analytics} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* LogisticsAnalytics stack */}
                            <Stack.Screen 
                                name="LogisticsAnalytics" 
                                component={LogisticsAnalytics} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Team stack */}
                            <Stack.Screen 
                                name="TeamMembers" 
                                component={TeamMembers} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* logistics stack */}
                            <Stack.Screen 
                                name="Logistics" 
                                component={Logistics} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* security stack */}
                            <Stack.Screen 
                                name="Security" 
                                component={Security} 
                                options={{
                                headerShown: false,
                                }} 
                            />
                            {/* Notifications stack */}
                            <Stack.Screen 
                                name="Notifications" 
                                component={Notifications}
                                options={{
                                headerShown: false,
                                }}
                            />
                            {/* send order stack */}
                            <Stack.Screen 
                                name="SendOrder" 
                                component={SendOrder}
                                options={{
                                headerShown: false,
                                }}
                            />
                            {/* send waybill stack */}
                            <Stack.Screen 
                                name="SendWaybill" 
                                component={SendWaybill}
                                options={{
                                headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    <BottomNavigation />
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </AppProvider>
        </NavigationContainer>
    );
}

AppRegistry.registerComponent('MyApp', () => App);