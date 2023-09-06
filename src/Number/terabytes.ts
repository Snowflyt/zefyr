/**
 * Returns the corresponding size represented in terabytes.
 * @param n The number to get the terabytes of.
 *
 * @example
 * ```typescript
 * terabytes(2); // => 2199023255552
 * ```
 */
const terabytes = (n: number): number => n * 1024 ** 4;

export default terabytes;
