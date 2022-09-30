import ICPF from './cpf.interface';
import IProduct from './product.interface';

export default interface IOrder {
  cpf: ICPF;
  description: string;
  items: IProduct[];
}
