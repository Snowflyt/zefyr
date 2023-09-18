import { patch } from '../../.internal/utils/patch';
import isEven from '../../Number/isEven';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is even.
     *
     * @example
     * ```typescript
     * (3).isEven(); // => true
     * (4).isEven(); // => false
     * 3.0.isEven(); // => true
     * 1.95.isEven(); // => false
     * ```
     */
    isEven(): boolean;
  }
}

patch(Number).with({ isEven });
