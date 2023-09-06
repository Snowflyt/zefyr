import asHours from '../../Duration/asHours';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of hours of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).hours.asHours(); // => 2
     * ((2).hours + (3).minutes).asHours(); // => 2.05
     * ```
     */
    asHours(): number;
  }
}

patch(BigInt).with({ asHours });
