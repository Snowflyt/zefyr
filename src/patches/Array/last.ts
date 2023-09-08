import last from '../../Array/last';
import { patch } from '../../utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * The last element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last; // => 3
     * ```
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    last: readonly any[] extends this ? T | undefined : T;
  }

  interface ReadonlyArray<T> {
    /**
     * The last element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last; // => 3
     * ```
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    last: readonly any[] extends this ? T | undefined : T;
  }
}

patch(Array).withGetter({ last });
