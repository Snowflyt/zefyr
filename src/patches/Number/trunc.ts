import trunc from '../../Number/trunc';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * Returns the integral part of the number, removing any fractional digits (using `Math.trunc`).
     * If number is already an integer, the result is number.
     *
     * @example
     * ```typescript
     * 13.37.trunc(); // => 13
     * 42.84.trunc(); // => 42
     * 0.123.trunc(); // =>  0
     * -0.123.trunc(); // => -0
     * ```
     *
     * @see {@link Math.trunc}
     */
    trunc(): number;
  }
}

patch(Number).with({ trunc });
