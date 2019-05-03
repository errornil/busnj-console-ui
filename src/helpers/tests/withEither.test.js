import React from 'react';
import { shallow } from 'enzyme';
import { withEither } from '../withEither';

const TestComponent = props => <div>Data: {props.data[0]}</div>;
const EitherComponent = () => <div>You have no data</div>;
const isEmptyData = props => !props.data.length;

describe('withEither helper higher order component', () => {
  it('should return Either React component if a predicate function is evaluated to true', () => {
    const props = {
      data: []
    };

    const ComponentWithRenderConditions = withEither(isEmptyData)(EitherComponent)(TestComponent);
    const Result = shallow(<ComponentWithRenderConditions {...props}/>).get(0);
    const Expected = <EitherComponent />;

    expect(Result).toEqual(Expected);
  });

  it('should return main React component if a predicate function is evaluated to false', () => {
    const props = {
      data: ['some data']
    };

    const ComponentWithRenderConditions = withEither(isEmptyData)(EitherComponent)(TestComponent);
    const Result = shallow(<ComponentWithRenderConditions {...props}/>).get(0);
    const Expected = <TestComponent {...props}/>;

    expect(Result).toEqual(Expected);
  });
});
