import { patch } from '../../.internal/utils/patch';
import isNonzero from '../../Number/isNonzero';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is not zero.
     *
     * @example
     * ```typescript
     * 1.95.isNotZero(); // => true
     * (0).isNotZero(); // => false
     * (-0).isNotZero(); // => false
     * NaN.isNotZero(); // => true
     * Infinity.isNotZero(); // => true
     * -Infinity.isNotZero(); // => true
     *  ```
     */
    isNonzero(): boolean;
  }
}

patch(Number).with({ isNonzero });
