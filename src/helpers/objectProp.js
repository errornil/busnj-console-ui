export const objectProp = (path = [], obj = {}) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);
