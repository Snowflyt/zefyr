import { patch } from '../../.internal/utils/patch';
import isSafeInteger from '../../Number/isSafeInteger';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is a safe integer (using `Number.isSafeInteger`).
     *
     * @example
     * ```typescript
     * 1.95.isSafeInteger(); // => true
     * NaN.isSafeInteger(); // => false
     * Infinity.isSafeInteger(); // => false
     * -Infinity.isSafeInteger(); // => false
     * Number.MAX_SAFE_INTEGER.isSafeInteger(); // => true
     * (Number.MAX_SAFE_INTEGER + 1).isSafeInteger(); // => false
     * ```
     */
    isSafeInteger(): boolean;
  }
}

patch(Number).with({ isSafeInteger });
