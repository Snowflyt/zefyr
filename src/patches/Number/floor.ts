import { patch } from '../../.internal/utils/patch';
import floor from '../../Number/floor';

declare global {
  interface Number {
    /**
     * Returns the greatest integer less than or equal to the number (using `Math.floor`).
     *
     * @example
     * ```typescript
     * 1.95.floor(); // => 1
     * 2.4.floor(); // => 2
     * (3).floor(); // => 3
     * ```
     *
     * @see {@link Math.floor}
     */
    floor(): number;
  }
}

patch(Number).with({ floor });
