/**
 * Returns `true` if the number is between the given numbers, inclusive.
 *
 * @example
 * ```typescript
 * (3).isBetween(1, 5); // => true
 * (1).isBetween(1, 5); // => true
 * (5).isBetween(1, 5); // => true
 * (0).isBetween(1, 5); // => false
 * ```
 */
const isBetween = (n: number, min: number, max: number): boolean =>
  n >= min && n <= max;

export default isBetween;
