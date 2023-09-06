import isInteger from '../../Number/isInteger';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * Returns true if the number is integer (using `Number.isInteger`).
     *
     * @example
     * ```typescript
     * 1.95.isInteger(); // => false
     * NaN.isInteger(); // => false
     * Infinity.isInteger(); // => false
     * -Infinity.isInteger(); // => false
     * (3).isInteger(); // => true
     * 3.0.isInteger(); // => true
     * (0).isInteger(); // => true
     * (-0).isInteger(); // => true
     * ```
     *
     * @see {@link Number.isInteger}
     */
    isInteger(): boolean;
  }
}

patch(Number).with({ isInteger });
