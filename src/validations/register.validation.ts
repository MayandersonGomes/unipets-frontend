import * as yup from 'yup';

export const registerScheme = yup.object({
  name: yup
    .string()
    .required('Informe seu nome completo')
    .min(3, 'Nome deve conter no mínimo 3 caracteres.'),
  cpf: yup
    .string()
    .required('Informe seu CPF'),
  birthday: yup
    .string()
    .required('Informe sua data de nascimento'),
  email: yup
    .string()
    .required('Informe seu email'),
  confirmEmail: yup
    .string()
    .required('Informe novamente seu email'),
  password: yup
    .string()
    .required('Informe sua'),
  confirmPassword: yup
    .string()
    .required('Informe novamente sua'),
});