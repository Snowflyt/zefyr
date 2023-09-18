/**
 * Returns `true` if the number is even.
 *
 * @example
 * ```typescript
 * (3).isEven(); // => true
 * (4).isEven(); // => false
 * 3.0.isEven(); // => true
 * 1.95.isEven(); // => false
 * ```
 */
const isEven = (n: number): boolean => n % 2 === 0;

export default isEven;
