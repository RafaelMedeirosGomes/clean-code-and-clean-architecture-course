import CPFService from '../src/services/cpf.service';

describe('CPF service tests', () => {
  const validCPF = '111.444.777-35';
  const invalidCPF = '111.444.777-05';

  it('given a valid CPF should be possible to retrieve the value', () => {
    const given = new CPFService(validCPF);

    expect(given.getCPF()).toBe(validCPF);
  });

  it('given an invalid CPF should throw an error', () => {
    const given = () => new CPFService(invalidCPF);

    expect(given).toThrow();
  });
});
