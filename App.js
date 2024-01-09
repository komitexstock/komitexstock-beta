import 'react-native-gesture-handler'; //required import for bottomsheet to function
// react hooks
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// components
import BottomNavigation from './components/BottomNavigation';
import Toast from './components/Toast';
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
import { SafeAreaView } from 'react-native';
// navigator
import Navigator from './router/Navigator';

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
        // wait fpr font and authData to finish loading
        if (fontsLoaded) {
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
        <SafeAreaView style={{flex: 1}}>
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
                                <Toast />
                                <Navigator />
                                <BottomNavigation />
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </AppProvider>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

AppRegistry.registerComponent('MyApp', () => App);