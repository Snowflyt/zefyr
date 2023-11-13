import type { Ary } from '../internal/types/tools';

/**
 * Takes elements from the array until the predicate returns `false`.
 * @param array The array to take from.
 * @param pred The predicate function.
 *
 * @example
 * ```typescript
 * takeWhile([1, 2, 3, 4, 5], (x) => x < 4); // => [1, 2, 3]
 * takeWhile([1, 2, 3, 4, 5], (x) => x > 10); // => []
 * ```
 */
const takeWhile = <AS extends readonly unknown[]>(
  array: AS,
  pred: (value: AS[number], index: number, array: AS) => boolean,
): Ary.Mutate<AS, AS[number]> => {
  const index = array.findIndex((value, index, array) => !pred(value, index, array as never));
  return index === -1 ? array.slice() : array.slice(0, index);
};

export default takeWhile;
