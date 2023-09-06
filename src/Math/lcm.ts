import gcd from './gcd';

/**
 * Returns the least common multiple (lcm) of a list of numbers.
 * The result is always positive even if one or more of the arguments are negative.
 * `lcm(0, x)` and `lcm(x, 0)` returns `0`.
 * @param values - A list of numbers.
 *
 * @example
 * ```typescript
 * lcm(8, 36); // => 72
 * lcm(-4, 6, 8); // => 24
 * lcm(12, 8, 32); // => 96
 * lcm(0, 12); // => 0
 * lcm(12, 0, 8); // => 0
 * ```
 */
const lcm = (...values: number[]): number => {
  let result = 0;
  for (let i = 0; i < values.length; i++) {
    const value = values[i]!;
    if (value === 0) return 0;
    if (result === 0) {
      result = Math.abs(value);
      continue;
    }
    result = Math.abs(result * value) / gcd(result, value);
  }
  return result;
};

export default lcm;
