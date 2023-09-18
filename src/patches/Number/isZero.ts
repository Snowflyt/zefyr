import { patch } from '../../.internal/utils/patch';
import isZero from '../../Number/isZero';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is zero.
     *
     * @example
     * ```typescript
     * 1.95.isZero(); // => false
     * (0).isZero(); // => true
     * (-0).isZero(); // => true
     * ```
     */
    isZero(): this is 0;
  }
}

patch(Number).with({ isZero });
