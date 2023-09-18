import { patch } from '../../.internal/utils/patch';
import asMinutes from '../../Duration/asMinutes';

declare global {
  interface BigInt {
    /**
     * Returns the total number of minutes of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).minutes.asMinutes(); // => 2
     * ((2).minutes + (3).seconds).asMinutes(); // => 2.05
     * ```
     */
    asMinutes(): number;
  }
}

patch(BigInt).with({ asMinutes });
