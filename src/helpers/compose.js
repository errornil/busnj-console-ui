export const compose =
  (...fns) =>
    val =>
      fns.reduceRight((acc, fn) => fn(acc), val);
