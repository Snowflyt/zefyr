/**
 * Returns the corresponding `Duration` represented in days.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in days.
 *
 * @example
 * ```typescript
 * days(2); // => 2n << (53n * 4n)
 * asDays(days(2)); // => 2
 * days(2) + hours(3); // => 2n << (53n * 4n) + 3n << (53n * 3n)
 * asDays(days(2) + hours(3)); // => 2.125
 * asHours(days(2) + hours(3)); // => 51
 * ```
 */
const days = (n: number): bigint => BigInt(n) << (53n * 4n);

export default days;
