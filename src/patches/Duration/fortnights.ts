import fortnights from '../../Duration/fortnights';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in fortnights (2 weeks).
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).fortnights; // => 4n << (53n * 5n)
     * (2).fortnights.asFortnights(); // => 2
     * (2).fortnights + (3).days; // => 4n << (53n * 5n) + 3n << (53n * 4n)
     * ((2).fortnights + (3).days).asFortnights(); // => 2.2142857142857144
     * ((2).fortnights + (3).days).asDays(); // => 31
     * ```
     */
    readonly fortnights: bigint;
  }
}

patch(Number).withGetter({ fortnights });
