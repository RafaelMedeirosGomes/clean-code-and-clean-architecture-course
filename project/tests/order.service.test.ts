import ICPFService, { CPF } from '../src/services/cpf.interface';
import OrderService from '../src/services/order.service';
import IProduct from '../src/services/product.interface';

describe('Order service tests', () => {
  const validCPF = '111.444.777-35';
  const description = 'First order from John Doe';
  const products: IProduct[] = [{ id: 1, price: 1.99, quantity: 100 }];
  const discountRate = 0.1;

  it('given a valid CPF should create a new order with the expected fields', () => {
    const given = class implements ICPFService {
      getCPF() {
        return validCPF;
      }
    };

    const order = new OrderService(given, validCPF, description, products);

    expect(order.cpf).toBe(validCPF);
    expect(order.description).toBe(description);
    expect(order.items).toEqual(products);
  });
  it("given an error from CPF service when creating instance shouldn't create a new order", () => {
    const given = class implements ICPFService {
      constructor() {
        throw new Error('Something wrong happened while parsing the string');
      }
      getCPF(): CPF {
        throw new Error('Method not implemented.');
      }
    };

    const when = () => new OrderService(given, validCPF, description, products);

    expect(when).toThrow();
  });
  it('given a discount coupon should return the expected total value', () => {
    const given = class implements ICPFService {
      getCPF() {
        return validCPF;
      }
    };

    const order = new OrderService(
      given,
      validCPF,
      description,
      products,
      discountRate,
    );

    expect(order.totalPrice).toBe(179.1);
  });
});
