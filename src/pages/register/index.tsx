import React, {useMemo, useState} from 'react';
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
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerScheme} from '@validations/register.validation';
import {primaryColor, defaultAlignment, defaultInputColor} from '@global';
import DynamicFields from '@components/DynamicFields';
import StyledButton from '@components/Button';
import StyledTermsOfUse from '@components/TermsOfUse';
import {IFields} from '@interfaces/DynamicFields.interface';
import closedEye from '@images/eye/closed-eye.png';
import eye from '@images/eye/eye.png';
import Camera from '@images/camera/camera.png';
import DefaultPhoto from '@images/default-photo.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Masks} from 'react-native-mask-input';

const Register = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState(DefaultPhoto);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerScheme),
    mode: 'all',
    defaultValues: {
      password: '',
      termsOfUse: false,
    },
  });

  const fields: IFields[] = useMemo(
    () => [
      {name: 'name', label: 'Nome*', capitalize: 'words'},
      {
        name: 'cpf',
        label: 'CPF*',
        mask: Masks.BRL_CPF,
        keyboardType: 'number-pad',
      },
      {
        name: 'birthday',
        label: 'Data de nascimento*',
        mask: Masks.DATE_DDMMYYYY,
        keyboardType: 'number-pad',
      },
      {
        name: 'email',
        label: 'Email*',
        capitalize: 'none',
        keyboardType: 'email-address',
      },
      {
        name: 'confirmEmail',
        label: 'Confirmar email*',
        capitalize: 'none',
        keyboardType: 'email-address',
      },
      {
        name: 'password',
        label: 'Senha*',
        firstImage: closedEye,
        lastImage: eye,
        secure: true,
        help: true,
        capitalize: 'none',
      },
      {
        name: 'confirmPassword',
        label: 'Confirmar senha*',
        firstImage: closedEye,
        lastImage: eye,
        secure: true,
        capitalize: 'none',
      },
    ],
    [],
  );

  const signup = () => {
    Alert.alert('RETORNO DA API');
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleImageUser}
                style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={typeof image === 'string' ? {uri: image} : image}
                />

                <View style={styles.cameraContainer}>
                  <Image
                    style={styles.camera}
                    resizeMode="contain"
                    source={Camera}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <DynamicFields control={control} errors={errors} fields={fields} />

            <Controller
              control={control}
              name={'termsOfUse'}
              render={({field: {onChange, value, name}}) => (
                <StyledTermsOfUse
                  onChange={onChange}
                  value={value}
                  errors={errors}
                  name={name}
                />
              )}
            />

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
    backgroundColor: primaryColor,
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
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: defaultInputColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  cameraContainer: {
    backgroundColor: 'gray',
    width: 45,
    height: 45,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  camera: {
    width: 25,
    height: 18,
  },
});

export default Register;
