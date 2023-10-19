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
import {
  defaultAppTheme,
  defaultAlignment,
  defaultTextApp,
  defaultInputColor,
} from '@global';
import DynamicFields from '@components/DynamicFields';
import StyledButton from '@components/Button';
import {IFields} from '@interfaces/DynamicFields.interface';
import CheckBox from '@images/check/checkbox.png';
import closedEye from '@images/eye/closed-eye.png';
import eye from '@images/eye/eye.png';
import Camera from '@images/camera/camera.png';
import DefaultPhoto from '@images/default-photo.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Register = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [image, setImage] = useState(DefaultPhoto);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerScheme),
    mode: 'all',
    defaultValues: {
      password: '',
    },
  });

  const signup = () => {
    setTimeout(() => {
      Alert.alert('RETORNO DA API');
    }, 2000);
  };

  const fields: IFields[] = [
    {name: 'name', label: 'Nome*'},
    {name: 'cpf', label: 'CPF*'},
    {name: 'birthday', label: 'Data de nascimento*'},
    {name: 'email', label: 'Email*'},
    {name: 'confirmEmail', label: 'Confirmar email*'},
    {
      name: 'password',
      label: 'Senha*',
      firstImage: closedEye,
      lastImage: eye,
      secure: true,
      help: true,
      watch: watch,
    },
    {name: 'confirmPassword', label: 'Confirmar senha*'},
  ];

  const pickImageFromGalery = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (result?.assets) {
        setImage(result.assets[0].uri!);
      }
    } catch (error) {
      Alert.alert('Erro ao selecionar imagem da galeria');
      console.log('Erro ao utilizar a galeria:', error);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      if (result?.assets) {
        setImage(result.assets[0].uri!);
      }
    } catch (error) {
      Alert.alert('Erro ao selecionar imagem da câmera');
      console.log('Erro ao utilizar a câmera:', error);
    }
  };

  const handleImageUser = () => {
    Alert.alert(
      'Seleção de Foto de Perfil',
      'Escolha de onde deseja adicionar sua foto de perfil',
      [
        {
          text: 'Galeria',
          onPress: () => pickImageFromGalery(),
          style: 'default',
        },
        {
          text: 'Câmera',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
        {
          text: 'Cancelar',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TouchableOpacity
              onPress={handleImageUser}
              style={{alignItems: 'center'}}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: defaultInputColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: '100%', height: '100%', borderRadius: 100}}
                  source={typeof image === 'string' ? {uri: image} : image}
                />

                <View
                  style={{
                    backgroundColor: 'gray',
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}>
                  <Image
                    style={{
                      width: 25,
                      height: 18,
                    }}
                    resizeMode="contain"
                    source={Camera}
                  />
                </View>
              </View>
            </TouchableOpacity>

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
    marginVertical: 30,
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
