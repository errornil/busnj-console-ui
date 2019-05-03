import { compose } from '../compose';

describe('compose helper function', () => {
  it('should compose functions from right to left', () => {
    const func1 = x => x * 2;
    const func2 = x => x + 3;
    const func3 = x => x * 3;
  
    const composed = compose(func1, func2, func3);
  
    const val = 3;
    const result = 24;
  
    expect(composed(val)).toEqual(result);
  });
});
