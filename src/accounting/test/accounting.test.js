const Accounting = require('../accounting');

describe('Accounting System Tests', () => {
  let acc;

  beforeEach(() => {
    acc = new Accounting();
  });

  test('TC001: View initial balance', () => {
    expect(acc.getBalance()).toBe(1000.00);
  });

  test('TC002: Credit account with positive amount', () => {
    acc.credit(500.00);
    expect(acc.getBalance()).toBe(1500.00);
  });

  test('TC003: Debit account with sufficient funds', () => {
    acc.credit(500.00); // balance 1500
    acc.debit(200.00);
    expect(acc.getBalance()).toBe(1300.00);
  });

  test('TC004: Debit account with insufficient funds', () => {
    acc = new Accounting(); // reset to 1000
    expect(() => acc.debit(1500.00)).toThrow('Insufficient funds for this debit.');
    expect(acc.getBalance()).toBe(1000.00); // balance unchanged
  });

  test('TC005: Multiple credit operations', () => {
    acc = new Accounting(); // 1000
    acc.credit(100.00);
    acc.credit(50.00);
    expect(acc.getBalance()).toBe(1150.00);
  });

  test('TC006: Multiple debit operations', () => {
    acc = new Accounting(); // 1000
    acc.credit(500.00); // 1500
    acc.debit(100.00);
    acc.debit(50.00);
    expect(acc.getBalance()).toBe(1350.00);
  });

  test('TC007: Credit followed by debit', () => {
    acc = new Accounting(); // 1000
    acc.credit(300.00); // 1300
    acc.debit(400.00); // 900
    expect(acc.getBalance()).toBe(900.00);
  });

  test('TC008: Debit exact balance', () => {
    acc = new Accounting(); // 1000
    acc.debit(1000.00);
    expect(acc.getBalance()).toBe(0.00);
  });

  test('TC009: Attempt debit after zero balance', () => {
    acc = new Accounting(); // 1000
    acc.debit(1000.00); // 0
    expect(() => acc.debit(100.00)).toThrow('Insufficient funds for this debit.');
    expect(acc.getBalance()).toBe(0.00);
  });

  test('TC012: Credit with zero amount', () => {
    acc.credit(0.00);
    expect(acc.getBalance()).toBe(1000.00);
  });

  test('TC013: Debit with zero amount', () => {
    acc.debit(0.00);
    expect(acc.getBalance()).toBe(1000.00);
  });

  test('Invalid credit amount (negative)', () => {
    expect(() => acc.credit(-100.00)).toThrow('Invalid amount');
  });

  test('Invalid debit amount (negative)', () => {
    expect(() => acc.debit(-100.00)).toThrow('Invalid amount');
  });

  test('Invalid credit amount (NaN)', () => {
    expect(() => acc.credit('abc')).toThrow('Invalid amount');
  });

  test('Invalid debit amount (NaN)', () => {
    expect(() => acc.debit('abc')).toThrow('Invalid amount');
  });
});