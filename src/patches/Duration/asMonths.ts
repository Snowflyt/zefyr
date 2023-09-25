import asMonths from '../../Duration/asMonths';
import { patch } from '../../internal/utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of months of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).months.asMonths(); // => 2
     * ((2).months + (3).weeks).asMonths(); // => 2.689952565761104
     * ```
     */
    asMonths(): number;
  }
}

patch(BigInt).with({ asMonths });
