// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const named = <N extends string, F extends (...args: any[]) => unknown>(
  name: N,
  fn: F,
): F => {
  Object.defineProperty(fn, 'name', { value: name });
  return fn;
};
