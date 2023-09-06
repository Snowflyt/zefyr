/**
 * Returns the corresponding size represented in gigabytes.
 * @param n The number to get the gigabytes of.
 *
 * @example
 * ```typescript
 * gigabytes(2); // => 2147483648
 * ```
 */
const gigabytes = (n: number): number => n * 1024 ** 3;

export default gigabytes;
