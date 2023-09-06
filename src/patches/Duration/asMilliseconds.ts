import asMilliseconds from '../../Duration/asMilliseconds';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of milliseconds of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).milliseconds.asMilliseconds(); // => 2
     * ((2).seconds + (3).milliseconds).asMilliseconds(); // => 2003
     * ```
     */
    asMilliseconds(): number;
  }
}

patch(BigInt).with({ asMilliseconds });
