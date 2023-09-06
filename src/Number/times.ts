/**
 * Calls the given function with times of the number.
 * @param n The number of times to call the function.
 * @param callbackfn The function to call.
 *
 * @example
 * ```typescript
 * times(3, (index) => console.log(index, 'Hello, world!'));
 * // 0 Hello, world!
 * // 1 Hello, world!
 * // 2 Hello, world!
 * ```
 */
const times = (n: number, callbackfn: (index?: number) => unknown): void => {
  for (let i = 0; i < n; i++) callbackfn(i);
};

export default times;
