import ICPF from './cpf.interface';
import IOrder from './order.interface';
import productInterface from './product.interface';

export default class OrderService implements IOrder {
  get cpf(): ICPF {
    throw new Error('Not implemented');
  }
  get description(): string {
    throw new Error('Not implemented');
  }
  get items(): productInterface[] {
    throw new Error('Not implemented');
  }
}
