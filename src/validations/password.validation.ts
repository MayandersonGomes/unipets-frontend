import { IValidatePassword } from "@interfaces/Password.interface";

export const isStrongPassword = (password: string): IValidatePassword => {
  return {
    character: /[!@#$%^&*()\-_+|;:,.<>?{}[\]\/]/.test(password),
    letter: /[A-Z]/.test(password) && /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    min: password.length >= 8,
  };
};

export const validatePassword = (password: string): IValidatePassword => isStrongPassword(password);