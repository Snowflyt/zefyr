/**
 * Returns the corresponding size represented in megabytes.
 * @param n The number to get the megabytes of.
 *
 * @example
 * ```typescript
 * megabytes(2); // => 2097152
 * ```
 */
const megabytes = (n: number): number => n * 1024 ** 2;

export default megabytes;
