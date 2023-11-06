import * as yup from 'yup';
import { parse, isValid } from 'date-fns';
import validateCpf from '@utils/cpfValidator';
import { isStrongPassword } from '@utils/password.validation';

yup.addMethod(yup.string, 'fullEmail', function (message = 'Informe um email válido') {
  return this.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message);
});

yup.addMethod(yup.string, 'cpf', function (message = 'Informe um cpf válido') {
  return this.test('valid-cpf', message, (value) => {
    if (!value) return false;
    return validateCpf(value);
  });
});

yup.addMethod(yup.string, 'date', function (message = 'Informe uma data de nascimento válida') {
  return this.test('valid-date', message, (value) => {
    if (!value) return false;
    const date = parse(value, 'dd/MM/yyyy', new Date());
    return isValid(date) && value.length === 10;
  });
});

yup.addMethod(yup.string, 'password', function (message = 'Informe uma senha válida') {
  return this.test('valid-password', message, (value) => {
    if (!value) return false;
    const { character, letter, number, min } = isStrongPassword(value);
    return character && letter && number && min;
  });
});

export default yup;