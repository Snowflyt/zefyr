/**
 * Clears the array in-place (set `length` to `0`).
 * @param array The array to clear.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * clear(arr);
 * console.log(arr); // []
 * ```
 */
const clear = <T>(array: T[]): void => {
  array.length = 0;
};

export default clear;
