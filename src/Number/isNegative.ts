/**
 * Returns true if the number is negative (using `Math.sign`).
 *
 * @example
 * ```typescript
 * 1.95.isNegative(); // => false
 * -1.95.isNegative(); // => true
 * NaN.isNegative(); // => false
 * Infinity.isNegative(); // => false
 * -Infinity.isNegative(); // => true
 *  ```
 *
 * @see {@link Math.sign}
 */
const isNegative = (n: number): boolean => Math.sign(n) === -1;

export default isNegative;
