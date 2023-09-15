/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import image from './assets/images/sets/Unipets.png';


export const defaultThemeApp: string = '#171717';
export const defaultButtonApp: string = '#F4516C';
export const defaultInputApp: string = '#1F1F1F';

export const defaultTextApp: TextStyle = {
  fontSize: 15,
  fontFamily: 'Poppins-Regular',
  color: '#ffffff',
};

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
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView>
        <View style={styles.container}>
          <Image source={image} style={styles.logo} />

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />

            <Text style={{...defaultTextApp, textAlign: 'right'}}>Esqueceu sua senha?</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={{...defaultTextApp, fontSize: 18}}>Entrar</Text>
          </TouchableOpacity>
          
          <View style={styles.signup}>
            <Text style={defaultTextApp}>Ainda não tem conta?</Text>
            <Text style={{...defaultTextApp, color: "#9F132E"}}>Cadastre-se</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: defaultThemeApp,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 100,
    marginBottom: 30,
    gap: 50,
  },
  logo: {
    width: 160,
    height: 160,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
  input: {
    height: 60,
    backgroundColor: defaultInputApp,
    borderRadius: 7,
    color: "#ffffff",
    padding: 20,
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 50,
    fontFamily: 'Arial',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultButtonApp,
    borderRadius: 7,
  },
  signup: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  }
});

export default App;