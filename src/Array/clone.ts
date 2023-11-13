/**
 * Returns a new array with the same values.
 * It is an alias of `Array.from`.
 * @param array The array to clone.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * const arr2 = clone(array);
 * console.log(arr2); // [1, 2, 3]
 * arr2[0] = 4;
 * console.log(arr2); // [4, 2, 3]
 * console.log(arr); // [1, 2, 3]
 * ```
 */
const clone = <AS extends unknown[] | readonly unknown[]>(array: AS): AS => Array.from(array) as AS;

export default clone;
