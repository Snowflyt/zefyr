import asFortnights from '../../Duration/asFortnights';
import { patch } from '../../internal/utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of fortnights (2 weeks) of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).fortnights.asFortnights(); // => 2
     * ((2).fortnights + (3).days).asFortnights(); // => 2.2142857142857144
     * ```
     */
    asFortnights(): number;
  }
}

patch(BigInt).with({ asFortnights });
