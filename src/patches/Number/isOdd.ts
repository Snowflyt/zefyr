import { patch } from '../../.internal/utils/patch';
import isOdd from '../../Number/isOdd';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is odd.
     *
     * @example
     * ```typescript
     * (3).isOdd(); // => true
     * (4).isOdd(); // => false
     * 3.0.isOdd(); // => true
     * 1.95.isOdd(); // => false
     * ```
     */
    isOdd(): boolean;
  }
}

patch(Number).with({ isOdd });
