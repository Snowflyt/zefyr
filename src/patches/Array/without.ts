import without from '../../Array/without';
import { patch } from '../../utils/patch';

import type { Without } from '../../Array/without';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns a new array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons (using `_.without`).
     * @param values The values to exclude.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3];
     * arr.without(1, 2); // => [3, 3]
     * ```
     *
     * @see {@link _.without}
     */
    without<
      const AS extends readonly unknown[],
      const BS extends readonly AS[number][],
    >(
      this: AS,
      ...values: BS
    ): Without<AS, BS>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns a new array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons (using `_.without`).
     * @param values The values to exclude.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3];
     * arr.without(1, 2); // => [3, 3]
     * ```
     *
     * @see {@link _.without}
     */
    without<
      const AS extends readonly unknown[],
      const BS extends readonly AS[],
    >(
      this: AS,
      ...values: BS
    ): Without<AS, BS>;
  }
}

patch(Array).with({ without });
