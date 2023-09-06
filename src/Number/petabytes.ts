/**
 * Returns the corresponding size represented in petabytes.
 * @param n The number to get the petabytes of.
 *
 * @example
 * ```typescript
 * petabytes(2); // => 2251799813685248
 * ```
 */
const petabytes = (n: number): number => n * 1024 ** 5;

export default petabytes;
