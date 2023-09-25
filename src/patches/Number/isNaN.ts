import isNaN from '../../Number/isNaN';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is NaN (using `Number.isNaN`).
     *
     * @example
     * ```typescript
     * 1.95.isNaN(); // => false
     * NaN.isNaN(); // => true
     * Infinity.isNaN(); // => false
     * -Infinity.isNaN(); // => false
     * ```
     *
     *  @see {@link Number.isNaN}
     */
    isNaN(): boolean;
  }
}

patch(Number).with({ isNaN });
