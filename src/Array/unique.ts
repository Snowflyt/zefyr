import _ from 'lodash';

/**
 * Returns a duplicate-free version of the array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept (using `_.uniq`).
 * @param array The array to get the unique values of.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 1, 2, 3];
 * unique(arr); // => [1, 2, 3]
 * ```
 *
 * @see {@link _.uniq}
 */
const unique = <T>(array: T[]): T[] => _.uniq(array);

export default unique;
