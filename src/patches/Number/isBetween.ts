import { patch } from '../../.internal/utils/patch';
import isBetween from '../../Number/isBetween';

declare global {
  interface Number {
    /**
     * Returns `true` if the number is between the given numbers, inclusive.
     *
     * @example
     * ```typescript
     * (3).isBetween(1, 5); // => true
     * (1).isBetween(1, 5); // => true
     * (5).isBetween(1, 5); // => true
     * (0).isBetween(1, 5); // => false
     * ```
     */
    isBetween(min: number, max: number): boolean;
  }
}

patch(Number).with({ isBetween });
