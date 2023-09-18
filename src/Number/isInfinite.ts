/**
 * Returns `true` if the number is infinite — that is, the number is `Infinity` or `-Infinity`.
 *
 * @example
 * ```typescript
 * 1.95.isInfinite(); // => false
 * NaN.isInfinite(); // => false
 * Infinity.isInfinite(); // => true
 * -Infinity.isInfinite(); // => true
 *  ```
 */
const isInfinite = (n: number): boolean => n === Infinity || n === -Infinity;

export default isInfinite;
