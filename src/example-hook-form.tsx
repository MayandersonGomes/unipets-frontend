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
  TextInput,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {defaultThemeApp, defaultButtonApp, defaultTextApp} from './Global';
import StyledTextInput from './TextInput';
import SplashScreen from 'react-native-splash-screen';
import logo from './assets/images/sets/Unipets.png';
import greenCheck from './assets/images/check/green-check.png';
import redCheck from './assets/images/check/red-check.png';
import eye from './assets/images/eye/eye.png';
import closedEye from './assets/images/eye/closed-eye.png';

const schema = yup.object({
  username: yup.string().required("Informe seu username"),
  email: yup.string().email("Email Invalido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

const App = (): JSX.Element => {
  const { control, handleSubmit, watch, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
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

          <View style={{width: "100%", gap: 20}}>
            <Controller
              control={control}
              name={'username'}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={{
                    width: '100%',
                    height: 60,
                    padding: 10,
                    backgroundColor: 'aqua',
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#ff375b"
                  }}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Seu username'}
                />
              )}
            />
            {errors.username && <Text style={{color: "white"}}>{errors.username?.message}</Text>}

            <Controller
              control={control}
              name={'email'}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={{
                    width: '100%',
                    height: 60,
                    padding: 10,
                    backgroundColor: 'aqua',
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#ff375b"
                  }}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Seu email'}
                />
              )}
            />
            {errors.email && <Text style={{color: "white"}}>{errors.email?.message}</Text>}

            <Controller
              control={control}
              name={'password'}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={{
                    width: '100%',
                    height: 60,
                    padding: 10,
                    backgroundColor: 'aqua',
                    borderWidth: errors.password && 1,
                    borderColor: errors.password && "#ff375b"
                  }}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Sua senha'}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && <Text style={{color: "white"}}>{errors.password?.message}</Text>}

          </View>

          <View style={styles.inputContainer}>
            <StyledTextInput
              label={'E-mail'}
              image={{firstImage: redCheck, lastImage: redCheck}}
              email={true}
            />
            <StyledTextInput
              label={'Senha'}
              image={{firstImage: closedEye, lastImage: eye}}
              secure={true}
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
  inputContainer: {
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
