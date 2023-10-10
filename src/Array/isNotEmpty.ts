/**
 * Returns `true` if length of the array is greater than `0`.
 * @param array The array to check.
 *
 * @example
 * ```typescript
 * isNotEmpty([]); // => false
 * isNotEmpty([1, 2, 3]); // => true
 * ```
 */
const isNotEmpty = <const AS extends readonly unknown[]>(
  array: AS,
): array is Exclude<AS, [] | readonly []> => array.length > 0;

export default isNotEmpty;
