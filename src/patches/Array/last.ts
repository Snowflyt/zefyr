import { patch } from '../../.internal/utils/patch';
import last from '../../Array/last';

declare global {
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
    last: any[] extends this ? T | undefined : T;
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
    last: T | undefined;
  }
}

patch(Array).withGetter({ last });
