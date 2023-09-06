/**
 * Returns the greatest common divisor (gcd) of a list of numbers.
 * The result is always positive even if one or more of the arguments are negative.
 * `gcd(0, x)` and `gcd(x, 0)` returns `Math.abs(x)`.
 * @param values - A list of numbers.
 *
 * @example
 * ```typescript
 * gcd(8, 36); // => 4
 * gcd(-4, 6, 8); // => 2
 * gcd(12, 8, 32); // => 4
 * gcd(0, 12); // => 12
 * gcd(12, 0, 8); // => 4
 * ```
 */
const gcd = (...values: number[]): number => {
  let result = 0;
  for (let i = 0; i < values.length; i++) {
    const value = values[i]!;
    if (value === 0) continue;
    if (result === 0) {
      result = Math.abs(value);
      continue;
    }
    let a = Math.abs(result);
    let b = Math.abs(value);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (a === b) {
        result = a;
        break;
      }
      if (a < b) {
        const temp = a;
        a = b;
        b = temp;
      }
      a -= b;
    }
  }
  return result;
};

export default gcd;
