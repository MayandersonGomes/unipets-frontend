import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerScheme} from '@validations/register.validation';
import {defaultAppTheme, defaultAlignment, defaultTextApp} from '@global';
import DynamicFields from '@components/DynamicFields';
import StyledButton from '@components/Button';
import CheckBox from '@images/check/checkbox.png';
import {IFields} from '@interfaces/DynamicFields.interface';

const Register = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerScheme),
    mode: 'all',
    defaultValues: {
      password: ''
    }
  });

  const signup = () => {
    setTimeout(() => {
      Alert.alert("RETORNO DA API")
    }, 2000)
  };

  const fields: IFields[] = [
    {name: 'name', label: 'Nome'},
    {name: 'cpf', label: 'CPF'},
    {name: 'birthday', label: 'Data de nascimento'},
    {name: 'email', label: 'Email'},
    {name: 'confirmEmail', label: 'Confirmar email'},
    {name: 'password', label: 'Senha', secure: true, help: true, watch: watch},
    {name: 'confirmPassword', label: 'Confirmar senha'},
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <DynamicFields control={control} errors={errors} fields={fields} />

            <View style={styles.termsContainer}>
              <TouchableOpacity
                onPress={() => setAcceptedTerms(!acceptedTerms)}>
                <View style={styles.checkBox}>
                  {acceptedTerms && (
                    <Image source={CheckBox} style={{width: 12, height: 12}} />
                  )}
                </View>
              </TouchableOpacity>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTerms}>
                  Li e estou de acordo com os{' '}
                </Text>

                <TouchableOpacity>
                  <Text
                    style={{
                      ...styles.textTerms,
                      textDecorationLine: 'underline',
                    }}>
                    termos de uso
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <StyledButton
              title={'Cadastrar'}
              handle={handleSubmit}
              submit={signup}
              isLoading={isLoading}
            />
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
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
  form: {
    width: '100%',
    gap: 30,
  },
  termsContainer: {
    gap: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderWidth: 3,
    borderColor: '#F4516C',
    borderRadius: 5,
  },
  textTerms: {
    ...defaultTextApp,
    fontSize: 14,
  },
});

export default Register;
