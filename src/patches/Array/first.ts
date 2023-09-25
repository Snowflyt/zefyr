import first from '../../Array/first';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Array<T> {
    /**
     * The first element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.first; // => 1
     * ```
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    first: any[] extends this ? T | undefined : T;
  }

  interface ReadonlyArray<T> {
    /**
     * The first element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.first; // => 1
     * ```
     */
    first: T | undefined;
  }
}

patch(Array).withGetter({ first });
