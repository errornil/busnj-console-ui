import React from 'react';

export const withMaybe =
  predicateFn =>
    Component =>
      props =>
        predicateFn(props) ? null : <Component {...props} />;
