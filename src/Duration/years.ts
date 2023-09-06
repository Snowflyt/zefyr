/**
 * Returns the corresponding `Duration` represented in years.
 *
 * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
 * @param n The number to get the `Duration` represented in years.
 *
 * @example
 * ```typescript
 * years(2); // => 2n << (53n * 7n)
 * asYears(years(2)); // => 2
 * years(2) + months(3); // => 2n << (53n * 7n) + 3n << (53n * 6n)
 * asYears(years(2) + months(3)); // => 2.25
 * asMonths(years(2) + months(3)); // => 27
 * ```
 */
const years = (n: number): bigint => BigInt(n) << (53n * 7n);

export default years;
