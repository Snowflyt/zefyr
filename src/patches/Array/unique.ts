import unique from '../../Array/unique';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Array<T> {
    /**
     * Returns a duplicate-free version of the array,
     * in which only the first occurrence of each element is kept (using `equals` for equality comparisons).
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3, { a: [2], c: { d: 10 } }, , { a: [2], c: { d: 10 } }];
     * unique(arr); // => [1, 2, 3, { a: [2], c: { d: 10 } }]
     * ```
     *
     * @see {@link _.uniq}
     */
    unique(): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a duplicate-free version of the array,
     * in which only the first occurrence of each element is kept (using `equals` for equality comparisons).
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 1, 2, 3, { a: [2], c: { d: 10 } }, , { a: [2], c: { d: 10 } }];
     * unique(arr); // => [1, 2, 3, { a: [2], c: { d: 10 } }]
     * ```
     *
     * @see {@link _.uniq}
     */
    unique(): T[];
  }
}

patch(Array).with({ unique });
