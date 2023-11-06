import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    fullEmail(message?: string): StringSchema;
  }

  interface StringSchema {
    cpf(message?: string): StringSchema;
  }

  interface StringSchema {
    date(message?: string): StringSchema;
  }

  interface StringSchema {
    password(message?: string): StringSchema;
  }
}
