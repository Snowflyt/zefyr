/**
 * Returns the corresponding `Duration` represented in seconds.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in seconds.
 *
 * @example
 * ```typescript
 * seconds(2); // => 2n << (53n * 1n)
 * asSeconds(seconds(2)); // => 2
 * seconds(2) + milliseconds(3); // => 2n << (53n * 1n) + 3n << (53n * 0n)
 * asSeconds(seconds(2) + milliseconds(3)); // => 2.003
 * asMilliseconds(seconds(2) + milliseconds(3)); // => 2003
 * ```
 */
const seconds = (n: number): bigint => BigInt(n) << 53n;

export default seconds;
