import * as yup from 'yup';
import { trimString, requiredField } from '@global';
import { parse, isValid } from 'date-fns';

export const registerScheme = yup.object({
  name: yup
    .string()
    .transform(trimString)
    .required(requiredField)
    .min(3, 'Nome deve conter no mínimo 3 caracteres.'),
  cpf: yup
    .string()
    .transform(trimString)
    .required(requiredField),
  birthday: yup
    .string()
    .transform(trimString)
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
    .transform(trimString)
    .email('Informe um email válido')
    .required(requiredField),
  confirmEmail: yup
    .string()
    .transform(trimString)
    .email('Informe um email válido')
    .required(requiredField)
    .oneOf([yup.ref('email')], 'Os endereços de e-mail devem ser idênticos.'),
  password: yup
    .string()
    .transform(trimString)
    .required(requiredField)
    .test({
      name: 'custom-validation',
      skipAbsent: true,
      test(value: string, ctx: any) {
        return ctx.createError({
          message: {
            standardError: false,
            character: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            letter: /[A-Z]/.test(value) && /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            min: value.length >= 8
          }
        })
      }
    }),
  confirmPassword: yup
    .string()
    .transform(trimString)
    .required(requiredField)
    .oneOf([yup.ref('password')], 'As senhas devem ser idênticas.'),
});