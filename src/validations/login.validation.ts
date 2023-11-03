import * as yup from 'yup';
import { requiredField } from '@global';

export const loginScheme = yup.object({
  email: yup
    .string()
    .trim()
    .required(requiredField)
    .email('false'),
  password: yup
    .string()
    .trim()
    .required(requiredField)
    .min(8, 'Senha deve conter no mínimo 8 caracteres.'),
});