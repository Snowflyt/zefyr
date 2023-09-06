import times from '../../Number/times';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * Calls the given function with times of the number.
     * @param callbackfn The function to call.
     *
     * @example
     * ```typescript
     * (3).times((index) => console.log(index, 'Hello, world!'));
     * // 0 Hello, world!
     * // 1 Hello, world!
     * // 2 Hello, world!
     * ```
     */
    times(callbackfn: (index?: number) => unknown): void;
  }
}

patch(Number).with({ times });
