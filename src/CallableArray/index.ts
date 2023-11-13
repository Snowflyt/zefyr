/**
 * A function behaves like an array, expect that `Array.isArray` returns `false`.
 * Its [[Prototype]] is set to `Array.prototype`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallableArray<T, F extends (...args: any[]) => unknown> = F & {
  [P in keyof T[] as P extends 'length' ? never : P]: T[][P];
} & { length: number; toArray: () => T[] };

export const createCallableArray = <
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => unknown,
>(
  array: T[],
  fn: F,
): CallableArray<T, F> => {
  const arr = Array.from(array);
  let result = fn.bind(arr) as CallableArray<T, F>;
  result = Object.assign(
    result,
    Object.entries(arr).reduce((acc, [index, digit]) => Object.assign(acc, { [index]: digit }), {
      toArray: () => arr,
    }),
  );
  Object.setPrototypeOf(result, Array.prototype);
  Object.defineProperty(result, 'length', {
    writable: true,
    value: arr.length,
  });
  return result;
};
