import gcd from '../../Math/gcd';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Math {
    /**
     * Returns the greatest common divisor (gcd) of a list of numbers.
     * The result is always positive even if one or more of the arguments are negative.
     * `Math.gcd(0, x)` and `Math.gcd(x, 0)` returns `Math.abs(x)`.
     * @param values - A list of numbers.
     *
     * @example
     * ```typescript
     * Math.gcd(8, 36); // => 4
     * Math.gcd(-4, 6, 8); // => 2
     * Math.gcd(12, 8, 32); // => 4
     * Math.gcd(0, 12); // => 12
     * Math.gcd(12, 0, 8); // => 4
     * ```
     */
    gcd(...values: number[]): number;
  }
}

patch(Math).withStatic({ gcd });
