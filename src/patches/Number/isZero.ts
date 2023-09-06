import isZero from '../../Number/isZero';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * Returns true if the number is zero.
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
