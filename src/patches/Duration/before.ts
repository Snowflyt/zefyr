import before from '../../Duration/before';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the `Date` before the given `date` by the `Duration`.
     * @param date The `Date` to get the `Date` before by the `Duration`.
     *
     * @example
     * ```typescript
     * const date = new Date();
     * console.log(date); // 2023-09-01T00:00:00.000Z
     * (2).years.before(date); // => 2021-09-01T00:00:00.000Z
     * ((2).years + (3).months).before(date); // => 2021-06-01T00:00:00.000Z
     * ```
     */
    before(date: number | Date): Date;
  }
}

patch(BigInt).with({ before });
