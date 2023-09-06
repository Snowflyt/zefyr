import clear from '../../Array/clear';
import { patch } from '../../utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Clears the array in-place (set `length` to `0`).
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.clear();
     * console.log(arr); // []
     * ```
     */
    clear(): void;
  }
}

patch(Array).with({ clear });
