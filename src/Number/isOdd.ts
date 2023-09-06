/**
 * Returns true if the number is odd.
 *
 * @example
 * ```typescript
 * (3).isOdd(); // => true
 * (4).isOdd(); // => false
 * 3.0.isOdd(); // => true
 * 1.95.isOdd(); // => false
 * ```
 */
const isOdd = (n: number): boolean => n % 2 === 1;

export default isOdd;
