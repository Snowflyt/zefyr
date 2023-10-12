import type { Ary } from '../internal/types/tools';

/**
 * Drops elements from the array until the predicate returns `true`.
 * @param array The array to take from.
 * @param pred The predicate function.
 *
 * @example
 * ```typescript
 * dropUntil([1, 2, 3, 4, 5], (x) => x === 3); // => [3, 4, 5]
 * dropUntil([1, 2, 3, 4, 5], (x) => x === 10); // => []
 * ```
 */
const dropUntil = <AS extends readonly unknown[]>(
  array: AS,
  pred: (value: AS[number], index: number, array: AS) => boolean,
): Ary.Mutate<AS, AS[number]> => {
  const index = array.findIndex(
    pred as (
      value: AS[number],
      index: number,
      array: readonly AS[number][],
    ) => boolean,
  );
  return index === -1 ? [] : array.slice(index);
};

export default dropUntil;
