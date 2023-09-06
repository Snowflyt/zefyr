import lcm from '../../Math/lcm';
import { patch } from '../../utils/patch';

declare global {
  interface Math {
    /**
     * Returns the least common multiple (lcm) of a list of numbers.
     * The result is always positive even if one or more of the arguments are negative.
     * `Math.lcm(0, x)` and `Math.lcm(x, 0)` returns `0`.
     * @param values - A list of numbers.
     *
     * @example
     * ```typescript
     * Math.lcm(8, 36); // => 72
     * Math.lcm(-4, 6, 8); // => 24
     * Math.lcm(12, 8, 32); // => 96
     * Math.lcm(0, 12); // => 0
     * Math.lcm(12, 0, 8); // => 0
     * ```
     */
    lcm(...values: number[]): number;
  }
}

patch(Math).withStatic({ lcm });
