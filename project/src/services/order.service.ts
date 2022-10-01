import ICPFService, { CPF } from './cpf.interface';
import IOrder from './order.interface';
import IProduct from './product.interface';

export default class OrderService implements IOrder {
  private _cpf: CPF;

  constructor(
    CPFService: new (...args: any[]) => ICPFService,
    cpf: string,
    private _description: string,
    private _items: IProduct[],
    private _discountRate: number = 0,
  ) {
    this._cpf = new CPFService(cpf).getCPF();
  }

  get cpf(): CPF {
    return this._cpf;
  }

  get description(): string {
    return this._description;
  }

  get items(): IProduct[] {
    return this._items;
  }

  get discountRate(): number {
    return this._discountRate;
  }

  get totalPrice(): number {
    const originalPrice =
      this._items.reduce<number>(
        (acc, { quantity, price }) => acc + Math.floor(100 * price) * quantity,
        0,
      ) / 100;
    const discountedPrice =
      Math.floor(100 * originalPrice * (1 - this._discountRate)) / 100;
    return discountedPrice;
  }
}
