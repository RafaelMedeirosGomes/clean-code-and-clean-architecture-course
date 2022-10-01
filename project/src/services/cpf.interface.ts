export type CPF = string;

export default interface ICPFService {
  getCPF(): CPF;
}
