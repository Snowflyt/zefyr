import months from '../../Duration/months';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in months.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).months; // => 2n << (53n * 6n)
     * (2).months.asMonths(); // => 2
     * (2).months + (3).weeks; // => 2n << (53n * 6n) + 3n << (53n * 5n)
     * ((2).months + (3).weeks).asMonths(); // => 2.689952565761104
     * ((2).months + (3).weeks).asWeeks(); // => 11.69625
     * ```
     */
    readonly months: bigint;
  }
}

patch(Number).withGetter({ months });
