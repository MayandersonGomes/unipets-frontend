import React, {useEffect, useState} from 'react';
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
import {loginScheme} from '@validations/login.validation';
import axios from 'axios';
import {createConfig} from '@services/api';
import {defaultAppTheme, defaultAlignment, defaultTextApp} from '@global';
import StyledTextInput from '@components/TextInput';
import DynamicFields from '@components/DynamicFields';
import StyledButton from '@components/Button';
import logo from '@images/sets/Unipets.png';
import {IFields} from '@interfaces/DynamicFields.interface';
import greenCheck from '@images/check/green-check.png';
import redCheck from '@images/check/red-check.png';
import eye from '@images/eye/eye.png';
import closedEye from '@images/eye/closed-eye.png';

const Login = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginScheme),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = (data: any) => {
    setIsLoading(true);
    const config = createConfig('post', 'users/auth', null, data);
    axios(config)
      .then(() => {
        navigation.navigate('Initial');
      })
      .catch(error => {
        const message = error.response?.data.message;
        if (message && error.response.status === 401) {
          return Alert.alert(message);
        }
        return Alert.alert('Erro ao realizar login!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fields: IFields[] = [
    {
      name: 'email',
      label: 'E-mail',
      firstImage: redCheck,
      lastImage: greenCheck,
      watch: watch,
    },
    {
      name: 'password',
      label: 'Senha',
      firstImage: closedEye,
      lastImage: eye,
      secure: true,
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />

          <View style={styles.form}>
            <DynamicFields
              control={control}
              errors={errors}
              fields={fields}
            />

            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </View>

          <StyledButton
            title={'Entrar'}
            handle={handleSubmit}
            submit={signIn}
            isLoading={isLoading}
          />

          <View style={styles.signupContainer}>
            <Text style={defaultTextApp}>Ainda não tem conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signup}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: defaultAppTheme,
  },
  container: {
    ...defaultAlignment,
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
