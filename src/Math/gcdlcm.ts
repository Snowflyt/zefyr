import gcd from './gcd';
import lcm from './lcm';

/**
 * Returns the greatest common divisor (gcd) and the least common multiple (lcm) of a list of numbers as a tuple of two numbers (representing gcd and lcm respectively).
 * The result is always positive even if one or more of the arguments are negative.
 * `gcdlcm(0, x)` and `gcdlcm(x, 0)` returns `[Math.abs(x), 0]`.
 * @param values - A list of numbers.
 *
 * @example
 * ```typescript
 * gcdlcm(8, 36); // => [4, 72]
 * gcdlcm(-4, 6, 8); // => [2, 24]
 * gcdlcm(12, 8, 32); // => [4, 96]
 * gcdlcm(0, 12); // => [12, 0]
 * gcdlcm(12, 0, 8); // => [4, 0]
 * ```
 *
 * @see {@link gcd}
 * @see {@link lcm}
 */
const gcdlcm = (...values: number[]): [number, number] => [
  gcd(...values),
  lcm(...values),
];

export default gcdlcm;
