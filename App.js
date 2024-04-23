import 'react-native-gesture-handler'; //required import for bottomsheet to function
// react hooks
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
// components
import BottomNavigation from './components/BottomNavigation';
import Toast from './components/Toast';
import BottomSheetScreen from './components/BottomSheetScreen';
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
// sql lite
import { SQLiteProvider } from 'expo-sqlite/next';

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

    return (
        // Safe area provider
        <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
            {/* // navigation container */}
            <NavigationContainer>
                {/* provides authentication function and variables to the whole software */}
                <AuthProvider>
                    {/* sql provider */}
                    <SQLiteProvider  databaseName="komitex.db" onInit={migrateDbIfNeeded}>
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
                                    <BottomSheetScreen />
                                    <BottomNavigation />
                                </BottomSheetModalProvider>
                            </GestureHandlerRootView>
                        </AppProvider>
                    </SQLiteProvider>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

async function migrateDbIfNeeded(db) {
    try {
        
        const DATABASE_VERSION = 1;
        let { user_version: currentDbVersion } = await db.getFirstAsync(
            'PRAGMA user_version'
        );
        if (currentDbVersion >= DATABASE_VERSION) {
            return;
        }
        if (currentDbVersion === 0) {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS users (
                    id STRING PRIMARY KEY NOT NULL,
                    active_user BOOLEAN NOT NULL,
                    admin BOOLEAN NOT NULL,
                    created_at DATETIME NOT NULL,
                    email TEXT NOT NULL,
                    deactivated BOOLEAN NOT NULL,
                    full_name TEXT NOT NULL,
                    phone TEXT NULL,
                    profile_image TEXT NULL,
                    role TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS locations (
                    id STRING PRIMARY KEY NOT NULL,
                    delivery_charge FLOAT NOT NULL,
                    region TEXT NOT NULL,
                    state TEXT NOT NULL,
                    warehouse_id TEXT NOT NULL,
                    warehouse_name TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS business_policies (
                    id STRING PRIMARY KEY NOT NULL,
                    additional_policy TEXT NULL,
                    failed_delivery_percentage TEXT NULL, 
                    max_inactive_inventory TEXT NULL, 
                    max_remittance_duration TEXT NULL
                );
            `);
            currentDbVersion = 1;
        }
        // if (currentDbVersion === 1) {
        //   Add more migrations
        // }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        console.log("DB SETUP ERROR:", error.message)
    }
}

AppRegistry.registerComponent('MyApp', () => App);