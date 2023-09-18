import { patch } from '../../.internal/utils/patch';
import isInfinite from '../../Number/isInfinite';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is infinite — that is, the number is `Infinity` or `-Infinity`.
     *
     * @example
     * ```typescript
     * 1.95.isInfinite(); // => false
     * NaN.isInfinite(); // => false
     * Infinity.isInfinite(); // => true
     * -Infinity.isInfinite(); // => true
     *  ```
     */
    isInfinite(): boolean;
  }
}

patch(Number).with({ isInfinite });
