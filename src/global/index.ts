import { TextStyle } from 'react-native';
import { IAlignment } from '@interfaces/global.interface'

export const defaultAppTheme: string = '#171717';
export const defaultButtonColor: string = '#F4516C';
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

export const trimString = (value: string) => value.trim();

export const requiredField = "Não se esqueça de preencher este campo"