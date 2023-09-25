import gcdlcm from '../../Math/gcdlcm';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Math {
    /**
     * Returns the greatest common divisor (gcd) and the least common multiple (lcm) of a list of numbers as a tuple of two numbers (representing gcd and lcm respectively).
     * The result is always positive even if one or more of the arguments are negative.
     * `Math.gcdlcm(0, x)` and `Math.gcdlcm(x, 0)` returns `[Math.abs(x), 0]`.
     * @param values - A list of numbers.
     *
     * @example
     * ```typescript
     * Math.gcdlcm(8, 36); // => [4, 72]
     * Math.gcdlcm(-4, 6, 8); // => [2, 24]
     * Math.gcdlcm(12, 8, 32); // => [4, 96]
     * Math.gcdlcm(0, 12); // => [12, 0]
     * Math.gcdlcm(12, 0, 8); // => [4, 0]
     * ```
     *
     * @see {@link Math.gcd}
     * @see {@link Math.lcm}
     */
    gcdlcm(...values: number[]): [number, number];
  }
}

patch(Math).withStatic({ gcdlcm });
