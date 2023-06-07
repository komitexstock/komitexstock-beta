import HomeStack from './stacks/HomeStack';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


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

  return (
    <HomeStack />
  );
}