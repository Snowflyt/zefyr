/**
 * Returns `true` if the number is NaN (using `Number.isNaN`).
 *
 * @example
 * ```typescript
 * 1.95.isNaN(); // => false
 * NaN.isNaN(); // => true
 * Infinity.isNaN(); // => false
 * -Infinity.isNaN(); // => false
 * ```
 *
 *  @see {@link Number.isNaN}
 */
const isNaN = (n: number): boolean => Number.isNaN(n);

export default isNaN;
