import weeks from '../../Duration/weeks';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in weeks.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).weeks; // => 2n << (53n * 5n)
     * (2).weeks.asWeeks(); // => 2
     * (2).weeks + (3).days; // => 2n << (53n * 5n) + 3n << (53n * 4n)
     * ((2).weeks + (3).days).asWeeks(); // => 2.4285714285714284
     * ((2).weeks + (3).days).asDays(); // => 17
     * ```
     */
    readonly weeks: bigint;
  }
}

patch(Number).withGetter({ weeks });
