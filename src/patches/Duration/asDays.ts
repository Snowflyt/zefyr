import asDays from '../../Duration/asDays';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of days of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).days.asDays(); // => 2
     * ((2).days + (3).hours).asDays(); // => 2.125
     * ```
     */
    asDays(): number;
  }
}

patch(BigInt).with({ asDays });
