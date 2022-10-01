import { CPF } from './cpf.interface';
import IProduct from './product.interface';

export default interface IOrder {
  cpf: CPF;
  description: string;
  items: IProduct[];
  totalPrice: number;
  discountRate: number;
}
