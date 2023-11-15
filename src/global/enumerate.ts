/**
 * Enumerate an iterable, yielding tuples of the form `[index, item]`.
 * @param iterable The iterable to enumerate.
 *
 * @example
 * ```typescript
 * for (const [i, item] of enumerate(['a', 'b', 'c'])) {
 *   console.log(i, item);
 *   // 0 'a'
 *   // 1 'b'
 *   // 2 'c'
 * }
 * ```
 */
const enumerate = <T>(iterable: Iterable<T>): Iterable<[number, T]> => ({
  *[Symbol.iterator]() {
    let i = 0;
    for (const item of iterable) yield [i++, item];
  },
});

export default enumerate;
