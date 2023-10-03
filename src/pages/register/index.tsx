import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Button, StyleSheet} from 'react-native';
import {defaultAppTheme, defaultTextApp} from '@global';

const Register = ({navigation}: any): JSX.Element => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.title}>Tela de cadastro</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: defaultAppTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...defaultTextApp
  }
});

export default Register;
