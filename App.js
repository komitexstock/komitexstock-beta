import 'react-native-gesture-handler'; //required import for bottomsheet to function
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// stacks
import Home from './stacks/Home';
import Orders from './stacks/Orders';
import Waybill from './stacks/Waybill';
import Inventory from './stacks/Inventory';
import Account from './stacks/Account';
import Notifications from './stacks/Notifications';
import SendOrder from './stacks/SendOrder';
import SendWaybill from './stacks/SendWaybill';
import Profile from './stacks/Profile';
import Analytics from './stacks/Analytics';
import Team from './stacks/Team';
import Logistics from './stacks/Logistics';
import Security from './stacks/Security';
import Chat from './stacks/Chat';
import Products from './stacks/Products';

// components
import BottomNavigation from './components/BottomNavigation';
import AppProvider from './context/AppContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { AppRegistry } from 'react-native';

export default function App() {

  const [fontsLoaded] = useFonts({
    'mulish-regular': require('./assets/fonts/Mulish-Regular.ttf'),
    'mulish-italic': require('./assets/fonts/Mulish-Italic.ttf'),
    'mulish-light': require('./assets/fonts/Mulish-Light.ttf'),
    'mulish-semibold': require('./assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold': require('./assets/fonts/Mulish-Bold.ttf'),
  });

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
    <NavigationContainer>
     <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Orders" 
                component={Orders} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Waybill" 
                component={Waybill} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Chat" 
                component={Chat} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Inventory" 
                component={Inventory} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Products" 
                component={Products} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Account" 
                component={Account} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Analytics" 
                component={Analytics} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Team" 
                component={Team} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Logistics" 
                component={Logistics} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Security" 
                component={Security} 
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Notifications" 
                component={Notifications}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="SendOrder" 
                component={SendOrder}
                options={{
                  headerShown: false,
                }}
              />
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