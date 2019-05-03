import { objectProp } from '../objectProp';

const data = {
  prop1: {
    prop2: {
      prop3: 'hey'
    }
  }
};

const data1 = {
  prop1: {
    prop2: {
      prop3: ['hey', 'jack']
    }
  }
};

describe('objectProperty helper function', () => {
  it('should return property value by path', () => {
    const expected = 'hey';

    expect(objectProp(['prop1', 'prop2', 'prop3'], data)).toEqual(expected);
  });

  it('should be able to traverse arrays as well', () => {
    const expected = 'jack';

    expect(objectProp(['prop1', 'prop2', 'prop3', 1], data1)).toEqual(expected);
  });

  it('should return null when path for a property doesnt exist', () => {
    const expected = null;

    expect(objectProp(['prop1', 'prop4'], data)).toEqual(expected);
  });
});
