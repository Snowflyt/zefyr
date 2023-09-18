/**
 * Returns `true` if the value is an array (using `Array.isArray`).
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isArray([]); // => true
 * isArray([1, 2, 3]); // => true
 * isArray({}); // => false
 * isArray(''); // => false
 * isArray(new Array(5)); // => true
 * isArray(new Int16Array([15, 33])); // => false
 * ```
 *
 * @example
 * ```typescript
 * const arr: number[] | null = [1, 2, 3];
 * if (isArray(arr)) {
 *   const arr2 = arr; // arr2 :: number[]
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray}
 */
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export default isArray;
