import type { Ord } from '../internal/types/alias';

/**
 * Returns a new array that is sorted by the given functions.
 * @param array The array to process.
 * @param fns The functions to sort by.
 *
 * @example
 * ```typescript
 * const objs = [{ a: 1, b: 4 }, { a: 3, b: 2 }, { a: 3, b: 1 }];
 * sortBy(objs, (obj) => obj.b); // => [{ a: 3, b: 1 }, { a: 3, b: 2 }, { a: 1, b: 4 }]
 * sortBy(objs, prop('a'), prop('b')); // => [{ a: 1, b: 4 }, { a: 3, b: 1 }, { a: 3, b: 2 }]
 * ```
 */
const sortBy = <T>(array: T[] | readonly T[], ...fns: Array<(value: T) => Ord>): T[] => {
  const result = [...array];
  result.sort((a, b) => {
    for (const fn of fns) {
      const aValue = fn(a);
      const bValue = fn(b);
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    }
    return 0;
  });
  return result;
};

export default sortBy;
