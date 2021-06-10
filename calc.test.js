const { calcMean, calcMedian, calcMode } = require('./calc');

describe('calcMean', () => {
  test('calculate mean of a number array', () => {
    expect(calcMean([1, 3, 8, 2, 98])).toEqual(22.4);
  });
  test('calculate mean of an empty array', () => {
    expect(() => calcMean([])).toThrow(Error);
  });
})

describe('calcMedian', () => {
  test('calculate median of an odd number array', () => {
    expect(calcMedian([1, 3, 8, 2, 98])).toEqual(3);
  });
  test('calculate median of an even number array', () => {
    expect(calcMedian([1, 3, 2, 98])).toEqual(2.5);
  });
})

describe('calcMode', () => {
  test('calculate mode of an array', () => {
    expect(calcMode([1, 3, 3, 2, 98])).toEqual([3]);
  });
  test('calculate mode of a non repeating array', () => {
    expect(calcMode([1, 3, 2, 98])).toEqual('mode undefined, each unique num cannot have same frequency');
  });
  test('calculate mode repeating array of single num', () => {
    expect(calcMode([1, 1, 1])).toEqual('mode undefined, every num cannot be the same');
  });
})