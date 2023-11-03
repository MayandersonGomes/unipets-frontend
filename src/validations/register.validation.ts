import * as yup from 'yup';
import { requiredField } from '@global';
import { parse, isValid } from 'date-fns';
import { isStrongPassword } from './password.validation';

export const registerScheme = yup.object({
  name: yup
    .string()
    .trim()
    .required(requiredField)
    .min(3, 'Nome deve conter no mínimo 3 caracteres.'),
  cpf: yup
    .string()
    .trim()
    .required(requiredField),
  birthday: yup
    .string()
    .trim()
    .required(requiredField)
    .test(
      'valid-date',
      'Informe uma data de nascimento válida',
      (value) => {
        const date = parse(value, 'dd/MM/yyyy', new Date());
        return isValid(date);
      }
    ),
  email: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required(requiredField),
  confirmEmail: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required(requiredField)
    .oneOf([yup.ref('email')], 'Os endereços de e-mail devem ser idênticos.'),
  password: yup
    .string()
    .trim()
    .required(requiredField)
    .test(
      'custom-validation',
      'false',
      (value) => {
        const { character, letter, number, min } = isStrongPassword(value);
        return character && letter && number && min;
      }
    ),
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
