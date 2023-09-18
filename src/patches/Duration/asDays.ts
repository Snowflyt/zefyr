import { patch } from '../../.internal/utils/patch';
import asDays from '../../Duration/asDays';

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
