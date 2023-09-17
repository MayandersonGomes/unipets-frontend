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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  defaultThemeApp,
  defaultButtonApp,
  defaultInputApp,
  defaultTextApp,
} from './Global';
import StyledTextInput from './TextInput';
import SplashScreen from 'react-native-splash-screen';
import logo from './assets/images/sets/Unipets.png';
import check from './assets/images/check/check.png';
import eye from './assets/images/eye/eye.png';

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
          <Image source={logo} style={styles.logo} />

          <View style={{width: '100%', gap: 12}}>
            <StyledTextInput label={'E-mail'} image={check} />
            <StyledTextInput label={'Senha'} image={eye} secure={true} />
            <Text style={{...defaultTextApp, textAlign: 'right'}}>
              Esqueceu sua senha?
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={{...defaultTextApp, fontSize: 18}}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signup}>
            <Text style={defaultTextApp}>Ainda não tem conta?</Text>
            <Text style={{...defaultTextApp, color: '#F4516C'}}>
              Cadastre-se
            </Text>
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
  input: {
    color: '#ffffff',
    backgroundColor: 'red',
    flex: 1,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
});

export default App;
