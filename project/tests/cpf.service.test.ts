import CPFService from '../src/services/cpf.service';

describe('CPF service tests', () => {
  const validCPF = '111.444.777-35';
  const validCPFWithZero = '342.078.720-00';
  const invalidCPF = '111.444.777-05';

  it('given a valid CPF should be possible to retrieve the value', () => {
    const given = new CPFService(validCPF);

    expect(given.getCPF()).toBe(validCPF);
  });

  it('given a valid CPF with zeros as check digits should be possible to retrieve the value', () => {
    const given = new CPFService(validCPFWithZero);

    expect(given.getCPF()).toBe(validCPFWithZero);
  });

  it('given something not a string should throw an error', () => {
    const given = () => new CPFService(12345678901);

    expect(given).toThrow();
  });

  it('given an wrong formatted string should throw an error', () => {
    const given = () => new CPFService('invalidCPF');

    expect(given).toThrow();
  });

  it('given an invalid CPF should throw an error', () => {
    const given = () => new CPFService(invalidCPF);

    expect(given).toThrow();
  });
});
