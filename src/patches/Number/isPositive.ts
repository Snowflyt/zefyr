import isPositive from '../../Number/isPositive';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is positive (using `Math.sign`).
     *
     * @example
     * ```typescript
     * 1.95.isPositive(); // => true
     * -1.95.isPositive(); // => false
     * NaN.isPositive(); // => false
     * Infinity.isPositive(); // => true
     * -Infinity.isPositive(); // => false
     * ```
     *
     * @see {@link Math.sign}
     */
    isPositive(): boolean;
  }
}

patch(Number).with({ isPositive });
