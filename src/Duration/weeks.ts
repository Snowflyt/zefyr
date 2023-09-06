/**
 * Returns the corresponding `Duration` represented in weeks.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in weeks.
 *
 * @example
 * ```typescript
 * weeks(2); // => 2n << (53n * 5n)
 * asWeeks(weeks(2)); // => 2
 * weeks(2) + days(3); // => 2n << (53n * 5n) + 3n << (53n * 4n)
 * asWeeks(weeks(2) + days(3)); // => 2.4285714285714284
 * asDays(weeks(2) + days(3)); // => 17
 * ```
 */
const weeks = (n: number): bigint => BigInt(n) << (53n * 5n);

export default weeks;
