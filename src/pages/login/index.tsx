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
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import {defaultThemeApp, defaultButtonApp, defaultTextApp} from '../../Global';
import StyledTextInput from '@components/TextInput';
import logo from '@images/sets/Unipets.png';
import greenCheck from '@images/check/green-check.png';
import redCheck from '@images/check/red-check.png';
import eye from '@images/eye/eye.png';
import closedEye from '@images/eye/closed-eye.png';
import {loginScheme} from '@validations/login.validation';
import {createConfig} from '@services/api';

const Login = (): JSX.Element => {
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
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const signIn = (data: any) => {
    const config = createConfig('post', 'users/auth', null, data);
    axios(config).then(response => {
      return Alert.alert(response.data.message);
    }).catch(error => {
      const message = error.response.data.message;
      if (message && error.response.status === 401) {
        return Alert.alert(message);
      }

      return Alert.alert('Erro ao realizar login!');
    });
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
            onPress={handleSubmit(signIn)}>
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

export default Login;
