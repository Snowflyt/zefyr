export type First<AS extends readonly unknown[]> = number extends AS['length']
  ? AS[0] | undefined
  : AS[0];

/**
 * Returns the first element of the array.
 * @param array The array to get the first element of.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * first(arr); // => 1
 * ```
 */
const first = <AS extends unknown[] | readonly unknown[]>(array: AS): First<AS> => array[0];

export default first;
