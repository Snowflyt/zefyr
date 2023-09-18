import { patch } from '../../.internal/utils/patch';
import clamp from '../../Number/clamp';

declare global {
  interface Number {
    /**
     * Return `min` if the number is less than `min`, `max` if the number is greater than `max`, or the number itself if it is neither.
     * @param min The minimum value.
     * @param max The maximum value.
     *
     * @example
     * ```typescript
     * 5.clamp(0, 10); // => 5
     * 15.clamp(0, 10); // => 10
     * (-5).clamp(0, 10); // => 0
     * ```
     */
    clamp(min: number, max: number): number;
  }
}

patch(Number).with({ clamp });
