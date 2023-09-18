import { patch } from '../../.internal/utils/patch';
import ago from '../../Duration/ago';

declare global {
  interface BigInt {
    /**
     * Returns the `Date` before the current `Date` by the `Duration`.
     *
     * @example
     * ```typescript
     * new Date(); // => 2023-09-01T00:00:00.000Z
     * (2).years.ago(); // => 2021-09-01T00:00:00.000Z
     * ((2).years + (3).months).ago(); // => 2021-06-01T00:00:00.000Z
     * ```
     */
    ago(): Date;
  }
}

patch(BigInt).with({ ago });
