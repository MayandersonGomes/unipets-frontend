import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  defaultThemeApp,
  defaultButtonApp,
  defaultTextApp,
} from './Global';
import StyledTextInput from './TextInput';
import SplashScreen from 'react-native-splash-screen';
import logo from './assets/images/sets/Unipets.png';
import greenCheck from './assets/images/check/green-check.png';
import redCheck from './assets/images/check/red-check.png';
import eye from './assets/images/eye/eye.png';
import closedEye from './assets/images/eye/closed-eye.png';
import {loginScheme} from './validations/login.validation';

const App = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const handleSignIn = (data: any) => {
    console.log('data', data);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />

          <View style={styles.form}>
            <Controller
              control={control}
              name={'email'}
              render={({field: {onChange, value}}) => (
                <StyledTextInput
                  onChange={onChange}
                  value={value}
                  watch={watch('email')}
                  errors={errors}
                  name={'email'}
                  images={{firstImage: redCheck, lastImage: greenCheck}}
                  label={'E-mail'}
                />
              )}
            />

            <Controller
              control={control}
              name={'password'}
              render={({field: {onChange, value}}) => (
                <StyledTextInput
                  onChange={onChange}
                  value={value}
                  errors={errors}
                  name={'password'}
                  images={{firstImage: closedEye, lastImage: eye}}
                  label={'Senha'}
                  secure
                />
              )}
            />

            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignIn)}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={defaultTextApp}>Ainda não tem conta?</Text>
            <Text style={styles.signup}>Cadastre-se</Text>
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
  form: {
    width: '100%',
    gap: 12,
  },
  forgotPassword: {
    ...defaultTextApp,
    textAlign: 'right',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultButtonApp,
    borderRadius: 7,
  },
  textButton: {
    ...defaultTextApp,
    fontSize: 18,
  },
  signupContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  signup: {
    ...defaultTextApp,
    color: '#F4516C',
  },
});

export default App;
