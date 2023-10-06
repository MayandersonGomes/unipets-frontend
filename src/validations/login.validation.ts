import * as yup from 'yup';
import { trimString } from '@global';

export const loginScheme = yup.object({
  email: yup
    .string()
    .transform(trimString)
    .required('Informe seu e-mail')
    .email('false'),
  password: yup
    .string()
    .transform(trimString)
    .required('Informe sua senha')
    .min(8, 'Senha deve conter no mínimo 8 caracteres.'),
});