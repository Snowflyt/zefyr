import asYears from '../../Duration/asYears';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of years of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).years.asYears(); // => 2
     * ((2).years + (3).months).asYears(); // => 2.25
     * ```
     */
    asYears(): number;
  }
}

patch(BigInt).with({ asYears });
