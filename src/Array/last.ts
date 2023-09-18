import type { Dec } from '../.internal/types/number';

export type Last<AS extends readonly unknown[]> = number extends AS['length']
  ? AS[0] | undefined
  : AS extends [] | readonly []
  ? undefined
  : AS[Dec<AS['length']>];

/**
 * Returns the last element of the array.
 * @param array The array to get the last element of.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * last(arr); // => 3
 * ```
 */
const last = <AS extends unknown[] | readonly unknown[]>(array: AS): Last<AS> =>
  array[array.length - 1] as Last<AS>;

export default last;
