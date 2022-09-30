import ICPF, { CPF } from './cpf.interface';

export default class CPFService implements ICPF {
  private cpf: string;

  constructor(text: string) {
    this.cpf = text;
  }

  getCPF(): CPF {
    return this.cpf;
  }
}
