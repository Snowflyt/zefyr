import isNegative from '../../Number/isNegative';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * Returns true if the number is negative (using `Math.sign`).
     *
     * @example
     * ```typescript
     * 1.95.isNegative(); // => false
     * -1.95.isNegative(); // => true
     * NaN.isNegative(); // => false
     * Infinity.isNegative(); // => false
     * -Infinity.isNegative(); // => true
     *  ```
     *
     * @see {@link Math.sign}
     */
    isNegative(): boolean;
  }
}

patch(Number).with({ isNegative });
