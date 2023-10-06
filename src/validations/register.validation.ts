import * as yup from 'yup';
import { trimString } from '@global';

export const registerScheme = yup.object({
  name: yup
    .string()
    .transform(trimString)
    .required('Informe seu nome completo')
    .min(3, 'Nome deve conter no mínimo 3 caracteres.'),
  cpf: yup
    .string()
    .transform(trimString)
    .required('Informe seu CPF'),
  birthday: yup
    .string()
    .transform(trimString)
    .required('Informe sua data de nascimento'),
  email: yup
    .string()
    .transform(trimString)
    .email('Informe um email válido')
    .required('Informe seu email'),
  confirmEmail: yup
    .string()
    .transform(trimString)
    .email('Informe um email válido')
    .required('Informe novamente seu email'),
  password: yup
    .string()
    .transform(trimString)
    .required('Informe sua senha')
    .test({
      name: 'custom-validation',
      skipAbsent: true,
      test(value: string, ctx: any) {
        return ctx.createError({
          message: {
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
    .required('Informe novamente sua senha'),
});