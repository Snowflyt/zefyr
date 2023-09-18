import { patch } from '../../.internal/utils/patch';
import isFinite from '../../Number/isFinite';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is finite — that is, the number is neither `Infinity`, `-Infinity`, nor `NaN` (using `Number.isFinite`).
     *
     * @example
     * ```typescript
     * 1.95.isFinite(); // => true
     * NaN.isFinite(); // => false
     * Infinity.isFinite(); // => false
     * -Infinity.isFinite(); // => false
     *  ```
     *
     * @see {@link Number.isFinite}
     */
    isFinite(): boolean;
  }
}

patch(Number).with({ isFinite });
