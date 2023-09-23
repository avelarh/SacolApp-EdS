export function validateCPF(cpf: string): boolean {
  // Remova caracteres especiais do CPF
  const cleanedCpf = cpf.replace(/[^\d]/g, '');

  // Verifique se o CPF tem 11 dígitos
  if (cleanedCpf.length !== 11) {
    return false;
  }

  // Verifique se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanedCpf)) {
    return false;
  }

  // Validação do CPF
  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
    return false;
  }

  return true;
}
