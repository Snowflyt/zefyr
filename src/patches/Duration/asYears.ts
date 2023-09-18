import { patch } from '../../.internal/utils/patch';
import asYears from '../../Duration/asYears';

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
