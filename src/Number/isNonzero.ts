/**
 * Returns true if the number is not zero.
 *
 * @example
 * ```typescript
 * 1.95.isNotZero(); // => true
 * (0).isNotZero(); // => false
 * (-0).isNotZero(); // => false
 * NaN.isNotZero(); // => true
 * Infinity.isNotZero(); // => true
 * -Infinity.isNotZero(); // => true
 *  ```
 */
const isNonzero = (n: number): boolean => n !== 0;

export default isNonzero;
