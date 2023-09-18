import { patch } from '../../.internal/utils/patch';
import ceil from '../../Number/ceil';

declare global {
  interface Number {
    /**
     * Returns the smallest integer greater than or equal to the number (using `Math.ceil`).
     *
     * @example
     * ```typescript
     * 1.95.ceil(); // => 2
     * 2.4.ceil(); // => 3
     * (3).ceil(); // => 3
     * ```
     *
     * @see {@link Math.ceil}
     */
    ceil(): number;
  }
}

patch(Number).with({ ceil });
