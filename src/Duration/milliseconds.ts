/**
 * Returns the corresponding `Duration` represented in milliseconds.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in milliseconds.
 *
 * @example
 * ```typescript
 * milliseconds(2); // => 2n << (53n * 0n)
 * asMilliseconds(milliseconds(2)); // => 2
 * seconds(2) + milliseconds(3); // => 2n << (53n * 1n) + 3n << (53n * 0n)
 * asSeconds(seconds(2) + milliseconds(3)); // => 2.003
 * asMilliseconds(seconds(2) + milliseconds(3)); // => 2003
 * ```
 */
const milliseconds = (n: number): bigint => BigInt(n);

export default milliseconds;
