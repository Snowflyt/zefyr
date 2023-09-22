/**
 * Returns a tuple of the given elements.
 *
 * It is the same as `[...elements] as const`, but with a more readable syntax.
 * @param elements The elements to return.
 *
 * @example
 * ```typescript
 * list(1, 2, 3); // => [1, 2, 3]
 * const as = list('a', 'b', 'c'); // as :: readonly ['a', 'b', 'c']
 * ```
 */
const list = <const AS extends readonly unknown[]>(...elements: AS) => elements;

export default list;
