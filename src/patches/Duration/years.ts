import years from '../../Duration/years';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in years.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).years; // => 2n << (53n * 7n)
     * (2).years.asYears(); // => 2
     * (2).years + (3).months; // => 2n << (53n * 7n) + 3n << (53n * 6n)
     * ((2).years + (3).months).asYears(); // => 2.25
     * ((2).years + (3).months).asMonths(); // => 27
     * ```
     */
    readonly years: bigint;
  }
}

patch(Number).withGetter({ years });
