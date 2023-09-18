import { patch } from '../../.internal/utils/patch';
import abs from '../../Number/abs';

declare global {
  interface Number {
    /**
     * Returns the absolute value of the number (using `Math.abs`).
     *
     * @example
     * ```typescript
     * (-5).abs(); // => 5
     * (5).abs(); // => 5
     * NaN.abs(); // => NaN
     * ```
     *
     * @see {@link Math.abs}
     */
    abs(): number;
  }
}

patch(Number).with({ abs });
