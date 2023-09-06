/**
 * Returns true if the number is integer (using `Number.isInteger`).
 *
 * @example
 * ```typescript
 * 1.95.isInteger(); // => false
 * NaN.isInteger(); // => false
 * Infinity.isInteger(); // => false
 * -Infinity.isInteger(); // => false
 * (3).isInteger(); // => true
 * 3.0.isInteger(); // => true
 * (0).isInteger(); // => true
 * (-0).isInteger(); // => true
 * ```
 *
 * @see {@link Number.isInteger}
 */
const isInteger = (n: number): boolean => Number.isInteger(n);

export default isInteger;
