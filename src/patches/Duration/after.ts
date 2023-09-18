import { patch } from '../../.internal/utils/patch';
import after from '../../Duration/after';

declare global {
  interface BigInt {
    /**
     * Returns the `Date` after the given `date` by the `Duration`.
     * @param date The `Date` to get the `Date` after by the `Duration`.
     *
     * @example
     * ```typescript
     * const date = new Date();
     * console.log(date); // 2023-09-01T00:00:00.000Z
     * (2).years.after(date); // => 2025-09-01T00:00:00.000Z
     * ((2).years + (3).months).after(date); // => 2025-12-01T00:00:00.000Z
     * ```
     */
    after(date: number | Date): Date;
  }
}

patch(BigInt).with({ after });
