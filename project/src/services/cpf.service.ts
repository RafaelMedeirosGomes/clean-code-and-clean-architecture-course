import ICPFService, { CPF } from './cpf.interface';

export default class CPFService implements ICPFService {
  getCPF(): CPF {
    return this.cpf;
  }

  constructor(text: unknown) {
    if (typeof text !== 'string') {
      throw new Error(
        `CPFService: Wrong Type. Expected string, received ${typeof text}`,
      );
    }
    if (!CPFService.CPF_PATTERN.test(text)) {
      throw new Error(
        `CPFService: Wrong Pattern. Expected 123.456.789-01, received ${text}`,
      );
    }
    if (!CPFService.isValidCPF(text)) {
      throw new Error('CPFService: Invalid check digits.');
    }

    this.cpf = text;
  }

  private static CPF_PATTERN = /\d{3}\.\d{3}\.\d{3}-\d{2}/;

  private cpf: string;

  private static isValidCPF(text: string) {
    const [firstBlock, checkDigits] = text.split('-');
    const calculatedCheckDigits =
      CPFService.calculateCheckDigitsFrom(firstBlock);
    return calculatedCheckDigits === parseInt(checkDigits, 10);
  }

  private static calculateCheckDigitsFrom(firstBlock: string) {
    const firstCheckDigit = CPFService.calculateFirstCheckDigit(firstBlock);
    const secondCheckDigit = CPFService.calculateSecondCheckDigit(
      firstBlock,
      firstCheckDigit,
    );
    return firstCheckDigit * 10 + secondCheckDigit;
  }

  private static calculateFirstCheckDigit(firstBlock: string) {
    // Formula here https://www.macoratti.net/alg_cpf.htm
    const splittedDigits = CPFService.splitAndParseDigits(firstBlock);
    const weightedDigitsSum = splittedDigits
      .map((digit, index) => {
        const multiplier = 10 - index;
        return digit * multiplier;
      })
      .reduce((acc, cur) => acc + cur, 0);
    const remaining = weightedDigitsSum % 11;
    return remaining < 2 ? 0 : 11 - remaining;
  }

  private static calculateSecondCheckDigit(
    firstBlock: string,
    firstDigit: number,
  ) {
    const splittedDigits = CPFService.splitAndParseDigits(firstBlock);
    const weightedDigitsSum = [...splittedDigits, firstDigit]
      .map((digit, index) => {
        const multiplier = 11 - index;
        return digit * multiplier;
      })
      .reduce((acc, cur) => acc + cur, 0);
    const remaining = weightedDigitsSum % 11;
    return remaining < 2 ? 0 : 11 - remaining;
  }

  private static splitAndParseDigits(firstBlock: string) {
    return firstBlock
      .split('')
      .filter((c) => c !== '.')
      .map((c) => parseInt(c, 10));
  }
}
