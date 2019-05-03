import React from 'react';
import { shallow } from 'enzyme';
import { withMaybe } from '../withMaybe';

const TestComponent = props => <div>Cards: {props.cards}</div>;
const hasNoCards = props => !props.cards;

describe('withMaybe monadic HOC helper', () => {
  it('should return null if a predicate function is evaluated to true', () => {
    const props = {
      cards: null
    };

    const ComponentWithConditions = withMaybe(hasNoCards)(TestComponent);

    expect(shallow(<ComponentWithConditions {...props} />).get(0)).toEqual(null);
  });

  it('should return a React component if a predicate function is evaluated to false', () => {
    const props = {
      cards: 'cards test data'
    };

    const ComponentWithConditions = withMaybe(hasNoCards)(TestComponent);

    const Test = shallow(<ComponentWithConditions {...props} />).get(0);
    const Expected = <TestComponent {...props} />;

    expect(Test).toEqual(Expected);
  });
});
