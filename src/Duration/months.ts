/**
 * Returns the corresponding `Duration` represented in months.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in months.
 *
 * @example
 * ```typescript
 * months(2); // => 2n << (53n * 6n)
 * asMonths(months(2)); // => 2
 * months(2) + weeks(3); // => 2n << (53n * 6n) + 3n << (53n * 5n)
 * asMonths(months(2) + weeks(3)); // => 2.689952565761104
 * asWeeks(months(2) + weeks(3)); // => 11.69625
 * ```
 */
const months = (n: number): bigint => BigInt(n) << (53n * 6n);

export default months;
