import { patch } from '../../.internal/utils/patch';
import round from '../../Number/round';

declare global {
  interface Number {
    /**
     * Returns a supplied numeric expression rounded to the nearest integer (using `Math.round`).
     *
     * @example
     * ```typescript
     * 1.95.round(); // => 2
     * 1.5.round(); // => 2
     * 1.05.round(); // => 1
     * (3).round(); // => 3
     * (-1.95).round(); // => -2
     * (-1.5).round(); // => -1
     * (-1.05).round(); // => -1
     * ```
     *
     * @see {@link Math.round}
     */
    round(): number;
  }
}

patch(Number).with({ round });
