import yup from '@global/yup';
import { requiredField } from '@global/index';

export const registerScheme = yup.object({
  name: yup
    .string()
    .trim()
    .required(requiredField)
    .min(3, 'Nome deve conter no mínimo 3 caracteres.'),
  cpf: yup
    .string()
    .trim()
    .cpf()
    .required(requiredField),
  birthday: yup
    .string()
    .trim()
    .date()
    .required(requiredField),
  email: yup
    .string()
    .trim()
    .fullEmail()
    .required(requiredField),
  confirmEmail: yup
    .string()
    .trim()
    .fullEmail()
    .required(requiredField)
    .oneOf([yup.ref('email')], 'Os endereços de e-mail devem ser idênticos.'),
  password: yup
    .string()
    .trim()
    .password('false')
    .required(requiredField),
  confirmPassword: yup
    .string()
    .trim()
    .required(requiredField)
    .oneOf([yup.ref('password')], 'As senhas devem ser idênticas.'),
  termsOfUse: yup
    .boolean()
    .required(requiredField)
    .oneOf([true], 'Os termos de uso devem ser aceitos'),
});
