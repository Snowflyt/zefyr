import type { Ary } from '../internal/types/tools';

/**
 * Takes elements from the array until the predicate returns `true`.
 * @param array The array to take from.
 * @param pred The predicate function.
 *
 * @example
 * ```typescript
 * takeUntil([1, 2, 3, 4, 5], (x) => x === 3); // => [1, 2]
 * takeUntil([1, 2, 3, 4, 5], (x) => x === 10); // => [1, 2, 3, 4, 5]
 * ```
 */
const takeUntil = <AS extends readonly unknown[]>(
  array: AS,
  pred: (value: AS[number], index: number, array: AS) => boolean,
): Ary.Mutate<AS, AS[number]> => {
  const index = array.findIndex(
    pred as (value: AS[number], index: number, array: readonly AS[number][]) => boolean,
  );
  return index === -1 ? array.slice() : array.slice(0, index);
};

export default takeUntil;
