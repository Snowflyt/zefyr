import sortBy from '../../Array/sortBy';
import { patch } from '../../internal/utils/patch';

import type { Ord } from '../../internal/types/alias';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns a new array that is sorted by the given functions.
     * @param array The array to process.
     * @param fns The functions to sort by.
     *
     * @example
     * ```typescript
     * const objs = [{ a: 1, b: 4 }, { a: 3, b: 2 }, { a: 3, b: 1 }];
     * objs.sortBy((obj) => obj.b); // => [{ a: 3, b: 1 }, { a: 3, b: 2 }, { a: 1, b: 4 }]
     * objs.sortBy(prop('a'), prop('b')); // => [{ a: 1, b: 4 }, { a: 3, b: 1 }, { a: 3, b: 2 }]
     * ```
     */
    sortBy(...fns: Array<(value: T) => Ord>): T[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns a new array that is sorted by the given functions.
     * @param array The array to process.
     * @param fns The functions to sort by.
     *
     * @example
     * ```typescript
     * const objs = [{ a: 1, b: 4 }, { a: 3, b: 2 }, { a: 3, b: 1 }];
     * objs.sortBy((obj) => obj.b); // => [{ a: 3, b: 1 }, { a: 3, b: 2 }, { a: 1, b: 4 }]
     * objs.sortBy(prop('a'), prop('b')); // => [{ a: 1, b: 4 }, { a: 3, b: 1 }, { a: 3, b: 2 }]
     * ```
     */
    sortBy(...fns: Array<(value: T) => Ord>): T[];
  }
}

patch(Array).with({ sortBy });
