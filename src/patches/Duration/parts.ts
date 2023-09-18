import { patch } from '../../.internal/utils/patch';
import parts from '../../Duration/parts';

declare global {
  interface BigInt {
    /**
     * Parts of the `Duration` represented as an object.
     *
     * @example
     * ```typescript
     * (2).years.parts; // => { years: 2, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
     * ((2).years + (3).months).parts; // => { years: 2, months: 3, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
     * ```
     */
    readonly parts: {
      years: number;
      months: number;
      weeks: number;
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      milliseconds: number;
    };
  }
}

patch(BigInt).withGetter({ parts });
