import React from 'react';

export const withEither =
  predicateFn =>
    EitherComponent =>
      Component =>
        props =>
          predicateFn(props) ? <EitherComponent /> : <Component {...props} />;
