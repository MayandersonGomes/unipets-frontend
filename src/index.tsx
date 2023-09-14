/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';


export const defaultThemeApp = "#171717";

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: defaultThemeApp}}>
      <StatusBar barStyle={'light-content'}/>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      </View>
    </SafeAreaView>
  );
}

export default App;