import equals from '../global/equals';

/**
 * Returns a duplicate-free version of the array,
 * in which only the first occurrence of each element is kept (using `equals` for equality comparisons).
 * @param array The array to get the unique values of.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 1, 2, 3, { a: [2], c: { d: 10 } }, , { a: [2], c: { d: 10 } }];
 * unique(arr); // => [1, 2, 3, { a: [2], c: { d: 10 } }]
 * ```
 *
 * @see {@link equals}
 */
const unique = <T>(array: T[]): T[] => {
  const result: T[] = [];
  for (const item of array)
    if (!result.some((newItem) => equals(newItem, item))) result.push(item);
  return result;
};

export default unique;
