/**
 * Returns `true` if the number is positive (using `Math.sign`).
 *
 * @example
 * ```typescript
 * 1.95.isPositive(); // => true
 * -1.95.isPositive(); // => false
 * NaN.isPositive(); // => false
 * Infinity.isPositive(); // => true
 * -Infinity.isPositive(); // => false
 * ```
 *
 * @see {@link Math.sign}
 */
const isPositive = (n: number): boolean => Math.sign(n) === 1;

export default isPositive;
