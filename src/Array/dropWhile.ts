import type { Ary } from '../internal/types/tools';

/**
 * Drops elements from the array until the predicate returns `false`.
 * @param array The array to take from.
 * @param pred The predicate function.
 *
 * @example
 * ```typescript
 * dropWhile([1, 2, 3, 4, 5], (x) => x < 3); // => [3, 4, 5]
 * dropWhile([1, 2, 3, 4, 5], (x) => x > 0); // => [1, 2, 3, 4, 5]
 * ```
 */
const dropWhile = <AS extends readonly unknown[]>(
  array: AS,
  pred: (value: AS[number], index: number, array: AS) => boolean,
): Ary.Mutate<AS, AS[number]> => {
  const index = array.findIndex((value, index, array) => !pred(value, index, array as never));
  return index === -1 ? [] : array.slice(index);
};

export default dropWhile;
