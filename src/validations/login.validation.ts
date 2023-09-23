import * as yup from 'yup';

export const loginScheme = yup.object({
  email: yup
    .string()
    .required('Informe seu e-mail')
    .email('false'),
  password: yup
    .string()
    .required('Informe sua senha')
    .min(8, 'Senha deve conter no mínimo 8 caracteres.'),
});