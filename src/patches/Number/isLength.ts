import { patch } from '../../.internal/utils/patch';
import isLength from '../../Number/isLength';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is a valid array-like length (using `isLength`).
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     * @param value The value to check.
     *
     * @example
     * ```typescript
     * (3).isLength(); // => true
     * (-1).isLength(); // => false
     * 1.23.isLength(); // => false
     * Number.MAX_SAFE_INTEGER.isLength(); // => true
     * (Number.MAX_SAFE_INTEGER + 1).isLength(); // => false
     * Infinity.isLength(); // => false
     * ```
     *
     * @see {@link global.isLength}
     */
    isLength(): boolean;
  }
}

patch(Number).with({ isLength });
