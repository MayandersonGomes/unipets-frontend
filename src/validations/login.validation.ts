import yup from '@global/yup';
import { requiredField } from '@global/index';

export const loginScheme = yup.object({
  email: yup
    .string()
    .trim()
    .required(requiredField)
    .fullEmail('false'),
  password: yup
    .string()
    .trim()
    .required(requiredField)
    .min(8, 'Senha deve conter no mínimo 8 caracteres.'),
});