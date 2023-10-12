import type { Ary, IfpList, List, Num, Yield1$ } from '../internal/types/tools';

/**
 * Drops the first `count` elements from the array.
 * @param array - The array to drop from.
 * @param count - The number of elements to drop.
 *
 * @example
 * ```typescript
 * drop([1, 2, 3, 4, 5], 3); // => [4, 5]
 * drop([1, 2, 3, 4, 5], 0); // => [1, 2, 3, 4, 5]
 * drop([1, 2, 3, 4, 5], 10); // => []
 * ```
 */
const drop = <AS extends readonly unknown[], const N extends number>(
  array: AS,
  count: N,
): IfpList<
  AS,
  Num.IfNat<N, List.Drop$<N>, Ary.Mutate$<AS[number]>>,
  Yield1$<AS>
> => array.slice(count) as never;

export default drop;
