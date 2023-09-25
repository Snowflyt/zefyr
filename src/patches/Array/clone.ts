import clone from '../../Array/clone';
import { patch } from '../../internal/utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns a new array with the same values.
     * It is an alias of `Array.from(this)`.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * const arr2 = arr.clone();
     * console.log(arr2); // [1, 2, 3]
     * arr2[0] = 4;
     * console.log(arr2); // [4, 2, 3]
     * console.log(arr); // [1, 2, 3]
     * ```
     */
    clone(): this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns a new array with the same values.
     * It is an alias of `Array.from(this)`.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * const arr2 = arr.clone();
     * console.log(arr2); // [1, 2, 3]
     * arr2[0] = 4;
     * console.log(arr2); // [4, 2, 3]
     * console.log(arr); // [1, 2, 3]
     * ```
     */
    clone(): this;
  }
}

patch(Array).with({ clone });
