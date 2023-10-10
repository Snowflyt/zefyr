/**
 * Returns `true` if length of the array is `0`.
 * @param array The array to check.
 *
 * @example
 * ```typescript
 * isEmpty([]); // => true
 * isEmpty([1, 2, 3]); // => false
 * ```
 */
const isEmpty = <const AS extends readonly unknown[]>(
  array: AS,
  // @ts-expect-error - Assignability of a `readonly` array to a mutable array is intentional.
): array is AS extends unknown[] ? [] : readonly [] => array.length === 0;

export default isEmpty;
