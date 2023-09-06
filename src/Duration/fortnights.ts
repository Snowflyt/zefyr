/**
 * Returns the corresponding `Duration` represented in fortnights (2 weeks).
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in fortnights.
 *
 * @example
 * ```typescript
 * fortnights(2); // => 4n << (53n * 5n)
 * asFortnights(fortnights(2)); // => 2
 * fortnights(2) + days(3); // => 4n << (53n * 5n) + 3n << (53n * 4n)
 * asFortnights(fortnights(2) + days(3)); // => 2.2142857142857144
 * asDays(fortnights(2) + days(3)); // => 31
 * ```
 */
const fortnights = (n: number): bigint => BigInt(n * 2) << (53n * 5n);

export default fortnights;
