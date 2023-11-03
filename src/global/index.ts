import { TextStyle } from 'react-native';
import { IAlignment } from '@interfaces/global.interface'

export const primaryColor: string = '#171717';
export const secondaryColor: string = '#F4516C';
export const defaultInputColor: string = '#474444';

export const defaultAlignment: IAlignment = {
  alignItems: 'center',
  marginHorizontal: 20,
}

export const defaultTextApp: TextStyle = {
  fontSize: 15,
  fontFamily: 'Poppins-Medium',
  color: '#ffffff',
};

export const messageError: TextStyle = {
  color: secondaryColor,
  paddingLeft: 5,
}

export const requiredField = "Não se esqueça de preencher este campo"