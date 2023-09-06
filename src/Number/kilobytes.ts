/**
 * Returns the corresponding size represented in kilobytes.
 * @param n The number to get the kilobytes of.
 *
 * @example
 * ```typescript
 * kilobytes(2); // => 2048
 * ```
 */
const kilobytes = (n: number): number => n * 1024;

export default kilobytes;
