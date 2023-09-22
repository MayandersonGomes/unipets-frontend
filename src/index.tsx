import React, {useRef, useEffect, useState} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  defaultThemeApp,
  defaultButtonApp,
  defaultTextApp,
  defaultInputApp,
} from './Global';
import StyledTextInput from './TextInput';
import SplashScreen from 'react-native-splash-screen';
import logo from './assets/images/sets/Unipets.png';
import greenCheck from './assets/images/check/green-check.png';
import redCheck from './assets/images/check/red-check.png';
import eye from './assets/images/eye/eye.png';
import closedEye from './assets/images/eye/closed-eye.png';

const schema = yup.object({
  email: yup.string().email().required("O email é obrigatório"),
  password: yup
    .string()
    .test(
      'special-character',
      'A senha deve conter pelo menos um caractere especial',
      (value) => {
        if (value) {
          return /[!@#$%^&*(),.?":{}|<>]/.test(value);
        }
      }
    )
    .test(
      'uppercase-letter',
      'A senha deve conter pelo menos uma letra maiúscula',
      (value) => {
        if (value) {
          return /[A-Z]/.test(value);
        }
      }
    )
    .test(
      'uppercase-letter',
      'A senha deve conter pelo menos uma letra minúscula',
      (value) => {
        if (value) {
          return /[a-z]/.test(value);
        }
      }
    )
    .test(
      'number',
      'A senha deve conter pelo menos um número',
      (value) => {
        if (value) {
          return /[0-9]/.test(value);
        }
      }
    )
    .min(8, 'A senha deve ter pelo menos 8 dígitos')
    .required("A senha é obrigatória"),
});

const App = (): JSX.Element => {
  const [isSecure, setIsSecure] = useState(true);
  const refEmail = useRef<TextInput | null>(null);
  const refPassword = useRef<TextInput | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
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
            <TouchableWithoutFeedback
            onPress={() => refEmail.current?.focus()}>
              <View style={[styles.inputContainer, errors.email && {borderColor: "#F4516C", borderWidth: 1}]}>
                <View style={{flex: 1}}>
                  <Controller
                    control={control}
                    name={'email'}
                    render={({field: {onChange, value}}) => (
                      <TextInput
                        ref={refEmail}
                        style={styles.input}
                        autoCapitalize={'none'}
                        autoComplete={'email'}
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        onChangeText={onChange}
                        value={value}
                        placeholder={'E-mail'}
                        placeholderTextColor={"#797979"}
                      />
                    )}
                  />
                </View>

                {watch('email') !== '' &&
                  (errors.email ? (
                    <Image
                      source={redCheck}
                      style={styles.imageCheck}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={greenCheck}
                      style={styles.imageCheck}
                      resizeMode="contain"
                    />
                  ))}
              </View>
            </TouchableWithoutFeedback>
            
            {errors.email && (
              <Text style={{color: '#FFFFFF', paddingLeft: 5}}>{errors.email.message}</Text>
            )}

            <TouchableWithoutFeedback
              onPress={() => refPassword.current?.focus()}>
              <View style={[styles.inputContainer, errors.password && {borderColor: "#F4516C", borderWidth: 1}]}>
                <View style={{flex: 1}}>
                  <Controller
                    control={control}
                    name={'password'}
                    render={({field: {onChange, value}}) => (
                      <TextInput
                        ref={refPassword}
                        style={styles.input}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={isSecure}
                        placeholder={'Senha'}
                        placeholderTextColor={"#797979"}
                      />
                    )}
                  />
                </View>

                <TouchableWithoutFeedback
                  onPress={() => setIsSecure(!isSecure)}>
                  <View>
                    <Image
                      source={isSecure ? closedEye : eye}
                      style={styles.imagePassword}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>

            {errors.password && (
              <Text style={{color: '#FFFFFF', paddingLeft: 5}}>{errors.password.message}</Text>
            )}

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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultInputApp,
    height: 55,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 7,
    gap: 20,
  },
  label: {
    ...defaultTextApp,
    color: '#797979',
    fontSize: 13,
  },
  input: {
    color: '#ffffff',
    ...defaultTextApp,
    fontSize: 15,
  },
  imageCheck: {
    width: 20,
    height: 20,
  },
  imagePassword: {
    width: 22,
    height: 22,
  },
});

export default App;
