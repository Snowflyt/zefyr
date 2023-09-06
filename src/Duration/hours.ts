/**
 * Returns the corresponding `Duration` represented in hours.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in hours.
 *
 * @example
 * ```typescript
 * hours(2); // => 2n << (53n * 3n)
 * asHours(hours(2)); // => 2
 * hours(2) + minutes(3); // => 2n << (53n * 3n) + 3n << (53n * 2n)
 * asHours(hours(2) + minutes(3)); // => 2.05
 * asMinutes(hours(2) + minutes(3)); // => 123
 * ```
 */
const hours = (n: number): bigint => BigInt(n) << (53n * 3n);

export default hours;
