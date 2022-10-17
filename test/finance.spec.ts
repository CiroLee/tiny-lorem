import Finance from '@src/lorem/finance';
const finance = new Finance();

describe('Finance', () => {
  test('bankCardNumber', () => {
    const result1 = finance.bankCardNumber('visa');
    const result2 = finance.bankCardNumber('mastercard');
    const result3 = finance.bankCardNumber();

    expect(result1.startsWith('4')).toBeTruthy();
    expect(result2.startsWith('5')).toBeTruthy();
    expect(result3.length).toBeGreaterThanOrEqual(13);
    expect(result3.length).toBeLessThanOrEqual(19);
  });
  test('ammount, int amount', () => {
    const result = finance.amount({ range: [10, 100], fixed: 0 });
    expect(result.includes('.')).toBeFalsy();
  });
  test('amount, has fixed', () => {
    const result = finance.amount({ fixed: 3 });
    const decimal = result.slice(result.indexOf('.') + 1);

    expect(result.includes('.')).toBeTruthy();
    expect(decimal.length).toBe(3);
  });
  test('amount, has symbol', () => {
    const result = finance.amount({ symbol: '$' });
    expect(result.startsWith('$')).toBeTruthy();
  });
  test('amount, format the amount', () => {
    const result = finance.amount({ range: [10000, 1000000], isFormat: true });
    expect(result.includes(',')).toBeTruthy();
  });
});
