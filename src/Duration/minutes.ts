/**
 * Returns the corresponding `Duration` represented in minutes.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in minutes.
 *
 * @example
 * ```typescript
 * minutes(2); // => 2n << (53n * 2n)
 * asMinutes(minutes(2)); // => 2
 * minutes(2) + seconds(3); // => 2n << (53n * 2n) + 3n << (53n * 1n)
 * asMinutes(minutes(2) + seconds(3)); // => 2.05
 * asSeconds(minutes(2) + seconds(3)); // => 123
 * ```
 */
const minutes = (n: number): bigint => BigInt(n) << (53n * 2n);

export default minutes;
