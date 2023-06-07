import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './stacks/HomeStack';
import OrdersStack from './stacks/OrdersStack';
import WaybillStack from './stacks/WaybillStack';
import InventoryStack from './stacks/InventoryStack';
import AccountStack from './stacks/AccountStack';
import BottomNavigation from './components/BottomNavigation';
import AppProvider from './context/AppContext';

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
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen 
            name="Home" 
            component={HomeStack}
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Orders" 
            component={OrdersStack} 
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Waybill" 
            component={WaybillStack} 
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Inventory" 
            component={InventoryStack} 
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Account" 
            component={AccountStack} 
            options={{
              headerShown: false,
            }} 
          />
        </Stack.Navigator>
        <BottomNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}