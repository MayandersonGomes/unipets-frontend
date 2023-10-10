import * as yup from 'yup';
import { trimString, requiredField } from '@global';

export const loginScheme = yup.object({
  email: yup
    .string()
    .transform(trimString)
    .required(requiredField)
    .email('false'),
  password: yup
    .string()
    .transform(trimString)
    .required(requiredField)
    .min(8, 'Senha deve conter no mínimo 8 caracteres.'),
});