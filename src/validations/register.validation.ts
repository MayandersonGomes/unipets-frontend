import * as yup from 'yup';
import { trimString, requiredField } from '@global';

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
    .required(requiredField),
  email: yup
    .string()
    .transform(trimString)
    .email('Informe um email válido')
    .required(requiredField),
  confirmEmail: yup
    .string()
    .transform(trimString)
    .email('Informe um email válido')
    .required(requiredField),
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
    .required(requiredField),
});