import { patch } from '../../.internal/utils/patch';
import fromNow from '../../Duration/fromNow';

declare global {
  interface BigInt {
    /**
     * Returns the `Date` after the current `Date` by the `Duration`.
     *
     * @example
     * ```typescript
     * new Date(); // => 2023-09-01T00:00:00.000Z
     * (2).years.fromNow(); // => 2025-09-01T00:00:00.000Z
     * ((2).years + (3).months).fromNow(); // => 2025-12-01T00:00:00.000Z
     * ```
     */
    fromNow(): Date;
  }
}

patch(BigInt).with({ fromNow });
