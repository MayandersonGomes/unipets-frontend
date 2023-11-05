import React, {useEffect, useMemo, useState} from 'react';
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
import SplashScreen from 'react-native-splash-screen';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginScheme} from '@validations/login.validation';
import axios from 'axios';
import {createConfig} from '@services/api';
import {
  primaryColor,
  defaultAlignment,
  defaultTextApp,
  secondaryColor,
} from '@global/index';
import DynamicFields from '@components/DynamicFields';
import StyledButton from '@components/Button';
import logo from '@images/sets/Unipets.png';
import {IFields} from '@interfaces/DynamicFields.interface';
import greenCheck from '@images/check/green-check.png';
import redCheck from '@images/check/red-check.png';
import eye from '@images/eye/eye.png';
import closedEye from '@images/eye/closed-eye.png';
import {showMessage} from 'react-native-flash-message';
import useKeyboard from '@global/keyboard';

const Login: React.FC<any> = ({navigation}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {bottomPadding} = useKeyboard();

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

  const fields: IFields[] = useMemo(
    () => [
      {
        name: 'email',
        label: 'E-mail*',
        firstImage: redCheck,
        lastImage: greenCheck,
        watch: watch,
        capitalize: 'none',
        keyboardType: 'email-address',
      },
      {
        name: 'password',
        label: 'Senha*',
        firstImage: closedEye,
        lastImage: eye,
        secure: true,
        capitalize: 'none',
      },
    ],
    [],
  );

  const signIn = (data: any) => {
    setIsLoading(true);
    const config = createConfig('post', 'users/auth', null, data);
    axios(config)
      .then(() => {
        navigation.navigate('Initial');
      })
      .catch(error => {
        const message =
          error.response?.data.message || 'Erro ao realizar login!';
        showMessage({
          message: message,
          type: 'danger',
          duration: 2500,
          style: {
            alignItems: 'center',
          },
          titleStyle: {
            ...defaultTextApp,
            fontSize: 17,
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={{paddingBottom: bottomPadding}}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: primaryColor,
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
    gap: 25,
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
    color: secondaryColor,
  },
});

export default Login;
