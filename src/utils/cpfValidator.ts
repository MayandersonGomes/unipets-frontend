const calculateDigit = (baseCpf: string): number => {
  let multiplier: number = baseCpf.length + 1;
  let counter: number = 0;

  for (const digit of baseCpf) {
    counter += parseInt(digit) * multiplier;
    multiplier--;
  }

  const generatedDigit: number = 11 - (counter % 11);
  return generatedDigit < 10 ? generatedDigit : 0;
}

const validateCpf = (cpf: string): boolean => {
  cpf = cpf.replaceAll('.', '').replaceAll('-', '');

  if (cpf.length !== 11 || /^(\d)\1*$/.test(cpf)) {
    return false;
  }

  const baseCpf: string = cpf.slice(0, 9);
  const verificationDigits: string = cpf.slice(9, 11);

  const firstDigit: number = calculateDigit(baseCpf);
  if (firstDigit !== parseInt(verificationDigits[0])) {
    return false;
  }

  const baseCpfWithFirstDigit: string = baseCpf + firstDigit;

  const secondDigit: number = calculateDigit(baseCpfWithFirstDigit);
  if (secondDigit !== parseInt(verificationDigits[1])) {
    return false;
  }

  return true;
}

export default validateCpf;