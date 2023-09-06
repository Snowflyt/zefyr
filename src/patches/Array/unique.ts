import unique from '../../Array/unique';
import { patch } from '../../utils/patch';

declare global {
  interface Array<T> {
    /**
     * Returns a duplicate-free version of the array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept (using `_.uniq`).
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3];
     * arr.unique(); // => [1, 2, 3]
     * ```
     *
     * @see {@link _.uniq}
     */
    unique(): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a duplicate-free version of the array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept (using `_.uniq`).
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3];
     * arr.unique(); // => [1, 2, 3]
     * ```
     *
     * @see {@link _.uniq}
     */
    unique(): T[];
  }
}

patch(Array).with({ unique });
