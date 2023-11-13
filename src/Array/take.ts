import type { Ary, IfpList, List, Num, Yield1$ } from '../internal/types/tools';

/**
 * Takes the first `count` elements from the array.
 * @param array - The array to take from.
 * @param count - The number of elements to take.
 *
 * @example
 * ```typescript
 * take([1, 2, 3, 4, 5], 3); // => [1, 2, 3]
 * take([1, 2, 3, 4, 5], 0); // => []
 * take([1, 2, 3, 4, 5], 10); // => [1, 2, 3, 4, 5]
 * ```
 */
const take = <AS extends readonly unknown[], const N extends number>(
  array: AS,
  count: N,
): IfpList<AS, Num.IfNat<N, List.Take$<N>, Ary.Mutate$<AS[number]>>, Yield1$<AS>> =>
  array.slice(0, count) as never;

export default take;
