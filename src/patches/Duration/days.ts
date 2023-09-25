import days from '../../Duration/days';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in days.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).days; // => 2n << (53n * 4n)
     * (2).days.asDays(); // => 2
     * (2).days + (3).hours; // => 2n << (53n * 4n) + 3n << (53n * 3n)
     * ((2).days + (3).hours).asDays(); // => 2.125
     * ((2).days + (3).hours).asHours(); // => 51
     * ```
     */
    readonly days: bigint;
  }
}

patch(Number).withGetter({ days });
