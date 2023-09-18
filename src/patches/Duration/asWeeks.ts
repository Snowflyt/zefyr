import { patch } from '../../.internal/utils/patch';
import asWeeks from '../../Duration/asWeeks';

declare global {
  interface BigInt {
    /**
     * Returns the total number of weeks of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).weeks.asWeeks(); // => 2
     * ((2).weeks + (3).days).asWeeks(); // => 2.4285714285714284
     * ```
     */
    asWeeks(): number;
  }
}

patch(BigInt).with({ asWeeks });
